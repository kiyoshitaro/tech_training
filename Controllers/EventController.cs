using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using aspdotnetcore.Services;

namespace aspdotnetcore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventController : ControllerBase
    {

        private readonly ILogger<EventController> _logger;
        private readonly IEventService _eventService;

        public EventController(ILogger<EventController> logger, IEventService eventService)
        {
            _logger = logger;
            _eventService = eventService;

        }

        [HttpGet("/api/event")]
        public ActionResult<Event> GetEvents(int start=0, int limit=-1)
        {
            var collection = new Dictionary<string, object>();
            List<Event> events = _eventService.GetPage(start,limit);
            collection.Add("data", events);
            collection.Add("pageNum", _eventService.GetPageNum(limit));

            if (events == null)
            {
                return NotFound();
            }
            return Ok(collection);
        }


        [HttpPost("/api/event")]
        public ActionResult<Event> AddEvent(Event evt)
        {
            _eventService.AddEvent(evt);
            _logger.LogInformation($"Add faq");
            return evt;
        }


        [HttpPut("/api/event/{id}")]
        public ActionResult<Event> UpdateEvent(int id, Event evt)
        {
            _eventService.UpdateEvent(id, evt);

            _logger.LogInformation($"Update event with id {id}");
            return evt;
        }

        [HttpDelete("/api/event/{id}")]
        public ActionResult<int> DeleteEvent(int id)
        {
            _eventService.DeleteEvent(id);
            _logger.LogInformation($"Delete event with id {id}");
            return id;
        }
    }
}
