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


using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Cortex.DataAccess;

namespace Cortex.Repositories
{
    public abstract class BaseRepository<T>
        where T : class
    {
        protected BaseRepository(DatabaseContext context)
        {
            Context = context;
        }

        protected DatabaseContext Context { get; }

        protected Task<T> GetByIdAsync(Guid id)
        {
            return Context.FindAsync<T>(id);
        }

        protected async Task CreateAsync(T entity)
        {
            await Context.AddAsync(entity);
            await Context.SaveChangesAsync();
        }

        protected async Task UpdateAsync(T entity)
        {
            Context.Attach(entity);
            await Context.SaveChangesAsync();
        }
    }
}
