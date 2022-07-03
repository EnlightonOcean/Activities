using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;
        
        private readonly ILogger<ActivitiesController> _logger;

        public ActivitiesController(DataContext context,ILogger<ActivitiesController> logger)
        {
            _logger = logger;
            _context = context;
          
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Activity>>> GetActivities()
        {
            _logger.LogInformation("Inside GetActivities");
            return Ok(await _context.Activities.ToListAsync());
        }

        [HttpGet("{id}")] //Activities/id
        public async Task<ActionResult> GetActivity(Guid id)
        {
            var result = await _context.Activities.FindAsync(id);
            if(result == null) return NotFound();
            return Ok(result);
        }

        
    }
}