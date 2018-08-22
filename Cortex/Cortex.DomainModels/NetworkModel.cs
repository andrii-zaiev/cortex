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
using System.Collections.Generic;
using System.Text;
using Cortex.DataAccess.Entities;

namespace Cortex.DomainModels
{
    public class NetworkModel
    {
        public NetworkModel(
            Network entity,
            NetworkAccess readAccess,
            IList<NetworkUserAccess> readAccessUsers,
            NetworkAccess writeAccess,
            IList<NetworkUserAccess> writeAccessUsers)
            : this(
                entity.Id,
                entity.Name,
                entity.Description,
                entity.CreatedDate,
                entity.OwnerId,
                new NetworkAccessModel(readAccess, readAccessUsers),
                new NetworkAccessModel(writeAccess, writeAccessUsers))
        {
        }

        private NetworkModel(
            Guid id,
            string name,
            string description,
            DateTimeOffset createdDate,
            Guid ownerId,
            NetworkAccessModel readAccess,
            NetworkAccessModel writeAccess)
        {
            Id = id;
            Name = name;
            Description = description;
            CreatedDate = createdDate;
            OwnerId = ownerId;
            ReadAccess = readAccess;
            WriteAccess = writeAccess;
        }

        public Guid Id { get; private set; }

        public string Name { get; private set; }

        public string Description { get; private set; }

        public DateTimeOffset CreatedDate { get; private set; }

        public Guid OwnerId { get; private set; }

        public NetworkAccessModel ReadAccess { get; private set; }

        public NetworkAccessModel WriteAccess { get; private set; }

        public static NetworkModel CreateNew(string name, string description, Guid ownerId)
        {
            NetworkAccessModel readAccess = NetworkAccessModel.CreateNew();
            NetworkAccessModel writeAccess = NetworkAccessModel.CreateNew();

            return new NetworkModel(
                Guid.NewGuid(),
                name,
                description,
                DateTimeOffset.UtcNow,
                ownerId,
                readAccess,
                writeAccess);
        }

        public NetworkModel UpdateName(string name)
        {
            Name = name;
            return this;
        }

        public NetworkModel UpdateDescription(string description)
        {
            Description = description;
            return this;
        }

        public NetworkModel UpdateReadAccess(AccessMode readAccess, IList<Guid> permittedUsers)
        {
            ReadAccess.UpdateMode(readAccess).UpdatePermittedUsers(permittedUsers);
            return this;
        }

        public NetworkModel UpdateWriteAccess(AccessMode writeAccess, IList<Guid> permittedUsers)
        {
            WriteAccess.UpdateMode(writeAccess).UpdatePermittedUsers(permittedUsers);
            return this;
        }
    }
}
