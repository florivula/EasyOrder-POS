using EasyOrder.Models;
using Microsoft.EntityFrameworkCore;

namespace EasyOrder.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options) { }


        public DbSet<Users> Users { get; set; }
    }
}
