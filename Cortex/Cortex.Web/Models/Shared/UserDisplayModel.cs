using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cortex.Services.Dtos;

namespace Cortex.Web.Models.Shared
{
    public class UserDisplayModel
    {
        public UserDisplayModel(User user)
        {
            Name = user.Name;
            UserName = user.UserName;
        }

        public string Name { get; set; }

        public string UserName { get; set; }
    }
}
