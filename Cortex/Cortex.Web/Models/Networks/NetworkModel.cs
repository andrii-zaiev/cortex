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


using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cortex.Services.Dtos;
using Cortex.Web.Models.Shared;

namespace Cortex.Web.Models.Networks
{
    public class NetworkModel
    {
        public NetworkModel(Network network)
        {
            Id = network.Id;
            Name = network.Name;
            Description = network.Description;
            CreatedDate = network.CreatedDate;
        }

        public NetworkModel(Network network, User owner)
        {
            Id = network.Id;
            Name = network.Name;
            Description = network.Description;
            CreatedDate = network.CreatedDate;
            Author = new UserDisplayModel(owner);
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public UserDisplayModel Author { get; set; }
    }
}
