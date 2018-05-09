using System;
using Cortex.Web.Models.Shared;

namespace Cortex.Web.Models.NetworkVersions
{
    public class NetworkVersionModel
    {
        public NetworkVersionModel()
        {
            
        }

        public Guid Id { get; }

        public string Comment { get; }

        public DateTimeOffset CreatedDate { get; }

        public UserDisplayModel Author { get; }
    }
}
