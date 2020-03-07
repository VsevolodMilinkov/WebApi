using System.Linq;

namespace WebApi.Models
{
    public interface IProductRepository
    {
        IQueryable<ProductDto> GetProducts();
        ProductDto GetProduct(int id);
        void Put(ProductDto product);
        void Post(ref ProductDto product);
        void Delete(int id);
        bool ProductExists(int id);
    }
}
