using System;
using Cortex.Services.Dtos;

namespace Cortex.Web.Models.NetworkVersions
{
    public class NewNetworkVersionModel
    {
        public NewNetworkVersionModel(Network network, Guid? currentVersionId)
        {
            CurrentVersionId = currentVersionId;
            NetworkId = network.Id;
            NetworkName = network.Name;
        }

        public Guid? CurrentVersionId { get; }

        public Guid NetworkId { get; }

        public string NetworkName { get; }
    }
}