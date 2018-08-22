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
