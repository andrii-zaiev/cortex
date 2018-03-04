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
