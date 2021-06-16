using System.Collections.Generic;
using System.Linq;

namespace aspdotnetcore.Services
{
    public interface IFaqService
    {
        List<Faq> GetAll();
        Faq AddFaq(Faq faq);
        Faq UpdateFaq(int id, Faq faq);
        int DeleteFaq(int id);
    }
    public class FaqService: IFaqService
    {
        private List<Faq> _faqs = new List<Faq>(){
            new Faq
            {
                Id = 0,
                Question = "Lorem ipsum dolor sit amet",
                Answer = "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            },  
            new Faq
            {
                Id = 1,
                Question = "Lorem ipsum dolor sit amet",
                Answer = "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            },  
            new Faq
            {
                Id = 2,
                Question = "Lorem ipsum dolor sit amet",
                Answer = "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            },  
            new Faq
            {
                Id = 3,
                Question = "Lorem ipsum dolor sit amet",
                Answer = "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            },  
        };
        public List<Faq> GetAll()
        {
            return _faqs;
        }
        public Faq AddFaq(Faq faq)
        {
            faq.Id = _faqs[_faqs.Count-1].Id+ 1 ;
            _faqs.Add(faq);
            return faq;
        }

        public Faq UpdateFaq(int id, Faq faq)
        {
            for (var index = _faqs.Count - 1; index >= 0; index--)
            {
                if (_faqs[index].Id == id)
                {
                    _faqs[index] = faq;
                }
            }
            return faq;
        }

        public int DeleteFaq(int id)
        {
            for (var index = _faqs.Count - 1; index >= 0; index--)
            {
                if (_faqs[index].Id == id)
                {
                    _faqs.RemoveAt(index);
                }
            }
            return id;
        }
    }
}
