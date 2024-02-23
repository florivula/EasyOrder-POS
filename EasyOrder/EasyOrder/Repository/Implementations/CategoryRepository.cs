using EasyOrder.Data;
using EasyOrder.Models;
using EasyOrder.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EasyOrder.Repository.Implementations
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppDbContext dbContext;

        public CategoryRepository(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        
        //Create
        public async Task CreateAsync(string name)
        {
            if(string.IsNullOrEmpty(name)) 
                throw new ArgumentNullException(nameof(name));
            var _category = new Category
            {
                CategoryName = name
            };

            dbContext.Categories.Add(_category);
            await dbContext.SaveChangesAsync();
        }

        //Delete
        public async Task DeleteAsync(int id)
        {
            var category = await dbContext.Categories.FirstOrDefaultAsync(x => x.CategoryId == id);
            if (category == null)
            {
                throw new Exception("Category does not exist");
            }
             dbContext.Categories.Remove(category);
            await dbContext.SaveChangesAsync();
        }

        //GetALL
        public async Task<List<Category>> GetAllAsync()
        {
            var categories =  await dbContext.Categories.ToListAsync();
            foreach(var category in categories)
            {
                var products = await dbContext.Products.Where(c=>c.CategoryId == category.CategoryId).ToListAsync();
                category.Products = products;
            }
            return categories;
        }


        //GetById
        public async  Task<Category> GetByIdAsync(int id)
        {
            var category=  await dbContext.Categories.FirstOrDefaultAsync(x => x.CategoryId== id);
            if (category != null)
            {
                var products = await dbContext.Products.Where(c => c.CategoryId == category.CategoryId).ToListAsync();
                return category;
            }
            else
                throw new Exception("Category does not exist");
        }

        //Update
        public async Task UpdateAsync(int id,string name)
        {
            var category = await dbContext.Categories.FirstOrDefaultAsync(x => x.CategoryId == id);
            if (category == null)
                throw new Exception("Category does not exist");

            category.CategoryName = name;
            dbContext.Categories.Update(category);
            await dbContext.SaveChangesAsync();
        }

       
    }
}
