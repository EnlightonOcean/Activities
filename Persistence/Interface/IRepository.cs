namespace Persistence.Interface;
public interface IRepository<T>
{
    void Update(T entity);
    void Remove(T entity);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<T>> GetEntitiesAsync();
    Task<T?> GetEntityByIdAsync(Guid id);
}

