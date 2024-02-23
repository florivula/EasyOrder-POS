using EasyOrder.Data;
using EasyOrder.DTOs;
using EasyOrder.Models;
using EasyOrder.Repository.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace EasyOrder.Repository.Implementations
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext dbContext;

        public ProductRepository(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async  Task CreateProductAsync(ProductDto productDto)
        {
            if (productDto == null)
                throw new ArgumentNullException(nameof(productDto));
            var product = new Product
            {
                ProductName= productDto.ProductName,
                Images = productDto.Images,
                CategoryId = productDto.CategoryId,
            };

            await dbContext.Products.AddAsync(product);
            await dbContext.SaveChangesAsync();

        }

        public async Task DeleteProductAsync(int id)
        {
            var product = await  dbContext.Products.FirstOrDefaultAsync(x => x.ProductId == id);
            if(product == null)
            {
                throw new Exception(" product is null!!");
            }

                  dbContext.Products.Remove(product);
                  dbContext.SaveChanges();


        }

        public async Task<List<Product>> GetAllAsync()
        {
            return await dbContext.Products.ToListAsync();
        }

        public async  Task<Product> GetByIdAsync(int id)
        {
            var product = await dbContext.Products.FirstOrDefaultAsync(x => x.ProductId == id );

            if(product != null)
            {
                return product;
            }
            else
            {
                throw new Exception("Product does not exits");
            }
        }

        public async Task UpdateProductAsync(ProductDto productDto, int id)
        {
            var product = await dbContext.Products.FirstOrDefaultAsync(x=> x.ProductId == id);

            if (product == null)
                throw new Exception("Category does not exist");

            product.ProductName = productDto.ProductName;
            product.Images = productDto.Images;

            dbContext.Products.Update(product);

            dbContext.SaveChanges();

        }
    }
}
