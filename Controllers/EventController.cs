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
        // public EventController()
        // {
        //     TodoItems = todoItems;
        // }
        // public ITodoRepository TodoItems { get; set; }

        private readonly ILogger<EventController> _logger;
        private readonly IEventService _eventService;

        public EventController(ILogger<EventController> logger, IEventService eventService)
        {
            _logger = logger;
            _eventService = eventService;

        }

        [HttpGet]
        public IEnumerable<Event> Get()
        {
            // var rng = new Random();
            return _eventService.GetAll();
        }
    }
}
