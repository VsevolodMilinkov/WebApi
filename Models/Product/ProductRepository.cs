using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace WebApi.Models
{
    public class ProductRepository : IProductRepository
    {
        private NorthwindEntities db;
        public ProductRepository(NorthwindEntities context)
        {
            db = context;
        }
        public IQueryable<ProductDto> GetProducts()
        {
            return from p in db.Products
                   orderby p.ProductID
                   select new ProductDto
                   {
                       ProductID = p.ProductID,
                       ProductName = p.ProductName,
                       QuantityPerUnit = p.QuantityPerUnit,
                       UnitPrice = p.UnitPrice,
                       UnitsInStock = p.UnitsInStock,
                       UnitsOnOrder = p.UnitsOnOrder,
                       ReorderLevel = p.ReorderLevel,
                       Discontinued = p.Discontinued
                   };
        }
        public ProductDto GetProduct(int id)
        {
            return this.GetProducts().SingleOrDefault(x => x.ProductID == id);
        }
        public void Put(Product product)
        {
            db.Entry(product).State = EntityState.Modified;
            db.SaveChangesAsync();
        }
        public void Post(Product product)
        {
            db.Products.Add(product);
            db.SaveChangesAsync();
        }
        public void Delete(int id)
        {
            Product product = db.Products.Find(id);
            if (product == null)
            {
                throw new Exception("Не существует товара с указанным ID!");
            }

            db.Products.Remove(product);
            db.SaveChangesAsync();
        }
        public bool ProductExists(int id)
        {
            return db.Products.Count(e => e.ProductID == id) > 0;
        }
    }
}
