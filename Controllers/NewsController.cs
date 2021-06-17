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
        [HttpGet("/api/news")]
        public ActionResult<News> GetNewss(int start=0, int limit=-1)
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

        [HttpPost("/api/news")]
        public ActionResult<News> AddNews(News news)
        {
            try
            {
                _newsService.AddNews(news);
                _logger.LogInformation($"Add news");
            }
            catch (Exception ex)
            {
                _logger.LogInformation($"Exception {ex.Message} when adding news");
            }

            return news;
        }

        [HttpPut("/api/news/{id}")]
        public ActionResult<News> UpdateNews(int id, News news)
        {
            try
            {
            _newsService.UpdateNews(id, news);
            _logger.LogInformation($"Update news with id {id}");
            }
            catch (Exception ex)
            {
                _logger.LogInformation($"Exception {ex.Message} when editing news");
            }

            return news;
        }

        [HttpDelete("/api/news/{id}")]
        public ActionResult<int> DeleteNews(int id)
        {
            try
            {
                _newsService.DeleteNews(id);
                _logger.LogInformation($"Delete news with id {id}");
            }
            catch (Exception ex)
            {
                _logger.LogInformation($"Exception {ex.Message} when deleting news");
            }

            return id;
        }

    }
}
