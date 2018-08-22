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
using Cortex.Auth;
using Cortex.DataAccess;
using Cortex.Repositories.Implementation;
using Cortex.Repositories.Interfaces;
using Cortex.Services;
using Cortex.Services.Interfaces;
using Cortex.VersionsStorage;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Cortex.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string connectionString = Configuration.GetConnectionString("CortexDB");

            services.AddDbContext<DatabaseContext>(builder => builder.UseSqlServer(connectionString));

            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<INetworkRepository, NetworkRepository>();
            services.AddTransient<INetworkChangesetRepository, NetworkChangesetRepository>();

            services.AddTransient<INetworkVersionsStorage, NetworkVersionsStorage>();

            services.AddTransient<INetworkService, NetworkService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<INetworkVersionsService, NetworkVersionsService>();

            services.ConfigureAuth();

            services.ConfigureApplicationCookie(options =>
            {
                options.ExpireTimeSpan = TimeSpan.FromDays(30);
                options.AccessDeniedPath = "/log-in";
                options.LoginPath = "/log-in";
                options.LogoutPath = "/log-out";
            });

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });
        }
    }
}
