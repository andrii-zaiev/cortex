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

        public async Task<NetworkVersionMetadata> GetCurrentVersionInfoAsync(Guid networkId)
        {
            NetworkChangesetModel changeset = await _changesetRepository.GetNewestNetworkChangesetAsync(networkId);

            return changeset != null ? new NetworkVersionMetadata(changeset) : null;
        }

        public async Task<NetworkVersionMetadata> GetVersionInfoAsync(Guid versionId)
        {
            NetworkChangesetModel changeset = await _changesetRepository.GetNetworkChangesetAsync(versionId);

            return new NetworkVersionMetadata(changeset);
        }

        public async Task<Guid> SaveVersionAsync(NewNetworkVersion version)
        {
            string json = JsonConvert.SerializeObject(version.Diagram);

            string sha = await _versionsStorage.SaveAsync(version.NetworkId, version.Comment, json);

            NetworkChangesetModel newChangeset = NetworkChangesetModel.CreateNew(
                version.NetworkId,
                version.Comment,
                version.AuthorId,
                sha);

            await _changesetRepository.CreateChangesetAsync(newChangeset);

            return newChangeset.Id;
        }

        public async Task<NetworkVersion> GetVersionAsync(Guid versionId)
        {
            NetworkChangesetModel changeset = await _changesetRepository.GetNetworkChangesetAsync(versionId);

            string snapshot = await _versionsStorage.GetSnapshotAsync(changeset.NetworkId, changeset.Sha);

            var diagram = JsonConvert.DeserializeObject<NetworkDiagram>(snapshot);

            return new NetworkVersion(changeset, diagram);
        }

        public async Task RevertVersionAsync(Guid versionId, Guid userId)
        {
            NetworkChangesetModel changeset = await _changesetRepository.GetNetworkChangesetAsync(versionId);

            string revertSha = _versionsStorage.RevertVersion(changeset.NetworkId, changeset.Sha);

            NetworkChangesetModel revertChangeset = NetworkChangesetModel.CreateNew(
                changeset.NetworkId,
                $"Reverts \"{changeset.Comment}\"",
                userId,
                revertSha);

            await _changesetRepository.CreateChangesetAsync(revertChangeset);
        }

        public async Task ResetToVersionAsync(Guid versionId)
        {
            NetworkChangesetModel changeset = await _changesetRepository.GetNetworkChangesetAsync(versionId);
            IList<NetworkChangesetModel> allChangesets = await _changesetRepository.GetNetworkChangesetsAsync(changeset.NetworkId);

            List<NetworkChangesetModel> deletedChangesets = allChangesets
                .Where(c => c.Id != changeset.Id && c.Date > changeset.Date)
                .ToList();

            await _changesetRepository.DeleteChangesetsAsync(deletedChangesets);

            _versionsStorage.ResetToVersion(changeset.NetworkId, changeset.Sha);
        }
    }
}
