using System;
using Cortex.DataAccess.Entities;

namespace Cortex.DomainModels
{
    public class NetworkChangesetModel
    {
        public NetworkChangesetModel(NetworkChangeset entity)
            : this(entity.Id, entity.Comment, entity.NetworkId, entity.Date, entity.AuthorId, entity.Sha)
        {
        }

        private NetworkChangesetModel(
            Guid id,
            string comment,
            Guid networkId,
            DateTimeOffset date,
            Guid authorId,
            string sha)
        {
            Id = id;
            Comment = comment;
            NetworkId = networkId;
            Date = date;
            AuthorId = authorId;
            Sha = sha;
        }

        public Guid Id { get; }

        public string Comment { get; }

        public Guid NetworkId { get; }

        public DateTimeOffset Date { get; }

        public Guid AuthorId { get; }

        public string Sha { get; }

        public static NetworkChangesetModel CreateNew(Guid networkId, string comment, Guid authorId, string sha)
        {
            return new NetworkChangesetModel(Guid.NewGuid(), comment, networkId, DateTimeOffset.UtcNow, authorId, sha);
        }
    }
}
