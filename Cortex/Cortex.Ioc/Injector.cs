using System;
using Cortex.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Cortex.Ioc
{
    public class Injector
    {
        public static void Configure(IServiceCollection services, IConfiguration configuration)
        {
            string connectionString = configuration.GetConnectionString("CortexDB");

            services.AddDbContext<DatabaseContext>(builder => builder.UseSqlServer(connectionString));
        }
    }
}
