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

            return new UserModel(entity);
        }

        public async Task CreateAsync(UserModel user)
        {
            var entity = new User
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                PasswordHash = user.PasswordHash,
                UserName = user.UserName,
                Stamp = user.Stamp
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
                entity.Stamp = user.Stamp;

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

            if (entity == null)
            {
                return null;
            }

            return new UserModel(entity);
        }

        public async Task<UserModel> GetByEmailAsync(string email)
        {
            User entity = await Context.Users.SingleOrDefaultAsync(user => user.Email == email);

            if (entity == null)
            {
                return null;
            }

            return new UserModel(entity);
        }

        public async Task<IList<UserModel>> GetUsersAsync(IList<Guid> ids)
        {
            List<User> entities = await Context.Users
                .Where(u => ids.Contains(u.Id))
                .ToListAsync();

            return entities.Select(u => new UserModel(u)).ToList();
        }

        public async Task<IList<UserModel>> FindUsersAsync(string query)
        {
            List<User> entities = await Context.Users
                .Where(u => u.Name.Contains(query)
                         || u.UserName.StartsWith(query))
                .ToListAsync();

            return entities.Select(u => new UserModel(u)).ToList();
        }
    }
}
