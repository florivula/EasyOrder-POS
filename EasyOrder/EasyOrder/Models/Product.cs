using System.Text.Json.Serialization;

namespace EasyOrder.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Images { get; set; }

        //foreign key
        public int CategoryId { get; set; }
        [JsonIgnore]
        public Category Category { get; set; }
       
    }
}
