// Cortex - web application for creating and managing neural networks diagrams.
// Copyright (C) 2018  Andrii Zaiev <andrii.zaiev@gmail.com>
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.


using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using LibGit2Sharp;

namespace Cortex.VersionsStorage
{
    public class NetworkVersionsStorage : INetworkVersionsStorage
    {
        // TODO: move to configuration
        private const string StoragePath = @"D:/Cortex.VersionsStorage";
        private const string SnapshotFileName = "snapshot.json";
        private const string SystemUserName = "system";
        private const string SystemUserEmail = "system@example.com";
        private const string GitFolderName = ".git";

        public void Init(Guid networkId)
        {
            string networkDirectoryPath = GetNetworkPath(networkId);
            Directory.CreateDirectory(networkDirectoryPath);

            string snapshotFilePath = GetNetworkSnapshotPath(networkId);
            File.Create(snapshotFilePath).Close();

            Repository.Init(networkDirectoryPath);
        }

        public async Task<string> SaveAsync(Guid networkId, string comment, string networkSnapshot)
        {
            string snapshotFilePath = GetNetworkSnapshotPath(networkId);

            await File.WriteAllTextAsync(snapshotFilePath, networkSnapshot);

            string repositoryPath = GetNetworkRepositoryPath(networkId);
            using (var repository = new Repository(repositoryPath))
            {
                repository.Index.Add(SnapshotFileName);

                var signature = new Signature(SystemUserName, SystemUserEmail, DateTimeOffset.UtcNow);
                Commit commit = repository.Commit(comment, signature, signature);

                return commit.Sha;
            }
        }

        public async Task<string> GetSnapshotAsync(Guid networkId, string sha)
        {
            string repositoryPath = GetNetworkRepositoryPath(networkId);
            using (var repository = new Repository(repositoryPath))
            {
                Commit commit = repository.Commits.Single(c => c.Sha == sha);
                var snapshotBlob = (Blob) commit[SnapshotFileName].Target;

                using (var snapshotReader = new StreamReader(snapshotBlob.GetContentStream()))
                {
                    return await snapshotReader.ReadToEndAsync();
                }
            }
        }

        public string RevertVersion(Guid networkId, string sha)
        {
            string repositoryPath = GetNetworkRepositoryPath(networkId);
            using (var repository = new Repository(repositoryPath))
            {
                repository.Reset(ResetMode.Hard);
                Commit commit = repository.Commits.Single(c => c.Sha == sha);
                var signature = new Signature(SystemUserName, SystemUserEmail, DateTimeOffset.UtcNow);
                var options = new RevertOptions { CommitOnSuccess = true, MergeFileFavor = MergeFileFavor.Ours };
                RevertResult result = repository.Revert(commit, signature, options);
                return result.Commit.Sha;
            }
        }

        public void ResetToVersion(Guid networkId, string sha)
        {
            string repositoryPath = GetNetworkRepositoryPath(networkId);
            using (var repository = new Repository(repositoryPath))
            {
                Commit commit = repository.Commits.Single(c => c.Sha == sha);
                repository.Reset(ResetMode.Hard, commit);
            }
        }

        private static string GetNetworkSnapshotPath(Guid networkId)
        {
            return Path.Combine(GetNetworkPath(networkId), SnapshotFileName);
        }

        private static string GetNetworkRepositoryPath(Guid networkId)
        {
            return Path.Combine(GetNetworkPath(networkId), GitFolderName);
        }

        private static string GetNetworkPath(Guid networkId)
        {
            return Path.Combine(StoragePath, networkId.ToString());
        }
    }
}
