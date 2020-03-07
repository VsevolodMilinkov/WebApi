namespace WebApi.Models
{
    public class ProductDto
    {
        public int? ProductID;
        public string ProductName;
        public string QuantityPerUnit;
        public decimal? UnitPrice;
        public short? UnitsInStock;
        public short? UnitsOnOrder;
        public short? ReorderLevel;
        public bool Discontinued;
    }
}