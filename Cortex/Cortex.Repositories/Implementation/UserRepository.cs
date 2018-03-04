using System;
using System.Linq;
using System.Threading.Tasks;
using Cortex.DataAccess;
using Cortex.DataAccess.Entities;
using Cortex.DomainModels;
using Cortex.Exceptions;
using Cortex.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Cortex.Repositories.Implementation
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(DatabaseContext context) : base(context)
        {
        }

        public new async Task<UserModel> GetByIdAsync(Guid id)
        {
            User entity = await base.GetByIdAsync(id);

            return ConvertEntityToModel(entity);
        }

        public async Task CreateAsync(UserModel user)
        {
            var entity = new User
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                PasswordHash = user.PasswordHash,
                UserName = user.UserName
            };

            await base.CreateAsync(entity);
        }

        public async Task UpdateAsync(UserModel user)
        {
            User entity = await base.GetByIdAsync(user.Id);

            if (entity != null)
            {
                entity.Email = user.Email;
                entity.Name = user.Name;
                entity.PasswordHash = user.PasswordHash;
                entity.UserName = user.UserName;

                await base.UpdateAsync(entity);
            }
            else
            {
                throw new EntityNotFoundException(typeof(User), user.Id);
            }
        }

        public async Task<UserModel> GetByUserNameAsync(string userName)
        {
            User entity = await Context.Users.SingleOrDefaultAsync(user => user.UserName == userName);

            return ConvertEntityToModel(entity);
        }

        public async Task<UserModel> GetByEmailAsync(string email)
        {
            User entity = await Context.Users.SingleOrDefaultAsync(user => user.Email == email);

            return ConvertEntityToModel(entity);
        }

        private static UserModel ConvertEntityToModel(User entity)
        {
            if (entity == null)
            {
                return null;
            }

            return new UserModel(
                entity.Id,
                entity.Name,
                entity.UserName,
                entity.Email,
                entity.PasswordHash);
        }
    }
}
