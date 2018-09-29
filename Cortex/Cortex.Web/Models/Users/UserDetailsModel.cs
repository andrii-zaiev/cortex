using System;
using Cortex.Services.Dtos;

namespace Cortex.Web.Models.Users
{
    public class UserDetailsModel
    {
        public UserDetailsModel(User user)
        {
            Id = user.Id;
            Name = user.Name;
            UserName = user.UserName.ToLower();
        }

        public Guid Id { get; }

        public string Name { get; }

        public string UserName { get; }
    }
}
