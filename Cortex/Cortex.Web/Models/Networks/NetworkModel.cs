using System;
using System.Collections.Generic;
using System.Linq;
using Cortex.DomainModels;
using Cortex.Services.Dtos;
using Cortex.Web.Models.Shared;

namespace Cortex.Web.Models.Networks
{
    public class NetworkModel
    {
        public NetworkModel(Network network, Dictionary<Guid, User> users, bool isOwner)
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
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public UserDisplayModel Author { get; set; }

        public bool IsOwner { get; set; }

        public string ReadAccess { get; set; }

        public List<UserDisplayModel> ReadAccessUsers { get; set; }

        public string WriteAccess { get; set; }

        public List<UserDisplayModel> WriteAccessUsers { get; set; }

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
