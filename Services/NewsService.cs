using System.Collections.Generic;
using System.Linq;
using System;
namespace aspdotnetcore.Services
{
    public interface INewsService
    {
        List<News> GetPage(int start,int limit);
        int GetPageNum(int limit);
        News AddNews(News news);
        News UpdateNews(int id, News news);
        int DeleteNews(int id);

    }
    public class NewsService: INewsService
    {

        private List<News> _newss = new List<News>()
        {
            new News
            {
                Id = 0,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "./Images/image_gallery.png",
                Time = "05/jan/2021"
            },
            new News
            {
                Id = 1,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "./Images/image_gallery-1.png",
                Time = "05/jan/2021"
            },
            new News
            {
                Id = 2,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "./Images/image_gallery-2.png",
                Time = "05/jan/2021"
            },
            new News
            {
                Id = 3,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "./Images/image_gallery-3.png",
                Time = "05/jan/2021"
            },
            new News
            {
                Id = 4,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "./Images/image_gallery-3.png",
                Time = "05/jan/2021"
            },
            new News
            {
                Id = 5,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "./Images/image_gallery-3.png",
                Time = "05/jan/2021"
            },
            new News
            {
                Id = 6,
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
                return (int)(_newss.Count / limit + 1);
            }
        }

        public List<News> GetPage(int start,int limit)
        {
            if(limit == -1 ){
                return _newss;
            }
            else{
                
                IEnumerable<News> filteringQuery =
                    from news in _newss
                    where news.Id < (start+1)* limit  && news.Id >= start* limit 
                    select news;

                return filteringQuery.ToList();
            }
        }
        public News AddNews(News news)
        {
            news.Id = _newss[_newss.Count-1].Id+ 1 ;
            _newss.Add(news);
            return news;
        }

        public News UpdateNews(int id, News news)
        {
            for (var index = _newss.Count - 1; index >= 0; index--)
            {
                if (_newss[index].Id == id)
                {
                    _newss[index] = news;
                }
            }
            return news;
        }

        public int DeleteNews(int id)
        {
            for (var index = _newss.Count - 1; index >= 0; index--)
            {
                if (_newss[index].Id == id)
                {
                    _newss.RemoveAt(index);
                }
            }

            return id;
        }


    }
}
