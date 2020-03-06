using System.Linq;

namespace WebApi.Models
{
    public interface IProductRepository
    {
        IQueryable<ProductDto> GetProducts();
        ProductDto GetProduct(int id);
        void Put(Product product);
        void Post(Product product);
        void Delete(int id);
        bool ProductExists(int id);
    }
}
