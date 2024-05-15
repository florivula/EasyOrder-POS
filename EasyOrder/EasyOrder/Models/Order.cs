namespace EasyOrder.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string Products { get; set; }
        public decimal Total { get; set; }
    }
}
