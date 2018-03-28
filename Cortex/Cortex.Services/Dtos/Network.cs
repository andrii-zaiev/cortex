using System;
using Cortex.DomainModels;

namespace Cortex.Services.Dtos
{
    public class Network
    {
        public Network(NetworkModel network)
        {
            Id = network.Id;
            Name = network.Name;
            Description = network.Description;
            CreatedDate = network.CreatedDate;
            OwnerId = network.OwnerId;
            ReadAccess = new NetworkAccess(network.ReadAccess);
            WriteAccess = new NetworkAccess(network.WriteAccess);
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public Guid OwnerId { get; set; }

        public NetworkAccess ReadAccess { get; set; }

        public NetworkAccess WriteAccess { get; set; }
    }
}
