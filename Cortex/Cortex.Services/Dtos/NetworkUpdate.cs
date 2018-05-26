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
