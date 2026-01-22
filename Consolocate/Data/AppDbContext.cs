using ConsoLocate.Models;
using Microsoft.EntityFrameworkCore;

namespace ConsoLocate.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Location> Locations { get; set; }

        public DbSet<Building> Buildings { get; set; }
        public DbSet<BuildingCoordinate> BuildingCoordinates { get; set; }
        public DbSet<BuildingOffice> BuildingOffices { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Unique Code
            modelBuilder.Entity<Building>()
                .HasIndex(b => b.Code)
                .IsUnique();

            // Relations + cascade delete (pag delete building, delete coords & offices)
            modelBuilder.Entity<BuildingCoordinate>()
                .HasOne(c => c.Building)
                .WithMany(b => b.Coordinates)
                .HasForeignKey(c => c.BuildingId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<BuildingOffice>()
                .HasOne(o => o.Building)
                .WithMany(b => b.Offices)
                .HasForeignKey(o => o.BuildingId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
