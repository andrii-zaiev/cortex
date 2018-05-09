using System;
using Cortex.DomainModels;

namespace Cortex.Services.Dtos
{
    public class NetworkVersion
    {
        public NetworkVersion(NetworkChangesetModel changeset)
        {
            Id = changeset.Id;
            Comment = changeset.Comment;
            NetworkId = changeset.NetworkId;
            Date = changeset.Date;
            AuthorId = changeset.AuthorId;
        }

        public Guid Id { get; }

        public string Comment { get; }

        public Guid NetworkId { get; }

        public DateTimeOffset Date { get; }

        public Guid AuthorId { get; }
    }
}
