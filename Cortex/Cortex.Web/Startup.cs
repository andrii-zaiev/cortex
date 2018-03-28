using Cortex.Auth;
using Cortex.DataAccess;
using Cortex.Repositories.Implementation;
using Cortex.Repositories.Interfaces;
using Cortex.Services;
using Cortex.Services.Interfaces;
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

            services.AddTransient<INetworkService, NetworkService>();

            services.ConfigureAuth();

            services.ConfigureApplicationCookie(options =>
            {
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
