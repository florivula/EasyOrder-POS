using EasyOrder.Data;
using EasyOrder.DTOs;
using EasyOrder.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;

namespace EasyOrder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        private readonly AppDbContext dbContext;
        private readonly IProductRepository productRepository;

        public ProductController(AppDbContext dbContext, IProductRepository productRepository)
        {
            this.dbContext = dbContext;
            this.productRepository = productRepository;
        }

        //GetAll Products
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categoryDomain = await productRepository.GetAllAsync();
            return Ok(categoryDomain);
        }

        //GetById
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var category = await productRepository.GetByIdAsync(id);
               if(category == null)
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






        //Create Products
        [HttpPost]
        public async Task<IActionResult> CreateProduct( ProductDto productDto)
        {


            try
            {
                await productRepository.CreateProductAsync(productDto);
                return Ok("Created Successfuly");
            }
            catch 
            {
                return BadRequest("Wrong Created!!");
            }

        }

        //Update Product
        [HttpPut("update/{id}")]

        public async Task<IActionResult> UpdateProduct([FromBody] ProductDto productDto, int id)
        {
            try
            {
                await productRepository.UpdateProductAsync(productDto,id);
                return Ok("Updated Successfuly");
            }
            catch
            {
                return BadRequest("Wrong!!");
            }

        }


        //Delete Product
        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
                await productRepository.DeleteProductAsync(id);
                return Ok("Deleted Succesfuly");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
       
    }
}
