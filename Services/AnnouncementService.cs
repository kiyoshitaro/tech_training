using System.Collections.Generic;
using System.Linq;

namespace aspdotnetcore.Services
{
    public interface IAnnouncementService
    {
        List<Announcement> GetAll();
    }
    public class AnnouncementService: IAnnouncementService
    {
        public List<Announcement> GetAll()
        {
            var Announcements = new List<Announcement>();
            Announcements.Add(new Announcement
            {
                Id = 1,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "./Images/image_gallery.png",
                Time = "05/jan/2021"
            });
            Announcements.Add(new Announcement
            {
                Id = 2,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "./Images/image_gallery-1.png",
                Time = "05/jan/2021"
            });
           
            Announcements.Add(new Announcement
            {
                Id = 3,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "./Images/image_gallery-2.png",
                Time = "05/jan/2021"
            });
           
            Announcements.Add(new Announcement
            {
                Id = 4,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "./Images/image_gallery-3.png",
                Time = "05/jan/2021"
            });
           
           

        return Announcements;

        }


            // return Enumerable.Range(1, 7).Select(index => new Announcement
            // {
            //     Id = index,
            //     Question = "Lorem ipsum dolor sit amet",
            //     Answer = "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            // })
            // .ToArray();
    }
}
