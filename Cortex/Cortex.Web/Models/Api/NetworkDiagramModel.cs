using System.Collections.Generic;
using System.Linq;
using Cortex.Services.Dtos;

namespace Cortex.Web.Models.Api
{
    public class NetworkDiagramModel
    {
        public NetworkDiagramModel()
        {
        }

        public NetworkDiagramModel(NetworkDiagram diagram)
        {
            Layers = diagram.Layers.Select(l => new LayerModel(l)).ToList();
            Connections = diagram.Connections.Select(c => new ConnectionModel(c)).ToList();
        }

        public IList<LayerModel> Layers { get; }

        public IList<ConnectionModel> Connections { get; }

        public NetworkDiagram ToDto()
        {
            return new NetworkDiagram(
                Layers.Select(l => l.ToDto()).ToList(),
                Connections.Select(c => c.ToDto()).ToList());
        }
    }
}