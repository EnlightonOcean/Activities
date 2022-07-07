using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Application.MediatorActivity;
namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly ILogger<ActivitiesController> _logger;
        //private readonly IMediator _mediator;

        public ActivitiesController(ILogger<ActivitiesController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Activity>>> GetActivities()
        {
            _logger.LogInformation("Inside GetActivities"); 
            if(Mediator==null)
                return BadRequest( new { error="Mediator failed to initialize" });
            else
                return Ok(await Mediator.Send( new List.Query()));
            // return Ok(await _context.Activities.ToListAsync());
        }

        [HttpGet("{id}")] //Activities/id
        public async Task<ActionResult> GetActivity(Guid id)
        {
            // var result = await _context.Activities.FindAsync(id);
            // if(result == null) return NotFound();
            // return Ok(result);
            Activity activity;
            try
            {
                if(Mediator==null)
                    return BadRequest( new { error="Mediator failed to initialize" });
                else
                    activity = await Mediator.Send(new Details.Query(){ Id = id});
            }
            catch 
            {
                
                return NotFound();
            }
            return Ok(activity);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity _activity){
           
            if(Mediator==null)
                    return BadRequest( new { error="Mediator failed to initialize" });
            else
                try
                {
                    await Mediator.Send(new Create.Command(){Activity= _activity});
                    return Ok();
                }
                catch 
                {
                    return BadRequest("Failed to save activity");
                }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id,Activity activity){
            if(Mediator==null)
                    return BadRequest( new { error="Mediator failed to initialize" });
            else
                try
                {
                    activity.Id=id;
                    //await Mediator.Send( new Edit.Command(){Activity = new Activity(){ Id = id,Title = activity.Title}});
                    await Mediator.Send( new Edit.Command(){Activity = activity});
                    return Ok();
                }
                catch 
                {
                    return BadRequest("Failed to edit activity");
                }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id){
            if(Mediator==null)
                    return BadRequest( new { error="Mediator failed to initialize" });
            else
                try
                {
                    return Ok(await Mediator.Send( new Delete.Command(){Id=id}));
                }
                catch 
                {
                    return BadRequest("Failed to edit activity");
                }
        }
    }
}