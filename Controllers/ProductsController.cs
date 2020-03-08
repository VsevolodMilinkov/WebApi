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
            var dto = repo.GetProduct(id);
            if (dto == null)
            {
                return NotFound();
            }
            return Ok(dto);
        }

        // PUT: api/Products/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Put(int id, ProductDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != dto.ProductID)
            {
                return BadRequest();
            }
            try
            {
               repo.Put(dto);               
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
        public IHttpActionResult Post(ProductDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            repo.Post(ref dto);

            return CreatedAtRoute("DefaultApi", new { id = dto.ProductID }, dto);
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