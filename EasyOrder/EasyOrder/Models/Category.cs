namespace EasyOrder.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

        // per navigim
        public ICollection<Product> Products { get; set; }
    }
}
