using System;
using Cortex.DomainModels;

namespace Cortex.Services.Dtos
{
    public class User
    {
        public User(UserModel user)
        {
            Id = user.Id;
            Name = user.Name;
            UserName = user.UserName;
            Email = user.Email;
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }
    }
}