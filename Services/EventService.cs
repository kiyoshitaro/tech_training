using System.Collections.Generic;
using System.Linq;
using aspdotnetcore.Data;
using aspdotnetcore.Models;
using System;
namespace aspdotnetcore.Services
{
    public interface IEventService
    {
        // List<Event> GetAll();
        void AddEvent(Event evt);
        void UpdateEvent(int id, Event evt);
        void DeleteEvent(int id);
        int GetPageNum(int limit);
        List<Event> GetPage(int start,int limit);

    }
    public class EventService: IEventService
    {
        private readonly ProjectContext _db;
        public EventService(ProjectContext db)
        {
            _db = db;
        }

        //Id = 0,
        //Title = "Training",
        //EventDate = "2021-03-29T09:00:00Z",
        //EndDate = "2021-03-29T09:30:00Z",
        public int GetPageNum(int limit)
        {
            if (limit == -1)
            {
                return 1;
            }
            else
            {
                return (int)(_db.Event.Count() / limit + 1);
            }
        }
        public List<Event> GetPage(int start, int limit)
        {
            if (limit == -1)
            {
                return _db.Event.ToList();
            }
            else
            {
                List<Event> filteringQuery = _db.Event.Where(r => r.Id < (start + 1) * limit && r.Id >= start * limit).ToList();
                return filteringQuery;
            }
        }
        public void AddEvent(Event evt)
        {

            if (evt.Id > 0)
            {
                UpdateEvent(evt.Id, evt);
            }
            else
            {
                _db.Event.Add(evt);
                _db.SaveChanges();
            }
        }
        public void UpdateEvent(int id, Event evt)
        {
            try
            {

                Event _evt = _db.Event.Where(r => r.Id.Equals(id)).FirstOrDefault();
                if (_evt != null)
                {
                    _evt.EndDate = evt.EndDate;
                    _evt.EventDate = evt.EventDate;
                    _evt.Title = evt.Title;
                    _db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
            }


        }

        public void DeleteEvent(int id)
        {
            Event _evt = _db.Event.Where(r => r.Id.Equals(id)).FirstOrDefault();
            if (_evt != null)
            {
                _db.Event.Remove(_evt);
                _db.SaveChanges();
            }
        }
    }
}
