using System.Collections.Generic;
using System.Linq;
using System;
namespace aspdotnetcore.Services
{
    public interface INewsService
    {
        List<News> GetPage(int start,int limit);
        int GetPageNum(int limit);

    }
    public class NewsService: INewsService
    {

        List<News> Newss = new List<News>()
        {
            new News
            {
                Id = 1,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "./Images/image_gallery.png",
                Time = "05/jan/2021"
            },
            new News
            {
                Id = 2,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "./Images/image_gallery-1.png",
                Time = "05/jan/2021"
            },
            new News
            {
                Id = 3,
                Title = "IT maintainance",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                Img = "./Images/image_gallery-2.png",
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
            new News
            {
                Id = 7,
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
                return (int)(this.Newss.Count / limit + 1);
            }
        }

        public List<News> GetPage(int start,int limit)
        {
            if(limit == -1 ){
                return this.Newss;
            }
            else{
                
                IEnumerable<News> filteringQuery =
                    from news in this.Newss
                    where news.Id < (start+1)* limit + 1 && news.Id >= start* limit + 1
                    select news;

                return filteringQuery.ToList();
            }
        }
    }
}
