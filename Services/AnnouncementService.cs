using System.Collections.Generic;
using System.Linq;

namespace aspdotnetcore.Services
{
    public interface IAnnouncementService
    {
        List<Announcement> GetPage(int start,int limit);
        int GetPageNum(int limit);
        int DeleteAnnouncement(int id);
        Announcement UpdateAnnouncement(int id, Announcement announcement);
        Announcement AddAnnouncement(Announcement announcement);
    }
    public class AnnouncementService: IAnnouncementService
    {

        private List<Announcement> _announcements = new List<Announcement>(){
            new Announcement
            {
                Id = 0,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "./Images/image_gallery.png",
                Time = "05/jan/2021"
            },
            new Announcement
            {
                Id = 1,
                Title = "Debug",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "./Images/image_gallery-1.png",
                Time = "05/jan/2021"
            },
            new Announcement
            {
                Id = 2,
                Title = "Development",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "./Images/image_gallery-2.png",
                Time = "05/jan/2021"
            },
            new Announcement
            {
                Id = 3,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "./Images/image_gallery-3.png",
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
        };
        public int GetPageNum(int limit)
        {
            if(limit == -1){
                return 1;
            }
            else{
                return (int)(_announcements.Count / limit + 1);
            }
        }
        public List<Announcement> GetPage(int start,int limit)
        {
            if(limit == -1 ){
                return _announcements;
            }
            else{
                IEnumerable<Announcement> filteringQuery =
                    from announcement in _announcements
                    where announcement.Id < (start+1)* limit  && announcement.Id >= start* limit 
                    select announcement;
                return filteringQuery.ToList();
            }
        }

        public Announcement AddAnnouncement(Announcement announcement)
        {
            announcement.Id = _announcements[_announcements.Count-1].Id+ 1 ;
            _announcements.Add(announcement);
            return announcement;
        }

        public Announcement UpdateAnnouncement(int id, Announcement announcement)
        {
            for (var index = _announcements.Count - 1; index >= 0; index--)
            {
                if (_announcements[index].Id == id)
                {
                    _announcements[index] = announcement;
                }
            }
            return announcement;
        }

        public int DeleteAnnouncement(int id)
        {
            for (var index = _announcements.Count - 1; index >= 0; index--)
            {
                if (_announcements[index].Id == id)
                {
                    _announcements.RemoveAt(index);
                }
            }

            return id;
        }

    }
}
