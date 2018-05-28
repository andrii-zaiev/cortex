using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cortex.DataAccess;
using Cortex.DataAccess.Entities;
using Cortex.DomainModels;
using Cortex.Exceptions;
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

        public async Task<NetworkChangesetModel> GetNewestNetworkChangesetAsync(Guid networkId)
        {
            NetworkChangeset changeset = await Context.NetworkChangesets
                .Where(nc => nc.NetworkId == networkId)
                .OrderBy(c => c.Date)
                .LastOrDefaultAsync();

            return changeset != null ? new NetworkChangesetModel(changeset) : null;
        }

        public async Task CreateChangesetAsync(NetworkChangesetModel newChangeset)
        {
            var entity = new NetworkChangeset
            {
                Id = newChangeset.Id,
                AuthorId = newChangeset.AuthorId,
                Comment = newChangeset.Comment,
                Date = newChangeset.Date,
                NetworkId = newChangeset.NetworkId,
                Sha = newChangeset.Sha
            };

            Context.NetworkChangesets.Add(entity);

            await Context.SaveChangesAsync();
        }

        public async Task<NetworkChangesetModel> GetNetworkChangesetAsync(Guid changesetId)
        {
            NetworkChangeset entity = await GetByIdAsync(changesetId);

            if (entity == null)
            {
                throw new EntityNotFoundException(typeof(NetworkChangeset), changesetId);
            }

            return new NetworkChangesetModel(entity);
        }
    }
}
