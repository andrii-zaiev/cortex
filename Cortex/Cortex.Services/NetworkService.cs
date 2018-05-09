using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cortex.DomainModels;
using Cortex.Repositories.Interfaces;
using Cortex.Services.Dtos;
using Cortex.Services.Interfaces;

namespace Cortex.Services
{
    public class NetworkService : INetworkService
    {
        private readonly INetworkRepository _networkRepository;

        public NetworkService(INetworkRepository networkRepository)
        {
            _networkRepository = networkRepository;
        }

        public async Task<Guid> CreateNetworkAsync(NewNetwork newNetwork)
        {
            NetworkModel network = NetworkModel.CreateNew(newNetwork.Name, newNetwork.Description, newNetwork.OwnerId);

            await _networkRepository.CreateNetworkAsync(network);

            return network.Id;
        }

        public async Task<Network> GetNetworkAsync(Guid networkId)
        {
            NetworkModel network = await _networkRepository.GetNetworkAsync(networkId);

            return new Network(network);
        }

        public async Task<IList<Network>> GetUserNetworksAsync(Guid userId)
        {
            IList<NetworkModel> networks = await _networkRepository.GetUserNetworksAsync(userId);

            return networks.Select(n => new Network(n)).ToList();
        }

        public async Task<bool> CanAccessNetworkAsync(Guid networkId, Guid userId)
        {
            NetworkModel network = await _networkRepository.GetNetworkAsync(networkId);

            switch (network.ReadAccess.AccessMode)
            {
                case AccessMode.Private:
                    return network.OwnerId == userId;
                case AccessMode.ByPermission:
                    return network.ReadAccess.PermittedUsers.Contains(userId);
                case AccessMode.Public:
                    return true;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public async Task<bool> CanAccessNetworkAnonymouslyAsync(Guid networkId)
        {
            NetworkModel network = await _networkRepository.GetNetworkAsync(networkId);

            return network.ReadAccess.AccessMode == AccessMode.Public;
        }

        public async Task UpdateNetworkAsync(Guid id, NetworkUpdate networkUpdate)
        {
            NetworkModel network = await _networkRepository.GetNetworkAsync(id);

            network.UpdateName(networkUpdate.Name)
                   .UpdateDescription(networkUpdate.Description)
                   .UpdateReadAccess(networkUpdate.ReadAccess)
                   .UpdateWriteAccess(networkUpdate.WriteAccess);

            await _networkRepository.UpdateNetworkAsync(network);
        }
    }
}
