using System;
using System.Threading.Tasks;
using Cortex.DataAccess;
using Cortex.DataAccess.Entities;
using Cortex.DomainModels;
using Cortex.Repositories.Interfaces;
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

        private void CreateNetworkAccess(NetworkAccessModel networkAccess)
        {
            var entity = new NetworkAccess
            {
                Id = networkAccess.Id,
                AccessMode = ConvertToEntity(networkAccess.AccessMode)
            };

            Context.NetworkAccesses.Add(entity);
        }

        private DataAccess.Entities.AccessMode ConvertToEntity(AccessMode accessMode)
        {
            switch (accessMode)
            {
                case AccessMode.Private:
                    return DataAccess.Entities.AccessMode.Private;
                case AccessMode.ByPermission:
                    return DataAccess.Entities.AccessMode.ByPermission;
                case AccessMode.Public:
                    return DataAccess.Entities.AccessMode.Public;
                default:
                    throw new ArgumentOutOfRangeException(nameof(accessMode), accessMode, null);
            }
        }
    }
}
