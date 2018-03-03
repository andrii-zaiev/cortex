using System;

namespace Cortex.Web.Models
{
    public class NetworkModel
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public string AuthorName { get; set; }

        public string AuthorLogin { get; set; }
    }
}
