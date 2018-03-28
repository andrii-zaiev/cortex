using System;
using System.Collections.Generic;
using System.Text;
using Cortex.DataAccess.Entities;

namespace Cortex.DomainModels
{
    public class UserModel
    {
        public UserModel(User user)
            : this(user.Id, user.Name, user.UserName, user.Email, user.PasswordHash)
        {
        }

        private UserModel(Guid id, string name, string userName, string email, string passwordHash)
        {
            Id = id;
            Name = name;
            UserName = userName;
            Email = email;
            PasswordHash = passwordHash;
        }

        public Guid Id { get; private set; }

        public string Name { get; private set; }

        public string UserName { get; private set; }

        public string Email { get; private set; }

        public string PasswordHash { get; private set; }

        public static UserModel CreateNew(string name, string userName, string email, string passwordHash)
        {
            return new UserModel(
                Guid.NewGuid(),
                name,
                userName?.ToUpper(),
                email?.ToUpper(),
                passwordHash);
        }

        public UserModel UpdateName(string name)
        {
            Name = name;
            return this;
        }

        public UserModel UpdateUserName(string userName)
        {
            UserName = userName.ToUpper();
            return this;
        }

        public UserModel UpdateEmail(string email)
        {
            Email = email.ToUpper();
            return this;
        }

        public UserModel UpdatePasswordHash(string passwordHash)
        {
            PasswordHash = passwordHash;
            return this;
        }
    }
}
