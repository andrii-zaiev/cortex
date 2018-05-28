using System;
using Cortex.Services.Dtos;
using Cortex.Web.Models.Shared;

namespace Cortex.Web.Models.NetworkVersions
{
    public class NetworkVersionModel
    {
        public NetworkVersionModel(NetworkVersionMetadata versionMetadata, User author)
        {
            Id = versionMetadata.Id;
            NetworkId = versionMetadata.NetworkId;
            Comment = versionMetadata.Comment;
            Date = versionMetadata.Date;

            Author = new UserDisplayModel(author);
        }

        public Guid Id { get; }

        public Guid NetworkId { get; }

        public string Comment { get; }

        public DateTimeOffset Date { get; }

        public UserDisplayModel Author { get; }
    }
}
