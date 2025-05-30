using System;

namespace cqrs_example1.Command
{
  public class RateProduct : ICommand
  {
    public RateProduct()
    {
      this.Id = Guid.NewGuid();
    }
    public Guid Id { get; set; }
    public int ProductId { get; set; }
    public int Rating { get; set; }
    public int UserId { get; set; }
  }
}