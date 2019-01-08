namespace cqrs_example1.Command
{
    public class ProductsCommandHandler :
    ICommandHandler<AddNewProduct>,
    ICommandHandler<RateProduct>,
    ICommandHandler<AddToInventory>,
    ICommandHandler<ConfirmItemShipped>,
    ICommandHandler<UpdateStockFromInventoryRecount>
    {
        private readonly IRepository<Product> repository;

        public ProductsCommandHandler(IRepository<Product> repository)
        {
            this.repository = repository;
        }

        void Handle(AddNewProduct command)
        {
            //Não implementado
        }

        void Handle(RateProduct command)
        {
            var product = repository.Find(command.ProductId);
            if (product != null)
            {
                product.RateProduct(command.UserId, command.Rating);
                repository.Save(product);
            }
        }

        void Handle(AddToInventory command)
        {
            //Não implementado
        }

        void Handle(ConfirmItemsShipped command)
        {
            //Não implementado
        }

        void Handle(UpdateStockFromInventoryRecount command)
        {
            //Não implementado
        }
    }
}