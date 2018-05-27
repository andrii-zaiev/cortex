using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cortex.DomainModels;
using Cortex.Repositories.Interfaces;
using Cortex.Services.Dtos;
using Cortex.Services.Interfaces;
using Cortex.VersionsStorage;
using Newtonsoft.Json;

namespace Cortex.Services
{
    public class NetworkVersionsService : INetworkVersionsService
    {
        private readonly INetworkChangesetRepository _changesetRepository;
        private readonly INetworkVersionsStorage _versionsStorage;

        public NetworkVersionsService(
            INetworkChangesetRepository changesetRepository,
            INetworkVersionsStorage versionsStorage)
        {
            _changesetRepository = changesetRepository;
            _versionsStorage = versionsStorage;
        }

        public async Task<IList<NetworkVersionMetadata>> GetNetworkVersionsAsync(Guid networkId)
        {
            IList<NetworkChangesetModel> changesets = await _changesetRepository.GetNetworkChangesetsAsync(networkId);

            return changesets
                .OrderBy(c => c.Date)
                .Select((c, number) => new NetworkVersionMetadata(c))
                .ToList();
        }

        public async Task<NetworkVersionMetadata> GetCurrentVersionAsync(Guid networkId)
        {
            NetworkChangesetModel changeset = await _changesetRepository.GetNewestNetworkChangesetAsync(networkId);

            return changeset != null ? new NetworkVersionMetadata(changeset) : null;
        }

        public async Task<Guid> SaveVersionAsync(NewNetworkVersion version)
        {
            string json = JsonConvert.SerializeObject(version.NetworkDiagram);

            string sha = await _versionsStorage.SaveAsync(version.NetworkId, json);

            NetworkChangesetModel newChangeset = NetworkChangesetModel.CreateNew(
                version.NetworkId,
                version.Comment,
                version.AuthorId,
                sha);

            await _changesetRepository.CreateChangesetAsync(newChangeset);

            return newChangeset.Id;
        }
    }
}
