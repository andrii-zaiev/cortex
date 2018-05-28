using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cortex.Services.Dtos;

namespace Cortex.Services.Interfaces
{
    public interface INetworkService
    {
        Task<Guid> CreateNetworkAsync(NewNetwork newNetwork);

        Task<Network> GetNetworkAsync(Guid networkId);

        Task<IList<Network>> GetUserNetworksAsync(Guid userId);

        Task<bool> CanAccessNetworkAsync(Guid networkId, Guid userId);

        Task<bool> CanAccessNetworkAnonymouslyAsync(Guid networkId);

        Task<bool> CanEditNetworkAsync(Guid networkId, Guid userId);

        Task UpdateNetworkAsync(Guid id, NetworkUpdate networkUpdate);

        Task<IList<Network>> GetUserSharedNetworksAsync(Guid userId);

        Task<IList<Network>> GetRecentNetworksAsync(Guid userId);
    }
}