namespace EasyOrder.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

        // one-to-many relationship me product
        public ICollection<Product>? Products { get; set; }
    }

}
