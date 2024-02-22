namespace EasyOrder.Models
{
    public class OrderItem
    {

        public int OrderItemId { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int Quantity { get; set; }

    }
}
