using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using aspdotnetcore.Services;
using aspdotnetcore.Models;

namespace aspdotnetcore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuicklinkController : ControllerBase
    {

        private readonly ILogger<QuicklinkController> _logger;
        private readonly IQuicklinkService _quicklinkService;

        public QuicklinkController(ILogger<QuicklinkController> logger,IQuicklinkService quicklinkService)
        {
            _logger = logger;
            _quicklinkService = quicklinkService;

        }

        [HttpGet]
        public IEnumerable<Quicklink> GetQuicklinks()
        {
            return _quicklinkService.GetAll();
        }
    }
}
