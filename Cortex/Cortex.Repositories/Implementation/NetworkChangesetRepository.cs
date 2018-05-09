using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cortex.DataAccess;
using Cortex.DataAccess.Entities;
using Cortex.DomainModels;
using Cortex.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Cortex.Repositories.Implementation
{
    public class NetworkChangesetRepository : BaseRepository<NetworkChangeset>, INetworkChangesetRepository
    {
        public NetworkChangesetRepository(DatabaseContext context) : base(context)
        {
        }

        public async Task<IList<NetworkChangesetModel>> GetNetworkChangesetsAsync(Guid networkId)
        {
            List<NetworkChangeset> changesets = await Context.NetworkChangesets
                .Where(nc => nc.NetworkId == networkId)
                .ToListAsync();

            List<NetworkChangesetModel> models = changesets.Select(c => new NetworkChangesetModel(c)).ToList();

            return models;
        }
    }
}
