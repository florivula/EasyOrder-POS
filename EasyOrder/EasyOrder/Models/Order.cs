namespace EasyOrder.Models
{
    public class Order
    {
        public int Id { get; set; }

        // many-to-many relationship with product
        public List<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();

        public decimal Total { get; set; }
        public DateTime DateCreated { get; set; }

        // foreign key per waiter
        public int WaiterId { get; set; }
        public User? Waiter { get; set; }
    }

}
