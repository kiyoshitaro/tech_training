using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using aspdotnetcore.Services;
using System.Text.Json;

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

        public ActionResult<News> Get(int start=0, int limit=3)
        {
            var collection = new Dictionary<string, object>();
            List<News> newss = _newsService.GetPage(start,limit);
            collection.Add("data", newss);
            collection.Add("pageNum", _newsService.GetPageNum(limit));

            if (newss == null)
            {
                return NotFound();
            }
            return Ok(collection);
        }

        // public ActionResult<News> Get(int start=0, int limit=3)
        // {
        //     var collection = new Dictionary<string, object>();
        //     collection.Add("data", _newsService.GetPage(start,limit));
        //     collection.Add("pageNum", _newsService.GetPageNum(limit));

        //     // return _newsService.GetPage(start,limit);
        //     return new Ok(Json(collection));
        // }
    }
}
