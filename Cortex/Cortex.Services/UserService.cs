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
            IList<UserModel> users = await _userRepository.GetUsersAsync(ids);

            return users.Select(u => new User(u)).ToList();
        }

        public async Task<User> GetUserAsync(Guid id)
        {
            UserModel user = await _userRepository.GetByIdAsync(id);

            return new User(user);
        }
    }
}
