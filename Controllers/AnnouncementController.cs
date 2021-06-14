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
    public class AnnouncementController : ControllerBase
    {
        private readonly IAnnouncementService _announcementService;
        private readonly ILogger<AnnouncementController> _logger;

        public AnnouncementController(ILogger<AnnouncementController> logger, IAnnouncementService announcementService)
        {
            _logger = logger;
            _announcementService = announcementService;

        }

        [HttpGet]
        public ActionResult<Announcement> Get(int start=0, int limit=3)
        {
            var collection = new Dictionary<string, object>();
            List<Announcement> announcements = _announcementService.GetPage(start,limit);
            collection.Add("data", announcements);
            collection.Add("pageNum", _announcementService.GetPageNum(limit));

            if (announcements == null)
            {
                return NotFound();
            }
            return Ok(collection);

        }
    }
}
