using System;
using System.Threading;
using System.Threading.Tasks;
using Cortex.DomainModels;
using Cortex.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Cortex.Auth
{
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
    public class UserStore : IUserPasswordStore<IdentityUser>, IUserEmailStore<IdentityUser>
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
            UserModel userModel = await _userRepository.GetByIdAsync(user.Id);

            return userModel.UserName;
        }

        public async Task SetUserNameAsync(IdentityUser user, string userName, CancellationToken cancellationToken)
        {
            UserModel userModel = await _userRepository.GetByIdAsync(user.Id);
            userModel.UpdateUserName(userName);
            await _userRepository.UpdateAsync(userModel);
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
            UserModel userModel = UserModel.CreateNew(user.Name, user.UserName, user.Email, user.PasswordHash);

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
                    .UpdatePasswordHash(user.PasswordHash);

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
            UserModel userModel = await _userRepository.GetByIdAsync(user.Id);
            userModel.UpdatePasswordHash(passwordHash);
            await _userRepository.UpdateAsync(userModel);
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
            UserModel userModel = await _userRepository.GetByIdAsync(user.Id);
            userModel.UpdateEmail(email);
            await _userRepository.UpdateAsync(userModel);
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
                UserName = user.UserName
            };
        }
    }
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
}
