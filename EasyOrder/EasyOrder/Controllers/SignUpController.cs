using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using EasyOrder.Models;
using EasyOrder.Data;
using Microsoft.EntityFrameworkCore;

namespace EasyOrder.Controllers // Update with your actual namespace
{
    [ApiController]
    [Route("api/[controller]")]
    public class SignupController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public SignupController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> Signup(Users model)
        {
            // Check if the user already exists
            var existingUser = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
            if (existingUser != null)
            {
                return Conflict("User already exists.");
            }

            // Add the new user to the database
            dbContext.Users.Add(model);
            await dbContext.SaveChangesAsync();

            return Ok("User signed up successfully.");
        }
    }
}