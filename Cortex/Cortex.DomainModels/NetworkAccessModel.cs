﻿using System;
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
