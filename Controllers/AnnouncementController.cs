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

        [HttpGet("/api/announcement")]
        public ActionResult<Announcement> Get(int start=0, int limit=-1)
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

        [HttpPost("/api/announcement")]
        public ActionResult<Announcement> AddAnnouncement(Announcement announcement)
        {
            _announcementService.AddAnnouncement(announcement);
            _logger.LogInformation($"Add announcement");
            return announcement;
        }
        [HttpPut("/api/announcement/{id}")]
        public ActionResult<Announcement> UpdateAnnouncement(int id, Announcement announcement)
        {
            _announcementService.UpdateAnnouncement(id, announcement);

            _logger.LogInformation($"Update announcement with id {id}");
            return announcement;
        }

        [HttpDelete("/api/announcement/{id}")]
        public ActionResult<int> DeleteAnnouncement(int id)
        {
            _announcementService.DeleteAnnouncement(id);
            _logger.LogInformation($"Delete announcement with id {id}");
            return id;
        }
    }
}
