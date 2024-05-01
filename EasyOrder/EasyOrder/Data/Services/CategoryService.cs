using EasyOrder.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace EasyOrder.Data.Services
{
    public class CategoryService
    {
        private readonly AppDbContext _context;
        public CategoryService(AppDbContext context)
        {
            _context = context;
        }

        public List<Category> GetAllCategories()
        {
            var categories = _context.Categories.ToList();
            return categories;
        }

        public Category GetCategoryById(int id)
        {
            return _context.Categories.FirstOrDefault(u => u.Id == id);
        }

        public void AddCategory(Category category)
        {
            _context.Categories.Add(category);
            _context.SaveChanges();
        }

        public void UpdateCategory(Category category)
        {
            var existingCategory = _context.Categories.FirstOrDefault(u => u.Id == category.Id);
            if (existingCategory != null)
            {
                existingCategory.Name = category.Name;
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Category not found");
            }
        }

        public void DeleteCategory(int id)
        {
            var category = _context.Categories.FirstOrDefault(u => u.Id == id);
            if (category != null)
            {
                _context.Categories.Remove(category);
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Category not found");
            }
        }
    }
}