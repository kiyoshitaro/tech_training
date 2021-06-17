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
    public class FaqController : ControllerBase
    {
        private readonly ILogger<FaqController> _logger;
        private readonly IFaqService _faqService;


        public FaqController(ILogger<FaqController> logger, IFaqService faqService)
        {
            _logger = logger;
            _faqService = faqService;
        }

        [HttpGet("/api/faq")]
        public ActionResult<Faq> GetFaqs(int start=0, int limit=-1)
        {
            var collection = new Dictionary<string, object>();
            List<Faq> faqs = _faqService.GetPage(start,limit);
            collection.Add("data", faqs);
            collection.Add("pageNum", _faqService.GetPageNum(limit));

            if (faqs == null)
            {
                return NotFound();
            }
            return Ok(collection);

        }

        // public List<Faq> Get()
        // {
        //     return _faqService.GetAll();
        // }
        [HttpPost("/api/faq")]

        public ActionResult<Faq> AddFaq(Faq faq)
        {
            _faqService.AddFaq(faq);
            _logger.LogInformation($"Add faq");
            return faq;
        }

        [HttpPut("/api/faq/{id}")]
        public ActionResult<Faq> UpdateFaq(int id, Faq faq)
        {
            _faqService.UpdateFaq(id, faq);

            _logger.LogInformation($"Update faq with id {id}");
            return faq;
        }

        [HttpDelete("/api/faq/{id}")]
        public ActionResult<int> DeleteFaq(int id)
        {
            _faqService.DeleteFaq(id);
            _logger.LogInformation($"Delete faq with id {id}");
            return id;
        }
    }
}
