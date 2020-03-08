using System;
using System.Linq;

namespace WebApi.Models
{
    public interface ISupplierRepository
    {
        IQueryable<SupplierDto> GetSuppliers();
        SupplierDto GetSupplier(int id);
        void Put(SupplierDto dto);
        void Post(ref SupplierDto dto);
        void Delete(int id);
        bool SupplierExists(int id);
    }
}
