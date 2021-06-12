using System.Collections.Generic;
using System.Linq;

namespace aspdotnetcore.Services
{
    public interface IFaqService
    {
        List<Faq> GetAll();
    }
    public class FaqService: IFaqService
    {
        public List<Faq> GetAll()
        {
            return new List<Faq>
            {
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
        }


            // return Enumerable.Range(1, 7).Select(index => new Faq
            // {
            //     Id = index,
            //     Question = "Lorem ipsum dolor sit amet",
            //     Answer = "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            // })
            // .ToArray();
    }
}
