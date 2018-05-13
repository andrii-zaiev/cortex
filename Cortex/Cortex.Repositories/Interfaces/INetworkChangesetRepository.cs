﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cortex.DomainModels;

namespace Cortex.Repositories.Interfaces
{
    public interface INetworkChangesetRepository
    {
        Task<IList<NetworkChangesetModel>> GetNetworkChangesetsAsync(Guid networkId);

        Task<NetworkChangesetModel> GetNewestNetworkChangesetAsync(Guid networkId);
    }
}