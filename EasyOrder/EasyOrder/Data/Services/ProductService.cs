using EasyOrder.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace EasyOrder.Data.Services
{
    public class ProductService
    {
        private readonly AppDbContext _context;
        public ProductService(AppDbContext context)
        {
            _context = context;
        }

        public List<Product> GetAllProducts()
        {
            var products = _context.Products.ToList();
            return products;
        }

        public List<Product> GetProductsByCategoryId(int categoryId)
        {
            var products = _context.Products.Where(p => p.CategoryId == categoryId).ToList();
            return products;
        }


        public Product GetProductById(int id)
        {
            return _context.Products.FirstOrDefault(u => u.Id == id);
        }

        public void AddProduct(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
        }

        public void UpdateProduct(Product product)
        {
            var existingProduct = _context.Products.FirstOrDefault(u => u.Id == product.Id);
            if (existingProduct != null)
            {
                existingProduct.Name = product.Name;
                existingProduct.Price = product.Price;
                existingProduct.CategoryId = product.CategoryId;
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Product not found");
            }
        }

        public void DeleteProduct(int id)
        {
            var product = _context.Products.FirstOrDefault(u => u.Id == id);
            if (product != null)
            {
                _context.Products.Remove(product);
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Product not found");
            }
        }
    }
}