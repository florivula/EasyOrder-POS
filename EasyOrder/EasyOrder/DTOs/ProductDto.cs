namespace EasyOrder.DTOs
{
    public class ProductDto
    {
        public string ProductName { get; set; }
        public string Images { get; set; }

        //foreign key
        public int CategoryId { get; set; }
    }
}
