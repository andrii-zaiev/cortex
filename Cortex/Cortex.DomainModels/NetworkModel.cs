using System;
using System.Collections.Generic;
using System.Text;

namespace Cortex.DomainModels
{
    public class NetworkModel
    {
        public NetworkModel(
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
    }
}
