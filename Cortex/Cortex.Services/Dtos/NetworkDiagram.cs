using System.Collections.Generic;

namespace Cortex.Services.Dtos
{
    public class NetworkDiagram
    {
        public NetworkDiagram()
        {
        }

        public NetworkDiagram(IList<Layer> layers, IList<Connection> connections)
        {
            Layers = layers;
            Connections = connections;
        }

        public IList<Layer> Layers { get; set; }

        public IList<Connection> Connections { get; set; }
    }
}
