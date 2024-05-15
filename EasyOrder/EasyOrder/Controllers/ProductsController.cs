using EasyOrder.Data.Services;
using EasyOrder.Models;
using Microsoft.AspNetCore.Mvc;
using System;

namespace EasyOrder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productServices;
        public ProductController(ProductService productService)
        {
            _productServices = productService;
        }

        [HttpGet("get_products")]
        public IActionResult GetProducts()
        {
            var products = _productServices.GetAllProducts();
            return Ok(products);
        }

        [HttpGet("get_products_by_category/{categoryId}")]
        public IActionResult GetProductsByCategoryId(int categoryId)
        {
            var products = _productServices.GetProductsByCategoryId(categoryId);
            return Ok(products);
        }


        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _productServices.GetProductById(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPost]
        public IActionResult CreateProduct(Product product)
        {
            _productServices.AddProduct(product);
            return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            try
            {
                _productServices.UpdateProduct(product);
            }
            catch (Exception)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product = _productServices.GetProductById(id);
            if (product == null)
            {
                return NotFound();
            }

            _productServices.DeleteProduct(id);
            return NoContent();
        }
    }
}
