using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace cqrs_example1.Context
{
  public class DatabaseContextFactory : IDesignTimeDbContextFactory<DatabaseContext>
  {
    public DatabaseContext CreateDbContext(string[] args)
    {
      var optionsBuilder = new DbContextOptionsBuilder<DatabaseContext>();
      optionsBuilder.UseMySQL("server=localhost;database=cqrs_example1;user=root;password=");

      return new DatabaseContext(optionsBuilder.Options);
    }
  }
}