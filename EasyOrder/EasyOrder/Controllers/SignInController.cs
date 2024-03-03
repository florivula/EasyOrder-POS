using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using EasyOrder.Data;
using Microsoft.EntityFrameworkCore;

namespace EasyOrder.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SigninController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public SigninController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> Signin([FromBody] SignInRequest request)
        {
            try
            {
                // Find the user in the database by email
                var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

                // Check if the user exists and the password is correct
                if (user != null && VerifyPassword(request.Password, user.Password))
                {
                    // User authenticated successfully
                    return Ok(new { Message = "User authenticated successfully.", Role = user.Role });
                }

                // Authentication failed
                return Unauthorized("Invalid email or password.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        private bool VerifyPassword(string password, string hashedPassword)
        {
            // Implement your password verification logic here, such as comparing hashes
            // For simplicity, this example assumes direct comparison
            return password == hashedPassword;
        }

        public class SignInRequest
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }
    }
}
