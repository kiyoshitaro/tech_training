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
    public class QuicklinkController : ControllerBase
    {
        // public QuicklinkController()
        // {
        //     TodoItems = todoItems;
        // }
        // public ITodoRepository TodoItems { get; set; }

        private readonly ILogger<QuicklinkController> _logger;

        public QuicklinkController(ILogger<QuicklinkController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Quicklink> Get()
        {

        // { icon: Image.icon, link: "#", title: "Training" },
        // { icon: Image.icon_1, link: "#", title: "Organization" },
        // { icon: Image.icon_2, link: "#", title: "Task" },
        // { icon: Image.icon_3, link: "#", title: "Global Sales" },
        // { icon: Image.icon_4, link: "#", title: "Birthday" },
        // { icon: Image.icon_5, link: "#", title: "Health" },
        // { icon: Image.icon_6, link: "#", title: "Service Desk" },
        // { icon: Image.icon_7, link: "#", title: "Truck" },
        // { icon: Image.icon_8, link: "#", title: "Idea" },

            var list = new List<Quicklink>();
            list.Add(new Quicklink
            {
                Id = 1,
                Link = "#",
                Title = "Training",
                Icon = "Base/Images/icon.png",
            });

            list.Add(new Quicklink
            {
                Id = 2,
                Link = "#",
                Title = "Organization",
                Icon = "Base/Images/icon-1.png",
            });
            list.Add(new Quicklink
            {
                Id = 3,
                Link = "#",
                Title = "Task",
                Icon = "Base/Images/icon-2.png",
            });
            list.Add(new Quicklink
            {
                Id = 4,
                Link = "#",
                Title = "Global Sales",
                Icon = "Base/Images/icon-3.png",
            });
            list.Add(new Quicklink
            {
                Id = 5,
                Link = "#",
                Title = "Birthday",
                Icon = "Base/Images/icon-4.png",
            });
            list.Add(new Quicklink
            {
                Id = 6,
                Link = "#",
                Title = "Health",
                Icon = "Base/Images/icon-5.png",
            });
            list.Add(new Quicklink
            {
                Id = 7,
                Link = "#",
                Title = "Service Desk",
                Icon = "Base/Images/icon-6.png",
            });
            list.Add(new Quicklink
            {
                Id = 8,
                Link = "#",
                Title = "Truck",
                Icon = "Base/Images/icon-7.png",
            });

            list.Add(new Quicklink
            {
                Id = 9,
                Link = "#",
                Title = "Idea",
                Icon = "Base/Images/icon-8.png",
            });
            return list;
            // return Enumerable.Range(1, 7).Select(index => new Quicklink
            // {
            //     Id = index,
            //     Question = "Lorem ipsum dolor sit amet",
            //     Answer = "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            // })
            // .ToArray();
        }
    }
}
