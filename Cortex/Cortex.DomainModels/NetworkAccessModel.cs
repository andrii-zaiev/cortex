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
using System.Linq;
using Cortex.DataAccess.Entities;
using Cortex.DomainModels.Extensions;

namespace Cortex.DomainModels
{
    public class NetworkAccessModel
    {
        public NetworkAccessModel(NetworkAccess entity, IList<NetworkUserAccess> permittedUsers)
            : this(entity.Id, entity.AccessMode.ToDomain(), permittedUsers.Select(u => u.UserId).ToList())
        {
        }

        private NetworkAccessModel(Guid id, AccessMode accessMode, IList<Guid> permittedUsers)
        {
            Id = id;
            AccessMode = accessMode;
            PermittedUsers = permittedUsers;
        }

        public Guid Id { get; private set; }

        public AccessMode AccessMode { get; private set; }

        public IList<Guid> PermittedUsers { get; private set; }

        public static NetworkAccessModel CreateNew()
        {
            return new NetworkAccessModel(Guid.NewGuid(), AccessMode.Private, new List<Guid>());
        }

        public NetworkAccessModel UpdateMode(AccessMode accessMode)
        {
            AccessMode = accessMode;
            return this;
        }

        public NetworkAccessModel UpdatePermittedUsers(IList<Guid> permittedUsers)
        {
            PermittedUsers = AccessMode == AccessMode.ByPermission
                ? permittedUsers.Distinct().ToList()
                : new List<Guid>();

            return this;
        }
    }
}
