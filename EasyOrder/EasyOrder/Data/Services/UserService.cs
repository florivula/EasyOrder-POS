using EasyOrder.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace EasyOrder.Data.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public List<User> GetAllUsers()
        {
            // Using AsNoTracking for better performance since we are only reading data.
            return _context.Users.AsNoTracking().ToList();
        }

        public User GetUserById(int id)
        {
            // Using AsNoTracking for performance since we do not need to track this object.
            return _context.Users.AsNoTracking().FirstOrDefault(u => u.Id == id);
        }

        public void AddUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public void UpdateUser(User user)
        {
            var existingUser = _context.Users.FirstOrDefault(u => u.Id == user.Id);
            if (existingUser != null)
            {
                // Update only the modified fields
                existingUser.Name = user.Name;
                existingUser.Email = user.Email;
                existingUser.Role = user.Role;

                _context.SaveChanges();
            }
            else
            {
                throw new Exception("User not found");
            }
        }

        public void DeleteUser(int id)
        {
            var user = _context.Users.Find(id); // Using Find since it is more efficient for primary key lookups.
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("User not found");
            }
        }
    }
}
