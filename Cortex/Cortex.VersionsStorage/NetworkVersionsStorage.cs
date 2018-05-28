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

        public void Init(Guid networkId)
        {
            string networkDirectoryPath = GetNetworkPath(networkId);
            Directory.CreateDirectory(networkDirectoryPath);

            string snapshotFilePath = GetNetworkSnapshotPath(networkId);
            File.Create(snapshotFilePath).Close();

            Repository.Init(networkDirectoryPath);
        }

        public async Task<string> SaveAsync(Guid networkId, string networkSnapshot)
        {
            string snapshotFilePath = GetNetworkSnapshotPath(networkId);

            await File.WriteAllTextAsync(snapshotFilePath, networkSnapshot);

            string repositoryPath = GetNetworkRepositoryPath(networkId);
            using (var repository = new Repository(repositoryPath))
            {
                repository.Index.Add(SnapshotFileName);

                var signature = new Signature("system", String.Empty, DateTimeOffset.UtcNow);
                Commit commit = repository.Commit(String.Empty, signature, signature);

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

        private static string GetNetworkSnapshotPath(Guid networkId)
        {
            return Path.Combine(GetNetworkPath(networkId), SnapshotFileName);
        }

        private static string GetNetworkRepositoryPath(Guid networkId)
        {
            return Path.Combine(GetNetworkPath(networkId), ".git");
        }

        private static string GetNetworkPath(Guid networkId)
        {
            return Path.Combine(StoragePath, networkId.ToString());
        }
    }
}
