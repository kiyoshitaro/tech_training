using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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

        public EventController(ILogger<EventController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Event> Get()
        {
            // var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new Event
            {
                Id = index,
                Title = "IT maintainance",
                EventDate = "2021-03-29T09:30:00Z",
                EndDate = "2021-03-29T10:30:00Z",
            })
            .ToArray();
        }
    }
}
