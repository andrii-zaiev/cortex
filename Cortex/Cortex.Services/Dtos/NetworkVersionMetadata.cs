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
using Cortex.DomainModels;

namespace Cortex.Services.Dtos
{
    public class NetworkVersionMetadata
    {
        public NetworkVersionMetadata(NetworkChangesetModel changeset)
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
