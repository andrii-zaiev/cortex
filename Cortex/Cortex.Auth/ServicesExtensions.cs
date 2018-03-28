using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;

namespace Cortex.Auth
{
    public static class ServicesExtensions
    {
        public static void ConfigureAuth(this IServiceCollection services)
        {
            services.AddIdentity<IdentityUser, DefaultIdentityRole>(options =>
                {
                    options.Password.RequiredLength = 0;
                    options.Password.RequireDigit = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequiredUniqueChars = 0;
                })
                .AddUserStore<UserStore>()
                .AddRoleStore<DefaultUserRoleStore>();
        }
    }
}
