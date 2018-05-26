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
