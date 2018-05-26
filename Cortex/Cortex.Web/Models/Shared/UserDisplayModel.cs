using System;
using Cortex.Services.Dtos;

namespace Cortex.Web.Models.Shared
{
    public class UserDisplayModel
    {
        public UserDisplayModel(User user)
        {
            Id = user.Id;
            Name = user.Name;
            UserName = user.UserName;
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string UserName { get; set; }
    }
}
