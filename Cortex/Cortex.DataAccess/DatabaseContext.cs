// Cortex - web application for creating and managing neural networks diagrams.
// Copyright (C) 2018  Andrii Zaiev <andrii.zaiev@gmail.com>
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.


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
