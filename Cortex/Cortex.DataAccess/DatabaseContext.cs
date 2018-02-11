using Cortex.DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace Cortex.DataAccess
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Network> Networks { get; set; }

        public DbSet<NetworkAccess> NetworkAccesses { get; set; }

        public DbSet<NetworkUserAccess> NetworkUserAccesses { get; set; }

        public DbSet<User> Users { get; set; }
    }
}
