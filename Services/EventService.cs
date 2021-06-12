using System.Collections.Generic;
using System.Linq;

namespace aspdotnetcore.Services
{
    public interface IEventService
    {
        List<Event> GetAll();
    }
    public class EventService: IEventService
    {
        public List<Event> GetAll()
        {
            return Enumerable.Range(1, 5).Select(index => new Event
            {
                Id = index,
                Title = "IT maintainance",
                EventDate = "2021-03-29T09:30:00Z",
                EndDate = "2021-03-29T10:30:00Z",
            })
            .ToList();
        }
    }
}
