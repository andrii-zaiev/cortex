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

        public static UserModel CreateNew(Guid id, string name, string userName, string email, string passwordHash)
        {
            return new UserModel(
                id,
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
