using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cortex.Services.Dtos;

namespace Cortex.Services.Interfaces
{
    public interface INetworkVersionsService
    {
        Task<IList<NetworkVersionMetadata>> GetNetworkVersionsAsync(Guid networkId);

        Task<NetworkVersionMetadata> GetCurrentVersionAsync(Guid networkId);

        Task<Guid> SaveVersionAsync(NewNetworkVersion version);
    }
}