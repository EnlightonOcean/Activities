using Domain;
using Persistence.Interface;
using Persistence.Repository;

namespace Persistence;
public class UnitOfWork : IUnitOfWork
{
    private readonly DataContext _context;

    public UnitOfWork(DataContext context)
    {
            _context = context;
    }
    public IRepository<Activity> ActivityRepository => new ActivityRepository(_context);

    public async Task<bool> Complete()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public bool HasChnages()
    {
        return _context.ChangeTracker.HasChanges();
    }
}
