using EasyOrder.Data.Services;
using EasyOrder.Models;
using Microsoft.AspNetCore.Mvc;
using System;

namespace EasyOrder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController: ControllerBase
    {
        private readonly CategoryService _categoryServices;
        public CategoryController(CategoryService categoryServices)
        {
            _categoryServices = categoryServices;
        }

        [HttpGet("get_categories")]
        public IActionResult GetCategories()
        {
            var categories = _categoryServices.GetAllCategories();
            return Ok(categories);
        }

        [HttpGet("{id}")]
        public IActionResult GetCategoryById(int id)
        {
            var category = _categoryServices.GetCategoryById(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        [HttpPost]
        public IActionResult CreateCategory(Category category)
        {
            _categoryServices.AddCategory(category);
            return CreatedAtAction(nameof(GetCategoryById), new { id = category.Id }, category);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCategory(int id, Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            try
            {
                _categoryServices.UpdateCategory(category);
            }
            catch (Exception)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCategory(int id)
        {
            var category = _categoryServices.GetCategoryById(id);
            if (category == null)
            {
                return NotFound();
            }

            _categoryServices.DeleteCategory(id);
            return NoContent();
        }
    }
}
