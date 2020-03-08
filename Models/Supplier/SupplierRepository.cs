using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace WebApi.Models
{
    public class SupplierRepository : ISupplierRepository
    {
        private NorthwindEntities db;
        public SupplierRepository(NorthwindEntities context)
        {
            db = context;
        }
        public IQueryable<SupplierDto> GetSuppliers()
        {
            return from s in db.Suppliers
                   orderby s.SupplierID
                   select new SupplierDto
                   {
                       SupplierID = s.SupplierID,
                       CompanyName = s.CompanyName,
                       ContactName = s.ContactName,
                       ContactTitle = s.ContactTitle,
                       City = s.City,
                       Country = s.Country,
                       HomePage = s.HomePage
                   };
        }
        public SupplierDto GetSupplier(int id)
        {
            return this.GetSuppliers().SingleOrDefault(x => x.SupplierID == id);
        }
        public void Put(SupplierDto dto)
        {

            var supplier = db.Suppliers.FirstOrDefault(x => x.SupplierID == dto.SupplierID);
            if (supplier != null)
            {               
                supplier.CompanyName = dto.CompanyName;
                supplier.ContactName = dto.ContactName;
                supplier.ContactTitle = dto.ContactTitle;
                supplier.City = dto.City;
                supplier.Country = dto.Country;
                supplier.HomePage = dto.HomePage;
            }
            db.Entry(supplier).State = EntityState.Modified;
            db.SaveChangesAsync();
            dto.SupplierID = supplier.SupplierID;
        }
        public void Post(ref SupplierDto dto)
        {
            var supplier = new Supplier();
            supplier.SupplierID = db.Suppliers.Max(x => x.SupplierID) + 1;
            supplier.CompanyName = dto.CompanyName;
            supplier.ContactName = dto.ContactName;
            supplier.ContactTitle = dto.ContactTitle;
            supplier.City = dto.City;
            supplier.Country = dto.Country;
            supplier.HomePage = dto.HomePage;
            db.Suppliers.Add(supplier);
            db.SaveChangesAsync();
            dto.SupplierID = supplier.SupplierID;
        }
        public void Delete(int id)
        {
            Supplier supplier = db.Suppliers.Find(id);
            if (supplier == null)
            {
                throw new Exception("Не существует поставщика с указанным ID!");
            }

            db.Suppliers.Remove(supplier);
            db.SaveChangesAsync();
        }
        public bool SupplierExists(int id)
        {
            return db.Suppliers.Count(e => e.SupplierID == id) > 0;
        }
    }
}
