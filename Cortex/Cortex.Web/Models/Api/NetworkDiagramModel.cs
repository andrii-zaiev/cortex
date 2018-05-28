using System.Collections.Generic;
using System.Linq;
using Cortex.Services.Dtos;
using Newtonsoft.Json;

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

        public List<LayerModel> Layers { get; set; }

        public List<ConnectionModel> Connections { get; set; }

        public NetworkDiagram ToDto()
        {
            return new NetworkDiagram(
                Layers?.Select(l => l.ToDto()).ToList() ?? new List<Layer>(),
                Connections?.Select(c => c.ToDto()).ToList() ?? new List<Connection>());
        }
    }
}