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

        private void CreateNetworkAccess(NetworkAccessModel networkAccess)
        {
            var entity = new NetworkAccess
            {
                Id = networkAccess.Id,
                AccessMode = networkAccess.AccessMode.ToEntity()
            };

            Context.NetworkAccesses.Add(entity);
        }
    }
}
