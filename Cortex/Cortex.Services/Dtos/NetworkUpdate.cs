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
using Cortex.DomainModels;

namespace Cortex.Services.Dtos
{
    public class NetworkUpdate
    {
        public NetworkUpdate(string name,
            string description,
            int readAccess,
            int writeAccess,
            IList<Guid> readPermittedUsers,
            IList<Guid> writePermittedUsers)
        {
            Name = name;
            Description = description;
            ReadAccess = (AccessMode)readAccess;
            WriteAccess = (AccessMode)writeAccess;
            ReadPermittedUsers = readPermittedUsers;
            WritePermittedUsers = writePermittedUsers;
        }

        public string Name { get; }

        public string Description { get; }

        public AccessMode ReadAccess { get; }

        public AccessMode WriteAccess { get; }

        public IList<Guid> ReadPermittedUsers { get; }

        public IList<Guid> WritePermittedUsers { get; }
    }
}
