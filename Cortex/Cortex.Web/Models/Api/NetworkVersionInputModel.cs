using System;

namespace Cortex.Web.Models.Api
{
    public class NetworkVersionInputModel
    {
        public Guid NetworkId { get; set; }

        public Guid? BaseVersionId { get; set; }

        public string Comment { get; set; }

        public NetworkDiagramModel Network { get; set; }
    }
}
