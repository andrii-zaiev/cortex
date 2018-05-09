using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cortex.Services.Dtos;

namespace Cortex.Services.Interfaces
{
    public interface INetworkVersionsService
    {
        Task<IList<NetworkVersion>> GetNetworkVersionsAsync(Guid networkId);
    }
}