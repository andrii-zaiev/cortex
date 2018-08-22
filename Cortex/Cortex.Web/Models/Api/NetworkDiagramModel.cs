// Cortex - web application for creating and managing neural networks diagrams.
// Copyright (C) 2018  Andrii Zaiev <andrii.zaiev@gmail.com>
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.


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
