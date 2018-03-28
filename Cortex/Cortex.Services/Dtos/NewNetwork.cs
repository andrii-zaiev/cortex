using System;

namespace Cortex.Services.Dtos
{
    public class NewNetwork
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public Guid OwnerId { get; set; }
    }
}
