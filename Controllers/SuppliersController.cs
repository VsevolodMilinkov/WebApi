using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class SuppliersController : ApiController
    {
        private readonly ISupplierRepository repo;
        public SuppliersController(ISupplierRepository r)
        {
            this.repo = r;
        }

        public IQueryable<SupplierDto> Get()
        {
            return repo.GetSuppliers();
        }

        // GET: api/Suppliers/5
        [ResponseType(typeof(SupplierDto))]
        public IHttpActionResult Get(int id)
        {
            var dto = repo.GetSupplier(id);
            if (dto == null)
            {
                return NotFound();
            }
            return Ok(dto);
        }

        // PUT: api/Suppliers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Put(int id, SupplierDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != dto.SupplierID)
            {
                return BadRequest();
            }
            try
            {
                repo.Put(dto);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!repo.SupplierExists(id))
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

        // POST: api/Suppliers
        [ResponseType(typeof(SupplierDto))]
        public IHttpActionResult Post(SupplierDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            repo.Post(ref dto);

            return CreatedAtRoute("DefaultApi", new { id = dto.SupplierID }, dto);
        }

        // DELETE: api/Suppliers/5
        [ResponseType(typeof(Supplier))]
        public IHttpActionResult Delete(int id)
        {
            repo.Delete(id);
            return Ok(id);
        }

    }
}