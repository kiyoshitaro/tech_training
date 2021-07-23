using System.Collections.Generic;
using System.Linq;
using System;
using aspdotnetcore.Models;
using aspdotnetcore.Data;

namespace aspdotnetcore.Services
{
    public interface INewsService
    {
        List<News> GetPage(int start,int limit);
        int GetPageNum(int limit);
        void AddNews(News news);
        void UpdateNews(int id, News news);
        void DeleteNews(int id);

    }
    public class NewsService: INewsService
    {
        private readonly ProjectContext _db;
        public NewsService(ProjectContext db)
        {
            _db = db;
        }
        
        public int GetPageNum(int limit)
        {
            if(limit == -1){
                return 1;
            }
            else{
                return (int)(_db.News.Count() / limit + 1);
            }
        }
        public List<News> GetPage(int start, int limit)
        {
            if (limit == -1)
            {
                return _db.News.ToList();
            }
            else
            {
                List<News> filteringQuery = _db.News.Where(r => r.Id < (start + 1) * limit && r.Id >= start * limit).ToList();
                return filteringQuery;
            }
        }
        public void AddNews(News news)
        {

            if (news.Id > 0)
            {
                UpdateNews(news.Id, news);
            }
            else
            {
                _db.News.Add(news);
                _db.SaveChanges();
            }
        }
        public void UpdateNews(int id, News news)
        {
            News _news = _db.News.Where(r => r.Id.Equals(id)).FirstOrDefault();
            if (_news != null)
            {
                _news.Content = news.Content;
                _news.Time = news.Time;
                _news.Img = news.Img;
                _news.Title = news.Title;
                _db.SaveChanges();
            }
        }

        public void DeleteNews(int id)
        {
            News _news = _db.News.Where(r => r.Id.Equals(id)).FirstOrDefault();
            if (_news != null)
            {
                _db.News.Remove(_news);
                _db.SaveChanges();
            }
        }
    }
}
