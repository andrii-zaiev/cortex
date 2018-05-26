using System;
using Cortex.Services.Dtos;

namespace Cortex.Web.Models.Api
{
    public class UserModel
    {
        public UserModel(User user)
        {
            Id = user.Id;
            UserName = user.UserName.ToLower();
            Name = user.Name;
        }

        public Guid Id { get; }

        public string UserName { get; }

        public string Name { get; }
    }
}
