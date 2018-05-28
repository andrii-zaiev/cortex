using Cortex.DomainModels;

namespace Cortex.Services.Dtos
{
    public class NetworkVersion
    {
        public NetworkVersion(NetworkChangesetModel changeset, NetworkDiagram diagram)
        {
            Metadata = new NetworkVersionMetadata(changeset);
            Diagram = diagram;
        }

        public NetworkVersionMetadata Metadata { get; }
        public NetworkDiagram Diagram { get; }
    }
}
