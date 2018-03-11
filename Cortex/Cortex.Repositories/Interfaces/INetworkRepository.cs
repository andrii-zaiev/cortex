﻿using System.Threading.Tasks;
using Cortex.DomainModels;

namespace Cortex.Repositories.Interfaces
{
    public interface INetworkRepository
    {
        Task CreateNetworkAsync(NetworkModel network);
    }
}