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

        [HttpGet]
        public List<Faq> Get()
        {
            // var rng = new Random();
            return _faqService.GetAll();


        }
    }
}
