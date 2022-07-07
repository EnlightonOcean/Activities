using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Interface;
using Persistence.Repository;

namespace Application.MediatorActivity;
public class List
{
    public class Query : IRequest<IEnumerable<Activity>>{}
    public class Handler : IRequestHandler<Query, IEnumerable<Activity>>
    {
        //using Unit of Work
        //private readonly DataContext _context;
        
        // private readonly IRepository<Activity> _repository;
        // public Handler(DataContext context, IRepository<Activity> repository)
        // {
            
        //     _context = context;
        //     _repository = repository;
        // }
        // public async Task<IEnumerable<Activity>> Handle(Query request, CancellationToken cancellationToken)
        // {
        //     //return await _context.Activities.ToListAsync();
        //     return await _repository.GetEntitiesAsync();
        // }
        private readonly IUnitOfWork _unitOfWork;
        
        public Handler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

        }
        public async Task<IEnumerable<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await _unitOfWork.ActivityRepository.GetEntitiesAsync();
        }
    }

}
