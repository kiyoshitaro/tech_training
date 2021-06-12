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
    public class NewsController : ControllerBase
    {

        private readonly ILogger<NewsController> _logger;
        private readonly INewsService _newsService;

        public NewsController(ILogger<NewsController> logger,INewsService newsService)
        {
            _logger = logger;
            _newsService = newsService;

        }
        [HttpGet]
        public IEnumerable<News> Get()
        {
            return _newsService.GetAll();
        }
    }
}
