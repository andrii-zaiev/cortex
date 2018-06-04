using System;
using System.Threading.Tasks;

namespace Cortex.VersionsStorage
{
    public interface INetworkVersionsStorage
    {
        void Init(Guid networkId);

        Task<string> SaveAsync(Guid networkId, string comment, string networkSnapshot);

        Task<string> GetSnapshotAsync(Guid networkId, string sha);

        string RevertVersion(Guid networkId, string sha);

        void ResetToVersion(Guid networkId, string sha);
    }
}