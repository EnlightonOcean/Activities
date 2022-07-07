using Application.Core;
using Application.MediatorActivity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Persistence;
using Persistence.Interface;

namespace API.Extensions;
public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services,
        IConfiguration _config){

        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
        });
        // services.AddLogging(x => {
        //   x.AddConsole();
        // });

        //services.AddScoped<IRepository<Activity>,ActivityRepository>();
        services.AddScoped<IUnitOfWork,UnitOfWork>();
        services.AddDbContext<DataContext>(opt => {
            opt.UseSqlite(_config.GetConnectionString("DefaultConnection"));
        });
        services.AddCors(options => {
            options.AddPolicy("CorsPolicy",policy =>{
                policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
            });
        });
        services.AddMediatR(typeof(List.Handler).Assembly);
        services.AddAutoMapper(typeof(MappingProfiles).Assembly);
        return services;
    }
}
