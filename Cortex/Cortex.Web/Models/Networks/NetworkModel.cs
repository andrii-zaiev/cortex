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
        public NetworkModel(Network network, User owner)
        {
            Id = network.Id;
            Name = network.Name;
            Description = network.Description;
            CreatedDate = network.CreatedDate;
            //Author = new UserDisplayModel(owner);
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public UserDisplayModel Author { get; set; }
    }
}
