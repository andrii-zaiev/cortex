using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cortex.DomainModels;

namespace Cortex.Repositories.Interfaces
{
    public interface INetworkRepository
    {
        Task CreateNetworkAsync(NetworkModel network);

        Task<NetworkModel> GetNetworkAsync(Guid networkId);

        Task<IList<NetworkModel>> GetUserNetworksAsync(Guid userId);

        Task UpdateNetworkAsync(NetworkModel network);

        Task<IList<NetworkModel>> GetUserSharedNetworksAsync(Guid userId);
    }
}