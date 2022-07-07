using Domain;
using MediatR;
using Persistence;
using Persistence.Interface;

namespace Application.MediatorActivity;
public class Delete
{
    public class Command : IRequest
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
        private readonly IUnitOfWork _unitOfWork;
        
        public Handler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            
        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _unitOfWork.ActivityRepository.GetEntityByIdAsync(request.Id);
            if(activity == null) throw new ArgumentException("Activity not found");
            //_unitOfWork.ActivityRepository.Update(activity);
            _unitOfWork.ActivityRepository.Remove(activity);
            
            if(await _unitOfWork.Complete())
                return Unit.Value;
            else
                throw new ArgumentException("Activity failed to delete");
           
        }
    }
}
