using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cortex.DataAccess.Models
{
    public class NetworkUserAccess
    {
        public Guid Id { get; set; }

        [ForeignKey(nameof(NetworkAccess))]
        public Guid NetworkAccessId { get; set; }

        [ForeignKey(nameof(User))]
        public Guid UserId { get; set; }

        public NetworkAccess NetworkAccess { get; set; }

        public User User { get; set; }
    }
}
