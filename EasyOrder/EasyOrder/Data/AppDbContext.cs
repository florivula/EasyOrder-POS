using EasyOrder.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace EasyOrder.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options) { }

        public DbSet<Users> Users { get; set; }
    }
}
