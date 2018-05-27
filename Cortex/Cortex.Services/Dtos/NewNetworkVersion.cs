using System;

namespace Cortex.Services.Dtos
{
    public class NewNetworkVersion
    {
        public Guid NetworkId { get; set; }

        public string Comment { get; set; }

        public object NetworkDiagram { get; set; }

        public Guid AuthorId { get; set; }
    }
}
