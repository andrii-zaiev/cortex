using System;
using System.Collections.Generic;
using System.Text;

namespace Cortex.Services.Dtos
{
    public class NetworkUpdate
    {
        public NetworkUpdate(string name, string description)
        {
            Name = name;
            Description = description;
        }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
