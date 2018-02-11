using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cortex.DataAccess.Models
{
    public class NetworkChangeset
    {
        public Guid Id { get; set; }

        public string Comment { get; set; }

        [ForeignKey(nameof(Network))]
        public Guid NetworkId { get; set; }

        public DateTimeOffset Date { get; set; }

        public Network Network { get; set; }
    }
}
