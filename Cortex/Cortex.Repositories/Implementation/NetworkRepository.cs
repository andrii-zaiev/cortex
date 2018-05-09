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

        public async Task UpdateNetworkAsync(NetworkModel network)
        {
            Network entity = await Context.Networks.SingleAsync(n => n.Id == network.Id);

            entity.Name = network.Name;
            entity.Description = network.Description;

            await UpdateNetworkAccessAsync(network.ReadAccess);
            await UpdateNetworkAccessAsync(network.WriteAccess);

            await UpdateAsync(entity);
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

            Context.Attach(entity);
        }
    }
}
