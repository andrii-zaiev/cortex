using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cortex.Services.Dtos;

namespace Cortex.Services.Interfaces
{
    public interface INetworkVersionsService
    {
        Task<IList<NetworkVersionMetadata>> GetNetworkVersionsAsync(Guid networkId);

        Task<NetworkVersionMetadata> GetCurrentVersionInfoAsync(Guid networkId);

        Task<NetworkVersionMetadata> GetVersionInfoAsync(Guid versionId);

        Task<Guid> SaveVersionAsync(NewNetworkVersion version);

        Task<NetworkVersion> GetVersionAsync(Guid versionId);

        Task RevertVersionAsync(Guid versionId, Guid userId);

        Task ResetToVersionAsync(Guid versionId);
    }
}