using System;
using System.Threading.Tasks;
using Cortex.DomainModels;

namespace Cortex.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task CreateAsync(UserModel user);

        Task<UserModel> GetByIdAsync(Guid id);

        Task UpdateAsync(UserModel user);

        Task<UserModel> GetByUserNameAsync(string userName);

        Task<UserModel> GetByEmailAsync(string email);
    }
}