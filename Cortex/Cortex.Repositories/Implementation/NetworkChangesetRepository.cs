// Cortex - web application for creating and managing neural networks diagrams.
// Copyright (C) 2018  Andrii Zaiev <andrii.zaiev@gmail.com>
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.


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

        public async Task DeleteChangesetsAsync(IList<NetworkChangesetModel> changesets)
        {
            List<Guid> changesetIds = changesets.Select(c => c.Id).ToList();

            List<NetworkChangeset> entities = await Context.NetworkChangesets
                .Where(c => changesetIds.Contains(c.Id))
                .ToListAsync();

            Context.NetworkChangesets.RemoveRange(entities);
            await Context.SaveChangesAsync();
        }
    }
}
