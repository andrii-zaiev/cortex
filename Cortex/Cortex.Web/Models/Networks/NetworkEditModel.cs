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
