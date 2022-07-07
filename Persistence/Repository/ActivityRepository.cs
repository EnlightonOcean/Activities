using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence.Interface;

namespace Persistence.Repository;
public class ActivityRepository : IRepository<Activity>
{
    private readonly DataContext _context;

    public ActivityRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Activity>> GetEntitiesAsync()
    {
        return await _context.Activities.ToListAsync();
    }

    public async Task<Activity?> GetEntityByIdAsync(Guid id)
    {
        return await _context.Activities.FindAsync(id);
        //  var activity = await _context.Activities.FindAsync(id);
        //  if(activity == null) throw new ArgumentException("Activity not found");
        //  return activity;
    }

    public async Task<bool> SaveAllAsync()
    {
        return (await _context.SaveChangesAsync()>0);
    }

    public void Update(Activity entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
    }

    public void Remove(Activity entity)
    {
        _context.Entry(entity).State = EntityState.Deleted;
        //_context.Remove(entity);
    }
}
