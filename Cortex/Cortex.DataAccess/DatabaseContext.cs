using System.Collections.Generic;
using System.IO;
using System.Linq;
using Cortex.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Cortex.DataAccess
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Network> Networks { get; set; }

        public DbSet<NetworkAccess> NetworkAccesses { get; set; }

        public DbSet<NetworkUserAccess> NetworkUserAccesses { get; set; }

        public DbSet<NetworkChangeset> NetworkChangesets { get; set; }

        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            optionsBuilder.UseSqlServer("Server=DESKTOP-JMUQI7S;Database=CortexDB;User Id=sa;Password=#2Pencil;");
        }

        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            IEnumerable<IMutableForeignKey> foreignKeys = modelbuilder.Model
                .GetEntityTypes()
                .SelectMany(t => t.GetForeignKeys());

            foreach (IMutableForeignKey foreignKey in foreignKeys)
            {
                foreignKey.DeleteBehavior = DeleteBehavior.Restrict;
            }

            modelbuilder.Entity<User>()
                .HasAlternateKey(u => u.UserName);

            base.OnModelCreating(modelbuilder);
        }
    }
}
