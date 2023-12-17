using EasyOrder.Models;

namespace EasyOrder.Data.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;
        public UserService(AppDbContext context) { 
            _context = context;
        }

        public List<Users> GetAllUsers()
        {
            var users = _context.Users.ToList();
            return users;
        }
    }
}
