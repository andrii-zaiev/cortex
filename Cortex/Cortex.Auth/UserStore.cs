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
using System.Threading;
using System.Threading.Tasks;
using Cortex.DomainModels;
using Cortex.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Cortex.Auth
{
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
    public class UserStore
        : IUserPasswordStore<IdentityUser>,
          IUserEmailStore<IdentityUser>,
          IUserSecurityStampStore<IdentityUser>
    {
        private readonly IUserRepository _userRepository;

        public UserStore(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public void Dispose()
        {
        }

        public async Task<string> GetUserIdAsync(IdentityUser user, CancellationToken cancellationToken)
        {
            return user.Id.ToString();
        }

        public async Task<string> GetUserNameAsync(IdentityUser user, CancellationToken cancellationToken)
        {
            return user.UserName;
        }

        public async Task SetUserNameAsync(IdentityUser user, string userName, CancellationToken cancellationToken)
        {
            user.UserName = userName;
        }

        public Task<string> GetNormalizedUserNameAsync(IdentityUser user, CancellationToken cancellationToken)
        {
            return GetUserNameAsync(user, cancellationToken);
        }

        public Task SetNormalizedUserNameAsync(IdentityUser user, string normalizedName, CancellationToken cancellationToken)
        {
            return SetUserNameAsync(user, normalizedName, cancellationToken);
        }

        public async Task<IdentityResult> CreateAsync(IdentityUser user, CancellationToken cancellationToken)
        {
            UserModel userModel = UserModel.CreateNew(user.Id, user.Name, user.UserName, user.Email, user.PasswordHash, user.Stamp);

            await _userRepository.CreateAsync(userModel);

            return IdentityResult.Success;
        }

        public async Task<IdentityResult> UpdateAsync(IdentityUser user, CancellationToken cancellationToken)
        {
            UserModel userModel = await _userRepository.GetByIdAsync(user.Id);
            if (userModel != null)
            {
                userModel.UpdateUserName(user.UserName)
                    .UpdateEmail(user.Email)
                    .UpdateName(user.Name)
                    .UpdatePasswordHash(user.PasswordHash)
                    .UpdateStamp(user.Stamp);

                await _userRepository.UpdateAsync(userModel);

                return IdentityResult.Success;
            }
            
            return IdentityResult.Failed(new IdentityError
            {
                Description = "User does not exist"
            });
        }

        public Task<IdentityResult> DeleteAsync(IdentityUser user, CancellationToken cancellationToken)
        {
            throw new InvalidOperationException("User deletion is not allowed");
        }

        public async Task<IdentityUser> FindByIdAsync(string userId, CancellationToken cancellationToken)
        {
            Guid id = Guid.Parse(userId);
            UserModel user = await _userRepository.GetByIdAsync(id);
            return ConvertToIdentityUser(user);
        }

        public async Task<IdentityUser> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        {
            UserModel user = await _userRepository.GetByUserNameAsync(normalizedUserName);
            return ConvertToIdentityUser(user);
        }

        public async Task SetPasswordHashAsync(IdentityUser user, string passwordHash, CancellationToken cancellationToken)
        {
            user.PasswordHash = passwordHash;
        }

        public async Task<string> GetPasswordHashAsync(IdentityUser user, CancellationToken cancellationToken)
        {
            return user.PasswordHash;
        }

        public async Task<bool> HasPasswordAsync(IdentityUser user, CancellationToken cancellationToken)
        {
            return user.PasswordHash != null;
        }

        public async Task SetEmailAsync(IdentityUser user, string email, CancellationToken cancellationToken)
        {
            user.Email = email;
        }

        public async Task<string> GetEmailAsync(IdentityUser user, CancellationToken cancellationToken)
        {
            return user.Email;
        }

        public async Task<bool> GetEmailConfirmedAsync(IdentityUser user, CancellationToken cancellationToken)
        {
            return true;
        }

        public async Task SetEmailConfirmedAsync(IdentityUser user, bool confirmed, CancellationToken cancellationToken)
        {
        }

        public async Task<IdentityUser> FindByEmailAsync(string normalizedEmail, CancellationToken cancellationToken)
        {
            UserModel user = await _userRepository.GetByEmailAsync(normalizedEmail);
            return ConvertToIdentityUser(user);
        }

        public async Task<string> GetNormalizedEmailAsync(IdentityUser user, CancellationToken cancellationToken)
        {
            return user.Email;
        }

        public Task SetNormalizedEmailAsync(IdentityUser user, string normalizedEmail, CancellationToken cancellationToken)
        {
            return SetEmailAsync(user, normalizedEmail, cancellationToken);
        }

        public async Task SetSecurityStampAsync(IdentityUser user, string stamp, CancellationToken cancellationToken)
        {
            user.Stamp = stamp;
        }

        public async Task<string> GetSecurityStampAsync(IdentityUser user, CancellationToken cancellationToken)
        {
            return user.Stamp;
        }

        private static IdentityUser ConvertToIdentityUser(UserModel user)
        {
            if (user == null)
            {
                return null;
            }

            return new IdentityUser
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                PasswordHash = user.PasswordHash,
                UserName = user.UserName,
                Stamp = user.Stamp
            };
        }
    }
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
}
