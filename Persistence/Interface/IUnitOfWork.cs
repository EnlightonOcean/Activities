using Domain;

namespace Persistence.Interface;
public interface IUnitOfWork
{
    public IRepository<Activity> ActivityRepository { get;}    
    Task<bool> Complete();
    bool HasChnages();
}
