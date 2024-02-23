using EasyOrder.Data;
using EasyOrder.DTOs;
using EasyOrder.Models;
using EasyOrder.Repository.Implementations;
using EasyOrder.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EasyOrder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly AppDbContext dbContext;
        private readonly ICategoryRepository categoryRepository;

        public CategoryController(AppDbContext dbContext, ICategoryRepository categoryRepository)
        {
            this.dbContext = dbContext;
            this.categoryRepository = categoryRepository;
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var categoryDomain = await categoryRepository.GetAllAsync();
            return Ok(categoryDomain);
        }

        [HttpGet]
        [Route("GetBy{id}")]
        public async Task<IActionResult> GetById( int id)
        {
            try
            {
                var category = await categoryRepository.GetByIdAsync(id); 
                if (category == null)
                {
                    return NotFound();
                }
                return Ok(category);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



        [HttpPost]
        public async Task<IActionResult> PostCategory(string name)
        {
            try
            {
                await categoryRepository.CreateAsync(name);
                return Ok ("Created succesfully");
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            try
            {
                await categoryRepository.DeleteAsync(id);
                return Ok("Deleted succesfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update (int id,string name)
        {

            try
            {
                await categoryRepository.UpdateAsync(id,name);
                return Ok("Updated succesfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }



}
