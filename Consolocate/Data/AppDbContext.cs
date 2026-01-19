// Data/AppDbContext.cs
using ConsoLocate.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace ConsoLocate.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Location> Locations { get; set; }
    }
}