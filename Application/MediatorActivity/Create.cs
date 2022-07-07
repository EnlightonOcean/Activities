using Domain;
using MediatR;
using Persistence;

namespace Application.MediatorActivity;
public class Create
{
    public class Command : IRequest
    {
        public Activity? Activity { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
        private readonly DataContext _context;
        public Handler(DataContext context)
        {
            _context = context;
            
        }
        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            if(request.Activity == null) throw new ArgumentException("Activity cannot be null");
            await _context.Activities.AddAsync(request.Activity);
            if(await _context.SaveChangesAsync()>0 )
                return Unit.Value;
            else
                throw new ArgumentException("Failed to save activity");
        }
    }
}
