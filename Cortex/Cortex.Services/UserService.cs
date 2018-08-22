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
using Cortex.DomainModels;
using Cortex.Repositories.Interfaces;
using Cortex.Services.Dtos;
using Cortex.Services.Interfaces;

namespace Cortex.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IList<User>> GetUsersAsync(IList<Guid> ids)
        {
            if (ids.Count == 0)
            {
                return new List<User>();
            }

            IList<UserModel> users = await _userRepository.GetUsersAsync(ids);

            return users.Select(u => new User(u)).ToList();
        }

        public async Task<User> GetUserAsync(Guid id)
        {
            UserModel user = await _userRepository.GetByIdAsync(id);

            return new User(user);
        }

        public async Task<IList<User>> FindUsersAsync(string query)
        {
            IList<UserModel> users = await _userRepository.FindUsersAsync(query);

            return users.Select(u => new User(u)).ToList();
        }
    }
}
