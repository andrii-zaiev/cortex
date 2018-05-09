using System;
using System.IO;
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
