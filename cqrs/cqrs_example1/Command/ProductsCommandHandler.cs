using cqrs_example1.Domain;
using cqrs_example1.Repository;

namespace cqrs_example1.Command
{
  public class ProductsCommandHandler
    :
  // ICommandHandler<AddNewProduct>,
  // ICommandHandler<AddToInventory>,
  // ICommandHandler<ConfirmItemShipped>,
  // ICommandHandler<UpdateStockFromInventoryRecount>,
    ICommandHandler<RateProduct>
  {
    private readonly IRepository<Product> repository;

    public ProductsCommandHandler(IRepository<Product> repository)
    {
      this.repository = repository;
    }
    public void Handle(RateProduct command)
    {

      var product = repository.Find(command.ProductId);
      if (product != null)
      {
        repository.RateProduct(product, command.Rating);
      }
    }
  }

  // void Handle(AddNewProduct command)
  // {
  //   //Não implementado
  // }


  // void Handle(AddToInventory command)
  // {
  //   //Não implementado
  // }

  // void Handle(ConfirmItemsShipped command)
  // {
  //   //Não implementado
  // }

  // void Handle(UpdateStockFromInventoryRecount command)
  // {
  //   //Não implementado
  // }
}