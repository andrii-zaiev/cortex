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
    public class NetworkUpdateModel
    {
        public NetworkUpdateModel()
        {
        }

        public Guid Id { get; set; }

        [MaxLength(100, ErrorMessage = "Name should be shorter than 100 symbols")]
        [Required]
        public string Name { get; set; }

        [MaxLength(6000, ErrorMessage = "Description should be shorter than 6000 symbols")]
        public string Description { get; set; }

        [Range(0, 2)]
        public int ViewMode { get; set; }

        [Range(0, 2)]
        public int EditMode { get; set; }

        public IList<Guid> ViewUsers { get; set; }

        public IList<Guid> EditUsers { get; set; }
    }
}
