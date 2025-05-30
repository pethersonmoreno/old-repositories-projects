namespace cqrs_example1.Repository
{
  public interface IRepository<TEntity>
  {
    TEntity Find(int Id);

    void Add(TEntity entity);
    void RateProduct(TEntity entity, int rating);
    void AddToInventory(int productId, int quantity);
    void ConfirmItemsShipped(int productId, int quantity);
    void UpdateStockFromInventoryRecount(int productId, int updatedQuantity);
  }
}