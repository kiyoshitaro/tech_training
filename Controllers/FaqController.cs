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
    public class FaqController : ControllerBase
    {
        // public FaqController()
        // {
        //     TodoItems = todoItems;
        // }
        // public ITodoRepository TodoItems { get; set; }

        private readonly ILogger<FaqController> _logger;

        public FaqController(ILogger<FaqController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Faq> Get()
        {
            // var rng = new Random();
            return Enumerable.Range(1, 7).Select(index => new Faq
            {
                Id = index,
                Question = "Lorem ipsum dolor sit amet",
                Answer = "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            })
            .ToArray();
        }
    }
}
