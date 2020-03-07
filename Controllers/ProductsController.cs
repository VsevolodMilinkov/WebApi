using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class ProductsController : ApiController
    {
        private readonly IProductRepository repo;
        public ProductsController(IProductRepository r)
        {
            this.repo = r;
        }

        public IQueryable<ProductDto> Get()
        {
            return repo.GetProducts();
        }

        // GET: api/Products/5
        [ResponseType(typeof(ProductDto))]
        public IHttpActionResult Get(int id)
        {
            var product = repo.GetProduct(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        // PUT: api/Products/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Put(int id, Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != product.ProductID)
            {
                return BadRequest();
            }
            try
            {
               repo.Put(product);               
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!repo.ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Products
        [ResponseType(typeof(ProductDto))]
        public IHttpActionResult Post(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            repo.Post(product);

            var dto = this.Get();
            return CreatedAtRoute("DefaultApi", new { id = product.ProductID }, dto);
        }

        // DELETE: api/Products/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult Delete(int id)
        {
            repo.Delete(id);
            return Ok(id);
        }

    }
}