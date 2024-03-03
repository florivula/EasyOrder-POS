using EasyOrder.Data.Services;
using EasyOrder.Models;
using Microsoft.AspNetCore.Mvc;
using System;

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

        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _userServices.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult CreateUser(Users user)
        {
            _userServices.AddUser(user);
            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, Users user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            try
            {
                _userServices.UpdateUser(user);
            }
            catch (Exception)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _userServices.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }

            _userServices.DeleteUser(id);
            return NoContent();
        }
    }
}
