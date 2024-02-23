using EasyOrder.Models;

namespace EasyOrder.Repository.Interfaces
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllAsync();
        Task<Category> GetByIdAsync(int id);
       Task CreateAsync (string name);
        Task UpdateAsync (int id, string name);
        Task DeleteAsync (int id);
    }
}
