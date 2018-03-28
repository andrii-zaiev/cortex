using System;
using System.Threading.Tasks;
using Cortex.Services.Dtos;

namespace Cortex.Services.Interfaces
{
    public interface INetworkService
    {
        Task<Guid> CreateNetworkAsync(NewNetwork newNetwork);

        Task<Network> GetNetworkAsync(Guid networkId);

        Task<bool> CanAccessNetworkAsync(Guid networkId, Guid userId);

        Task<bool> CanAccessNetworkAnonymouslyAsync(Guid networkId);
    }
}