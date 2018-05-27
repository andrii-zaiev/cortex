using System;
using System.Threading.Tasks;

namespace Cortex.VersionsStorage
{
    public interface INetworkVersionsStorage
    {
        void Init(Guid networkId);

        Task<string> SaveAsync(Guid networkId, string networkSnapshot);
    }
}