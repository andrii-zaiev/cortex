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
using Cortex.DomainModels;
using Cortex.Services.Dtos;
using Cortex.Web.Models.Shared;

namespace Cortex.Web.Models.Networks
{
    public class NetworkDetailsModel
    {
        public NetworkDetailsModel(
            Network network,
            Dictionary<Guid, User> users,
            bool isOwner,
            bool canEdit,
            bool hasVersions)
        {
            IsOwner = isOwner;
            Id = network.Id;
            Name = network.Name;
            Description = network.Description;
            CreatedDate = network.CreatedDate;
            Author = new UserDisplayModel(users[network.OwnerId]);
            ReadAccess = ConvertAccessModeToString(network.ReadAccess.AccessMode);
            ReadAccessUsers = network.ReadAccess.PermittedUsers
                .Select(id => new UserDisplayModel(users[id]))
                .ToList();
            WriteAccess = ConvertAccessModeToString(network.WriteAccess.AccessMode);
            WriteAccessUsers = network.WriteAccess.PermittedUsers
                .Select(id => new UserDisplayModel(users[id]))
                .ToList();
            CanEdit = canEdit;
            HasVersions = hasVersions;
        }

        public Guid Id { get; }

        public string Name { get; }

        public string Description { get; }

        public DateTimeOffset CreatedDate { get; }

        public UserDisplayModel Author { get; }

        public bool IsOwner { get; }

        public string ReadAccess { get; }

        public List<UserDisplayModel> ReadAccessUsers { get; }

        public string WriteAccess { get; }

        public List<UserDisplayModel> WriteAccessUsers { get; }

        public bool CanEdit { get; }

        public bool HasVersions { get; set; }

        private static string ConvertAccessModeToString(AccessMode mode)
        {
            switch (mode)
            {
                case AccessMode.Private:
                    return "Private";
                case AccessMode.ByPermission:
                    return "By permission";
                case AccessMode.Public:
                    return "Public";
                default:
                    throw new ArgumentOutOfRangeException(nameof(mode), mode, null);
            }
        }
    }
}
