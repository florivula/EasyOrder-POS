using EasyOrder.DTOs;
using EasyOrder.Models;

namespace EasyOrder.Repository.Interfaces
{
    public interface IProductRepository
    {

        Task<List<Product>> GetAllAsync();
          Task<Product>  GetByIdAsync(int id);

        Task CreateProductAsync(ProductDto productDto);

        Task UpdateProductAsync(ProductDto productDto,int id);

        Task DeleteProductAsync(int id);
        
    }
}
