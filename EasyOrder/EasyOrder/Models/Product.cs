using System.ComponentModel.DataAnnotations.Schema;

namespace EasyOrder.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }

        // foreign keyy
        public int CategoryId { get; set; }

        // per navigim edhe kjo
        public Category ProductCategory { get; set; }
    }
}
