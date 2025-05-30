namespace cqrs_example1.Domain
{
    public interface IProductsDomain
    {
        void AddNewProduct(int id, string name, string description, decimal price);
        void RateProduct(int userId, int rating);
        void AddToInventory(int productId, int quantity);
        void ConfirmItemsShipped(int productId, int quantity);
        void UpdateStockFromInventoryRecount(int productId, int updatedQuantity);
    }
}