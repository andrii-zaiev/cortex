using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cortex.Services.Dtos;

namespace Cortex.Services.Interfaces
{
    public interface IUserService
    {
        Task<IList<User>> GetUsersAsync(IList<Guid> ids);

        Task<User> GetUserAsync(Guid id);

        Task<IList<User>> FindUsersAsync(string query);
    }
}