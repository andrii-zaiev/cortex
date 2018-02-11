using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cortex.DataAccess.Models
{
    public class Network
    {
        public Guid Id { get; set; }

        [MaxLength(300)]
        public string Name { get; set; }

        public string Description { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        [ForeignKey(nameof(Owner))]
        public Guid OwnerId { get; set; }

        [ForeignKey(nameof(ReadAccess))]
        public Guid ReadAccessId { get; set; }

        [ForeignKey(nameof(WriteAccess))]
        public Guid WriteAccessId { get; set; }

        public User Owner { get; set; }

        public NetworkAccess ReadAccess { get; set; }

        public NetworkAccess WriteAccess { get; set; }
    }
}
