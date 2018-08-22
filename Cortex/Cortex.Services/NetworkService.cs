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
using Cortex.DomainModels;
using Cortex.Repositories.Interfaces;
using Cortex.Services.Dtos;
using Cortex.Services.Interfaces;
using Cortex.VersionsStorage;

namespace Cortex.Services
{
    public class NetworkService : INetworkService
    {
        private readonly INetworkRepository _networkRepository;
        private readonly INetworkVersionsStorage _versionsStorage;

        public NetworkService(INetworkRepository networkRepository, INetworkVersionsStorage versionsStorage)
        {
            _networkRepository = networkRepository;
            _versionsStorage = versionsStorage;
        }

        public async Task<Guid> CreateNetworkAsync(NewNetwork newNetwork)
        {
            NetworkModel network = NetworkModel.CreateNew(
                newNetwork.Name,
                newNetwork.Description,
                newNetwork.OwnerId);

            await _networkRepository.CreateNetworkAsync(network);

            _versionsStorage.Init(network.Id);

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

            return CanAccess(userId, network.ReadAccess, network.OwnerId);
        }

        public async Task<bool> CanAccessNetworkAnonymouslyAsync(Guid networkId)
        {
            NetworkModel network = await _networkRepository.GetNetworkAsync(networkId);

            return network.ReadAccess.AccessMode == AccessMode.Public;
        }

        public async Task<bool> CanEditNetworkAsync(Guid networkId, Guid userId)
        {
            NetworkModel network = await _networkRepository.GetNetworkAsync(networkId);

            return CanAccess(userId, network.WriteAccess, network.OwnerId);
        }

        public async Task UpdateNetworkAsync(Guid id, NetworkUpdate networkUpdate)
        {
            NetworkModel network = await _networkRepository.GetNetworkAsync(id);

            List<Guid> readPermittedUsers = networkUpdate.ReadPermittedUsers.Concat(networkUpdate.WritePermittedUsers).ToList();

            network.UpdateName(networkUpdate.Name)
                   .UpdateDescription(networkUpdate.Description)
                   .UpdateReadAccess(networkUpdate.ReadAccess, readPermittedUsers)
                   .UpdateWriteAccess(networkUpdate.WriteAccess, networkUpdate.WritePermittedUsers);

            await _networkRepository.UpdateNetworkAsync(network);
        }

        public async Task<IList<Network>> GetUserSharedNetworksAsync(Guid userId)
        {
            IList<NetworkModel> networks = await _networkRepository.GetUserSharedNetworksAsync(userId);

            return networks.Select(n => new Network(n)).ToList();
        }

        public async Task<IList<Network>> GetRecentNetworksAsync(Guid userId)
        {
            IList<NetworkModel> networks = await _networkRepository.GetRecentNetworksAsync(userId);

            return networks.Select(n => new Network(n)).ToList();
        }

        private static bool CanAccess(Guid userId, NetworkAccessModel access, Guid ownerId)
        {
            if (ownerId == userId)
            {
                return true;
            }

            switch (access.AccessMode)
            {
                case AccessMode.Private:
                    return false;
                case AccessMode.ByPermission:
                    return access.PermittedUsers.Contains(userId);
                case AccessMode.Public:
                    return true;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
    }
}
