using System.Collections.Generic;
using System.Linq;

namespace aspdotnetcore.Services
{
    public interface IEventService
    {
        // List<Event> GetAll();
        Event AddEvent(Event evt);
        Event UpdateEvent(int id, Event evt);
        int DeleteEvent(int id);
        int GetPageNum(int limit);
        List<Event> GetPage(int start,int limit);

    }
    public class EventService: IEventService
    {
        private List<Event> _evts = new List<Event>(){
            new Event
            {
                Id = 0,
                Title = "Training",
                EventDate = "2021-03-29T09:00:00Z",
                EndDate = "2021-03-29T09:30:00Z",
            },
            new Event
            {
                Id = 1,
                Title = "IT maintainance",
                EventDate = "2021-03-29T09:30:00Z",
                EndDate = "2021-03-29T10:30:00Z",
            },
            new Event
            {
                Id = 2,
                Title = "Meeting",
                EventDate = "2021-03-29T09:30:00Z",
                EndDate = "2021-03-29T10:30:00Z",
            },
            new Event
            {
                Id = 3,
                Title = "Testing",
                EventDate = "2021-03-29T09:30:00Z",
                EndDate = "2021-03-29T10:30:00Z",
            },
            new Event
            {
                Id = 4,
                Title = "IT maintainance",
                EventDate = "2021-03-29T09:30:00Z",
                EndDate = "2021-03-29T10:30:00Z",
            },
            new Event
            {
                Id = 5,
                Title = "IT maintainance",
                EventDate = "2021-03-29T09:30:00Z",
                EndDate = "2021-03-29T10:30:00Z",
            },
            new Event
            {
                Id = 6,
                Title = "Report",
                EventDate = "2021-03-30T10:00:00Z",
                EndDate = "2021-03-30T10:30:00Z",
            }

        };
        
        public int GetPageNum(int limit)
        {
            if(limit == -1){
                return 1;
            }
            else{
                return (int)(_evts.Count / limit + 1);
            }
        }
        public List<Event> GetPage(int start,int limit)
        {
            if(limit == -1 ){
                return _evts;
            }
            else{
                IEnumerable<Event> filteringQuery =
                    from evt in _evts
                    where evt.Id < (start+1)* limit  && evt.Id >= start* limit 
                    select evt;
                return filteringQuery.ToList();
            }
        }

        // public List<Event> GetAll()
        // {
        //     return _evts;
        // }
        public Event AddEvent(Event evt)
        {
            evt.Id = _evts[_evts.Count-1].Id+ 1 ;
            _evts.Add(evt);
            return evt;
        }

        public Event UpdateEvent(int id, Event evt)
        {
            for (var index = _evts.Count - 1; index >= 0; index--)
            {
                if (_evts[index].Id == id)
                {
                    _evts[index] = evt;
                }
            }
            return evt;
        }

        public int DeleteEvent(int id)
        {
            for (var index = _evts.Count - 1; index >= 0; index--)
            {
                if (_evts[index].Id == id)
                {
                    _evts.RemoveAt(index);
                }
            }
            return id;
        }
    }
}
