using System;
using System.Collections.Generic;
using System.Linq;
using aspdotnetcore.Data;
using aspdotnetcore.Models;

namespace aspdotnetcore.Services
{
    public interface IAnnouncementService
    {
        List<Announcement> GetPage(int start,int limit);
        int GetPageNum(int limit);
        void DeleteAnnouncement(int id);
        void UpdateAnnouncement(int id, Announcement announcement);
        void AddAnnouncement(Announcement announcement);
    }
    public class AnnouncementService: IAnnouncementService
    {
        private readonly ProjectContext _db;
        public AnnouncementService(ProjectContext db)
        {
            _db = db;
        }

        //Id = 0,
        //Title = "IT maintainance",
        //Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        //Img = "./Images/image_gallery.png",
        //Time = "15/jan/2021"

        public List<Announcement> GetPage(int start, int limit)
        {
            if (limit == -1)
            {
                return _db.Announcement.ToList();
            }
            else
            {
                List<Announcement> filteringQuery = _db.Announcement.Where(r => r.Id < (start + 1) * limit && r.Id >= start * limit).ToList();
                return filteringQuery;
            }
        }
        public void AddAnnouncement(Announcement announcement)
        {

            if (announcement.Id > 0)
            {
                UpdateAnnouncement(announcement.Id, announcement);
            }
            else
            {
                _db.Announcement.Add(announcement);
                _db.SaveChanges();
            }
        }
        public void UpdateAnnouncement(int id, Announcement announcement)
        {
            News _announcement = _db.News.Where(r => r.Id.Equals(id)).FirstOrDefault();
            if (_announcement != null)
            {
                try
                {
                    _announcement.Content = announcement.Content;
                    _announcement.Time = Convert.ToDateTime(announcement.Time);
                    _announcement.Img = announcement.Img;
                    _announcement.Title = announcement.Title;
                    _db.SaveChanges();

                }
                catch (Exception e) {
                    Console.Write(e.Message);
                }
            }
        }

        public void DeleteAnnouncement(int id)
        {
            Announcement _announcement = _db.Announcement.Where(r => r.Id.Equals(id)).FirstOrDefault();
            if (_announcement != null)
            {
                _db.Announcement.Remove(_announcement);
                _db.SaveChanges();
            }
        }

        public int GetPageNum(int limit)
        {
            if(limit == -1){
                return 1;
            }
            else{
                return (int)(_db.Announcement.Count() / limit + 1);
            }
        }
    }
}
