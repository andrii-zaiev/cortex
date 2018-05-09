using System;
using Cortex.Services.Dtos;
using Cortex.Web.Models.Shared;

namespace Cortex.Web.Models.NetworkVersions
{
    public class NetworkVersionDetailsModel
    {
        public NetworkVersionDetailsModel(NetworkVersionMetadata versionMetadata, Network network, User author)
        {
            Id = versionMetadata.Id;
            Comment = versionMetadata.Comment;
            Date = versionMetadata.Date;
            NetworkId = network.Id;
            NetworkName = network.Name;

            Author = new UserDisplayModel(author);
        }

        public Guid Id { get; }

        public string Comment { get; }

        public DateTimeOffset Date { get; }

        public Guid NetworkId { get; }

        public string NetworkName { get; }

        public UserDisplayModel Author { get; }
    }
}
