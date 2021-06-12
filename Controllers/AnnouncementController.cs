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
        public IEnumerable<Announcement> Get()
        {
            return _announcementService.GetAll();
        }
    }
}
