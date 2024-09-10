namespace EasyOrder.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; } // Admin, Waiter

        // one-to-many relationship me order (vetem per waiters)
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }

}
