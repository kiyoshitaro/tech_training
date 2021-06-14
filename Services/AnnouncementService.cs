using System.Collections.Generic;
using System.Linq;

namespace aspdotnetcore.Services
{
    public interface IAnnouncementService
    {
        List<Announcement> GetPage(int start,int limit);
        int GetPageNum(int limit);
    }
    public class AnnouncementService: IAnnouncementService
    {

        List<Announcement> Announcements = new List<Announcement>(){
            new Announcement
            {
                Id = 1,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "./Images/image_gallery.png",
                Time = "05/jan/2021"
            },
            new Announcement
            {
                Id = 2,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "./Images/image_gallery-1.png",
                Time = "05/jan/2021"
            },
            new Announcement
            {
                Id = 3,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "./Images/image_gallery-2.png",
                Time = "05/jan/2021"
            },
            new Announcement
            {
                Id = 4,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "./Images/image_gallery-3.png",
                Time = "05/jan/2021"
            },
            new Announcement
            {
                Id = 5,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "./Images/image_gallery-3.png",
                Time = "05/jan/2021"
            },
        };
        public int GetPageNum(int limit)
        {
            if(limit == -1){
                return 1;
            }
            else{
                return (int)(this.Announcements.Count / limit + 1);
            }
        }
        public List<Announcement> GetPage(int start,int limit)
        {
            if(limit == -1 ){
                return this.Announcements;
            }
            else{
                IEnumerable<Announcement> filteringQuery =
                    from announcement in Announcements
                    where announcement.Id < (start+1)* limit + 1 && announcement.Id >= start* limit + 1
                    select announcement;
                return filteringQuery.ToList();
            }
        }
    }
}
