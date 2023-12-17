using EasyOrder.Data.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EasyOrder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userServices;
        public UsersController(UserService userService)
        {
            _userServices = userService;
        }

        [HttpGet("get_users")]
        public IActionResult GetUsers()
        {
            var users = _userServices.GetAllUsers();
            return Ok(users);
        }
    }
}
