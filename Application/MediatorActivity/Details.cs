using Domain;
using MediatR;
using Persistence;

namespace Application.MediatorActivity
{
    public class Details
    {
        public class Query : IRequest<Activity>{
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var r = await _context.Activities.FindAsync(request.Id);
                if(r==null) throw new ArgumentException("Invalid Id");
                return r;
            }
        }
    }
}