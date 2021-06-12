using System.Collections.Generic;
using System.Linq;

namespace aspdotnetcore.Services
{
    public interface IQuicklinkService
    {
        List<Quicklink> GetAll();
    }
    public class QuicklinkService: IQuicklinkService
    {
        public List<Quicklink> GetAll()
        {
            var list = new List<Quicklink>();
            list.Add(new Quicklink
            {
                Id = 1,
                Link = "#",
                Title = "Training",
                Icon = "./Images/icon.png",
            });

            list.Add(new Quicklink
            {
                Id = 2,
                Link = "#",
                Title = "Organization",
                Icon = "./Images/icon-1.png",
            });
            list.Add(new Quicklink
            {
                Id = 3,
                Link = "#",
                Title = "Task",
                Icon = "./Images/icon-2.png",
            });
            list.Add(new Quicklink
            {
                Id = 4,
                Link = "#",
                Title = "Global Sales",
                Icon = "./Images/icon-3.png",
            });
            list.Add(new Quicklink
            {
                Id = 5,
                Link = "#",
                Title = "Birthday",
                Icon = "./Images/icon-4.png",
            });
            list.Add(new Quicklink
            {
                Id = 6,
                Link = "#",
                Title = "Health",
                Icon = "./Images/icon-5.png",
            });
            list.Add(new Quicklink
            {
                Id = 7,
                Link = "#",
                Title = "Service Desk",
                Icon = "./Images/icon-6.png",
            });
            list.Add(new Quicklink
            {
                Id = 8,
                Link = "#",
                Title = "Truck",
                Icon = "./Images/icon-7.png",
            });

            list.Add(new Quicklink
            {
                Id = 9,
                Link = "#",
                Title = "Idea",
                Icon = "./Images/icon-8.png",
            });
            return list;

        }


            // return Enumerable.Range(1, 7).Select(index => new Quicklink
            // {
            //     Id = index,
            //     Question = "Lorem ipsum dolor sit amet",
            //     Answer = "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            // })
            // .ToArray();
    }
}
