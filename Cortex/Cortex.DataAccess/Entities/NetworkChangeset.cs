using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cortex.DataAccess.Entities
{
    public class NetworkChangeset
    {
        public Guid Id { get; set; }

        public string Comment { get; set; }

        [ForeignKey(nameof(Network))]
        public Guid NetworkId { get; set; }

        public DateTimeOffset Date { get; set; }

        [ForeignKey(nameof(Author))]
        public Guid AuthorId { get; set; }

        public Network Network { get; set; }

        public User Author { get; set; }
    }
}
