using System;
using System.ComponentModel.DataAnnotations;
using Cortex.Services.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Cortex.Web.Models.Networks
{
    public class NetworkEditModel
    {
        public NetworkEditModel()
        {
        }

        public NetworkEditModel(Network network)
        {
            Id = network.Id;
            Name = network.Name;
            Description = network.Description;
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
    }
}
