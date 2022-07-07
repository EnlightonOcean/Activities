using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using Persistence.Interface;

namespace Application.MediatorActivity;
public class Edit
{
    public class Command : IRequest
    {
        public Activity? Activity { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
        //using Unit of Work
        // private readonly DataContext _context;
        // public Handler(DataContext context)
        // {
        //     _context = context;
            
        // }
        // public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        // {
        //     if(request.Activity == null ) throw new ArgumentException("Activity cannot be null");
            
        //     var activity = await _context.Activities.FindAsync(request.Activity.Id);
        //     if(activity == null) throw new ArgumentException("Activity not found");
        //     activity.Title = request.Activity.Title ?? activity.Title;

        //     _context.Activities.Update(activity);
        //     if(await _context.SaveChangesAsync()>0)
        //         return Unit.Value;
        //     else
        //         throw new ArgumentException("Activity failed to update");
            
        // }

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        
        public Handler(IUnitOfWork unitOfWork,IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            if(request.Activity == null ) throw new ArgumentException("Activity cannot be null");
            
            var activity = await _unitOfWork.ActivityRepository.GetEntityByIdAsync(request.Activity.Id);
            if(activity == null) throw new ArgumentException("Activity not found");
            //activity.Title = request.Activity.Title ?? activity.Title;
            _mapper.Map(request.Activity,activity);

            _unitOfWork.ActivityRepository.Update(activity);
            if(await _unitOfWork.Complete())
                return Unit.Value;
            else
                throw new ArgumentException("Activity failed to update");
            
        }
    }
}
