namespace EasyOrder.Models
{
    public class Users
    {
        public int Id { get; set; }
        //public int userName  { get; set; }
        public required string Name  { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }

        public required string Role { get; set; }



    }
}
