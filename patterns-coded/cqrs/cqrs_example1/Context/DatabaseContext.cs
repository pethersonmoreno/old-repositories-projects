using Microsoft.EntityFrameworkCore;
using cqrs_example1.Domain;
using System.ComponentModel.DataAnnotations.Schema;

namespace cqrs_example1.Context
{
  public class DatabaseContext : DbContext
  {
    public DatabaseContext(DbContextOptions options) : base(options)
    { }

    public DbSet<Product> Product { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<Product>(entity =>
      {
        entity.Property(e => e.Id)
          .ValueGeneratedOnAdd();
        entity.Property(e => e.Name)
          .HasMaxLength(150)
          .IsRequired();
        entity.Property(e => e.Description)
          .HasMaxLength(255)
          .IsRequired();
        entity.Property(e => e.Price)
          .IsRequired();
      });
    }
  }
}