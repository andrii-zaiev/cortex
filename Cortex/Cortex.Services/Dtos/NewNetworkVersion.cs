using System;

namespace Cortex.Services.Dtos
{
    public class NewNetworkVersion
    {
        public NewNetworkVersion(Guid networkId, string comment, NetworkDiagram diagram, Guid authorId)
        {
            NetworkId = networkId;
            Comment = comment;
            Diagram = diagram;
            AuthorId = authorId;
        }

        public Guid NetworkId { get; set; }

        public string Comment { get; set; }

        public NetworkDiagram Diagram { get; set; }

        public Guid AuthorId { get; set; }
    }
}
