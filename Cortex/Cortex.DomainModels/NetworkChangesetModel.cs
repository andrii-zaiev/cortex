using System;
using Cortex.DataAccess.Entities;

namespace Cortex.DomainModels
{
    public class NetworkChangesetModel
    {
        public NetworkChangesetModel(NetworkChangeset entity)
        {
            Id = entity.Id;
            Comment = entity.Comment;
            NetworkId = entity.NetworkId;
            Date = entity.Date;
            AuthorId = entity.AuthorId;
            Sha = entity.Sha;
        }

        public Guid Id { get; }

        public string Comment { get; }

        public Guid NetworkId { get; }

        public DateTimeOffset Date { get; }

        public Guid AuthorId { get; }

        public string Sha { get; }
    }
}
