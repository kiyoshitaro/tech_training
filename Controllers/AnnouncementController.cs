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
    public class AnnouncementController : ControllerBase
    {
        // public AnnouncementController()
        // {
        //     TodoItems = todoItems;
        // }
        // public ITodoRepository TodoItems { get; set; }

        private readonly ILogger<AnnouncementController> _logger;

        public AnnouncementController(ILogger<AnnouncementController> logger)
        {
            _logger = logger;
        }

// posts: [
//         {
//           title: "IT maintainance",
//           content:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//           time: "05/jan/2021",
//           tags: [],
//           img: Image.image_gallery,
//         },
//         {
//           title: "IT maintainance",
//           content:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//           time: "05/jan/2021",
//           tags: [],
//           img: Image.image_gallery_1,
//         },
//         {
//           title: "IT maintainance",
//           content:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//           time: "05/jan/2021",
//           tags: [],
//           img: Image.image_gallery_2,
//         },
//         {
//           title: "IT maintainance",
//           content:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//           time: "05/jan/2021",
//           tags: [],
//           img: Image.image_gallery_3,
//         },
//       ],
        [HttpGet]
        public IEnumerable<Announcement> Get()
        {
            // var rng = new Random();

            var announcements = new List<Announcement>();
            announcements.Add(new Announcement
            {
                Id = 1,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "Base/Images/icon.png",
                Time = "05/jan/2021"
            });
            announcements.Add(new Announcement
            {
                Id = 2,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "Base/Images/icon.png",
                Time = "05/jan/2021"
            });
           
            announcements.Add(new Announcement
            {
                Id = 3,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "Base/Images/icon.png",
                Time = "05/jan/2021"
            });
           
            announcements.Add(new Announcement
            {
                Id = 4,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "Base/Images/icon.png",
                Time = "05/jan/2021"
            });
           
           

        return announcements;

        }
    }
}
