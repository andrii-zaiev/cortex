using System;
using System.Collections.Generic;
using Cortex.DomainModels;

namespace Cortex.Services.Dtos
{
    public class NetworkAccess
    {
        public NetworkAccess(NetworkAccessModel readAccess)
        {
            AccessMode = readAccess.AccessMode;
            PermittedUsers = readAccess.PermittedUsers;
        }

        public AccessMode AccessMode { get; }

        public IList<Guid> PermittedUsers { get; set; }
    }
}