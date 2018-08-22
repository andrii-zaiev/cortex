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
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Cortex.Services.Dtos;
using Cortex.Web.Models.Shared;
using Microsoft.AspNetCore.Mvc;

namespace Cortex.Web.Models.Networks
{
    public class NetworkEditModel
    {
        public NetworkEditModel()
        {
        }

        public NetworkEditModel(Network network, Dictionary<Guid, User> users)
        {
            Id = network.Id;
            Name = network.Name;
            Description = network.Description;
            ViewMode = (int)network.ReadAccess.AccessMode;
            ViewUsers = network.ReadAccess.PermittedUsers.Select(id => new UserDisplayModel(users[id])).ToList();
            EditMode = (int)network.WriteAccess.AccessMode;
            EditUsers = network.WriteAccess.PermittedUsers.Select(id => new UserDisplayModel(users[id])).ToList();
        }

        [HiddenInput]
        public Guid Id { get; set; }

        [MaxLength(100, ErrorMessage = "Name should be shorter than 100 symbols")]
        [Display(Name = "Name")]
        [Required]
        public string Name { get; set; }

        [MaxLength(6000, ErrorMessage = "Description should be shorter than 6000 symbols")]
        [DataType(DataType.MultilineText)]
        [Display(Name = "Description")]
        public string Description { get; set; }

        [Range(0, 2)]
        public int ViewMode { get; set; }

        [Range(0, 2)]
        public int EditMode { get; set; }

        public IList<UserDisplayModel> ViewUsers { get; set; }

        public IList<UserDisplayModel> EditUsers { get; set; }
    }
}
