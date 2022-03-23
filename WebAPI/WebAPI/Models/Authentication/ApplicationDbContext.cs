using WebAPI.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace WebAPI.Models
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public virtual DbSet<Manufacturer> Manufacturer { get; set; }
        public virtual DbSet<Model> Model { get; set; }
        public virtual DbSet<VehicleStatus> VehicleStatus { get; set; }
        public virtual DbSet<Vehicles> Vehicles { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Manufacturer>(entity =>
            {
                entity.Property(e => e.Country).HasColumnName("country");

                entity.Property(e => e.ManufacturerName)
                    .IsRequired()
                    .HasColumnName("manufacturer_name")
                    .HasMaxLength(50);
            });

            builder.Entity<Model>(entity =>
            {
                entity.Property(e => e.FirstProductionDate)
                    .HasColumnName("first_production_date")
                    .HasColumnType("datetime");

                entity.Property(e => e.ManufacturerId).HasColumnName("Manufacturer_Id");

                entity.Property(e => e.ModelName)
                    .IsRequired()
                    .HasColumnName("Model_name")
                    .HasMaxLength(50);

                entity.HasOne(d => d.Manufacturer)
                    .WithMany(p => p.Model)
                    .HasForeignKey(d => d.ManufacturerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Model_Manufacturer");
            });

            builder.Entity<VehicleStatus>(entity =>
            {
                entity.Property(e => e.StatusName)
                    .IsRequired()
                    .HasColumnName("status_name")
                    .HasMaxLength(50);
            });

            builder.Entity<Vehicles>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Colour)
                    .HasColumnName("colour")
                    .HasMaxLength(50);

                entity.Property(e => e.ModelId).HasColumnName("model_id");

                entity.Property(e => e.StatusId).HasColumnName("status_id");

                entity.Property(e => e.Year).HasColumnName("year");

                entity.HasOne(d => d.Model)
                    .WithMany(p => p.Vehicles)
                    .HasForeignKey(d => d.ModelId)
                    .HasConstraintName("FK_Vehicles_Model");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.Vehicles)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Vehicles_VehicleStatus");
            });
        }
    }
}
