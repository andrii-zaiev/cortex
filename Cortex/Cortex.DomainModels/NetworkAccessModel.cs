using System;
using System.Collections.Generic;
using System.Linq;

namespace Cortex.DomainModels
{
    public class NetworkAccessModel
    {
        public NetworkAccessModel(Guid id, AccessMode accessMode, IList<Guid> permittedUsers)
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
    }
}
