using System.ComponentModel.DataAnnotations.Schema;

namespace EasyOrder.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }

        // foreign key per category
        public int CategoryId { get; set; }
        public Category? Category { get; set; }

        public List<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();
    }

}
