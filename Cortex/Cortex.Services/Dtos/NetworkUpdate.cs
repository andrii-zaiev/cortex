using Cortex.DomainModels;

namespace Cortex.Services.Dtos
{
    public class NetworkUpdate
    {
        public NetworkUpdate(string name, string description, int readAccess, int writeAccess)
        {
            Name = name;
            Description = description;
            ReadAccess = (AccessMode)readAccess;
            WriteAccess = (AccessMode)writeAccess;
        }

        public string Name { get; }

        public string Description { get; }

        public AccessMode ReadAccess { get; }

        public AccessMode WriteAccess { get; }
    }
}
