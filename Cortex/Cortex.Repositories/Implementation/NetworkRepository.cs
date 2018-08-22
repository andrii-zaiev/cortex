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
using Cortex.DomainModels.Extensions;
using Cortex.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using AccessMode = Cortex.DomainModels.AccessMode;

namespace Cortex.Repositories.Implementation
{
    public class NetworkRepository : BaseRepository<Network>, INetworkRepository
    {
        public NetworkRepository(DatabaseContext context) : base(context)
        {
        }

        public async Task CreateNetworkAsync(NetworkModel network)
        {
            var entity = new Network
            {
                Id = network.Id,
                CreatedDate = network.CreatedDate,
                Name = network.Name,
                Description = network.Description,
                OwnerId = network.OwnerId,
                ReadAccessId = network.ReadAccess.Id,
                WriteAccessId = network.WriteAccess.Id
            };

            CreateNetworkAccess(network.ReadAccess);
            CreateNetworkAccess(network.WriteAccess);

            await CreateAsync(entity);
        }

        public async Task<NetworkModel> GetNetworkAsync(Guid networkId)
        {
            Network entity = await Context.Networks
                .Include(nameof(Network.ReadAccess))
                .Include(nameof(Network.WriteAccess))
                .SingleAsync(n => n.Id == networkId);

            List<NetworkUserAccess> userAccesses = await Context.NetworkUserAccesses
                .Include(nameof(NetworkUserAccess.User))
                .Where(n => n.NetworkAccessId == entity.ReadAccessId || n.NetworkAccessId == entity.WriteAccessId)
                .ToListAsync();
            ILookup<Guid, NetworkUserAccess> userAccessesMapping = userAccesses.ToLookup(a => a.NetworkAccessId);

            return new NetworkModel(
                entity,
                entity.ReadAccess,
                userAccessesMapping[entity.ReadAccessId].ToList(),
                entity.WriteAccess,
                userAccessesMapping[entity.WriteAccessId].ToList());
        }

        public async Task<IList<NetworkModel>> GetUserNetworksAsync(Guid userId)
        {
            List<Network> networks = await Context.Networks
                .Include(nameof(Network.ReadAccess))
                .Include(nameof(Network.WriteAccess))
                .Where(n => n.OwnerId == userId)
                .ToListAsync();

            return await GetNetworkModelsAsync(networks);
        }

        public async Task UpdateNetworkAsync(NetworkModel network)
        {
            Network entity = await Context.Networks.SingleAsync(n => n.Id == network.Id);

            entity.Name = network.Name;
            entity.Description = network.Description;

            await UpdateNetworkAccessAsync(network.ReadAccess);
            await UpdateNetworkAccessAsync(network.WriteAccess);

            await UpdateAsync(entity);
        }

        public async Task<IList<NetworkModel>> GetUserSharedNetworksAsync(Guid userId)
        {
            List<Guid> accesses = await Context.NetworkUserAccesses
                .Where(a => a.UserId == userId)
                .Select(a => a.NetworkAccessId)
                .ToListAsync();

            List<Network> networks = await Context.Networks
                .Include(nameof(Network.ReadAccess))
                .Include(nameof(Network.WriteAccess))
                .Where(n => accesses.Contains(n.ReadAccessId) || accesses.Contains(n.WriteAccessId))
                .ToListAsync();

            return await GetNetworkModelsAsync(networks);
        }

        public async Task<IList<NetworkModel>> GetRecentNetworksAsync(Guid userId)
        {
            var recentCreatedNetworks = await Context.Networks
                .Include(nameof(Network.ReadAccess))
                .Include(nameof(Network.WriteAccess))
                .Where(n => n.OwnerId == userId)
                .OrderByDescending(n => n.CreatedDate)
                .Take(5)
                .Select(n => new
                {
                    Network = n,
                    Date = n.CreatedDate
                })
                .ToListAsync();
            var recentChangedNetworks = await Context.NetworkChangesets
                .Include(nameof(NetworkChangeset.Network))
                .Include($"{nameof(NetworkChangeset.Network)}.{nameof(Network.ReadAccess)}")
                .Include($"{nameof(NetworkChangeset.Network)}.{nameof(Network.WriteAccess)}")
                .Where(c => c.AuthorId == userId)
                .OrderByDescending(n => n.Date)
                .GroupBy(c => c.NetworkId)
                .Select(g => new
                {
                    g.First().Network,
                    Date = g.Max(c => c.Date)
                })
                .Take(5)
                .ToListAsync();

            List<Network> recentNetworks = recentChangedNetworks
                .Concat(recentCreatedNetworks)
                .OrderByDescending(n => n.Date)
                .Select(n => n.Network)
                .Distinct()
                .Take(5)
                .ToList();

            return await GetNetworkModelsAsync(recentNetworks);
        }

        private void CreateNetworkAccess(NetworkAccessModel networkAccess)
        {
            var entity = new NetworkAccess
            {
                Id = networkAccess.Id,
                AccessMode = networkAccess.AccessMode.ToEntity()
            };

            Context.NetworkAccesses.Add(entity);
        }

        private async Task UpdateNetworkAccessAsync(NetworkAccessModel networkAccess)
        {
            NetworkAccess entity = await Context.NetworkAccesses.SingleAsync(n => n.Id == networkAccess.Id);

            entity.AccessMode = networkAccess.AccessMode.ToEntity();

            await UpdateUserAccessesAsync(networkAccess.Id, networkAccess.PermittedUsers);

            Context.Attach(entity);
        }

        private async Task UpdateUserAccessesAsync(Guid networkAccessId, IList<Guid> permittedUsers)
        {
            List<NetworkUserAccess> currentAccesses = await Context.NetworkUserAccesses
                .Where(a => a.NetworkAccessId == networkAccessId)
                .ToListAsync();

            List<NetworkUserAccess> newUsers = permittedUsers
                .Where(userId => currentAccesses.All(a => a.UserId != userId))
                .Select(userId => new NetworkUserAccess
                {
                    Id = Guid.NewGuid(),
                    NetworkAccessId = networkAccessId,
                    UserId = userId
                })
                .ToList();
            List<NetworkUserAccess> deletedUsers = currentAccesses
                .Where(a => !permittedUsers.Contains(a.UserId))
                .ToList();

            Context.NetworkUserAccesses.AddRange(newUsers);
            Context.NetworkUserAccesses.RemoveRange(deletedUsers);
        }

        private async Task<IList<NetworkModel>> GetNetworkModelsAsync(IList<Network> networks)
        {
            List<Guid> accessIds = networks.SelectMany(n => new[] { n.ReadAccessId, n.WriteAccessId }).ToList();

            List<NetworkUserAccess> userAccesses = await Context.NetworkUserAccesses
                .Include(nameof(NetworkUserAccess.User))
                .Where(n => accessIds.Contains(n.NetworkAccessId))
                .ToListAsync();
            ILookup<Guid, NetworkUserAccess> userAccessesMapping = userAccesses.ToLookup(a => a.NetworkAccessId);

            return networks
                .Select(n => new NetworkModel(
                    n,
                    n.ReadAccess,
                    userAccessesMapping[n.ReadAccessId].ToList(),
                    n.WriteAccess,
                    userAccessesMapping[n.WriteAccessId].ToList()))
                .ToList();
        }
    }
}
