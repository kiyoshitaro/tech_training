using System;
using System.Collections.Generic;
using System.Linq;
using aspdotnetcore.Data;
using aspdotnetcore.Models;
using Microsoft.Extensions.Logging;

namespace aspdotnetcore.Services
{
    public interface IFaqService
    {
        // List<Faq> GetAll();
        void AddFaq(Faq faq);
        void UpdateFaq(int id, Faq faq);
        void DeleteFaq(int id);
        List<Faq> GetPage(int start,int limit);
        int GetPageNum(int limit);
    }
    public class FaqService: IFaqService
    {
        private readonly ProjectContext _db;
        public FaqService( ProjectContext db) {
            _db = db;
        }

        public int GetPageNum(int limit)
        {
            if(limit == -1){
                return 1;
            }
            else{
                return (int)(_db.Faq.Count() / limit + 1);
            }
        }
        public List<Faq> GetPage(int start,int limit)
        {
            

            if (limit == -1 ){
                return _db.Faq.ToList();
            }
            else{
                List<Faq> filteringQuery = _db.Faq.Where(faq => faq.Id < (start + 1) * limit && faq.Id >= start * limit).ToList();
                return filteringQuery;
            }
        }

        // public List<Faq> GetAll()
        // {
        //     return _faqs;
        // }
        public void AddFaq(Faq faq)
        {

            if (faq.Id > 0)
            {
                UpdateFaq(faq.Id, faq);
            }
            else
            {
                _db.Faq.Add(faq);
                _db.SaveChanges();
            }
        }

        public void UpdateFaq(int id, Faq faq)
        {
            Faq _faq = _db.Faq.Where(r => r.Id.Equals(id)).FirstOrDefault();
            if (_faq != null)
            {
                _faq.Question = faq.Question;
                _faq.Answer  = faq.Answer ;
                _db.SaveChanges();
            }
        }

        public void DeleteFaq(int id)
        {
            Faq _faq = _db.Faq.Where(r => r.Id.Equals(id)).FirstOrDefault();
            if (_faq != null)
            {
                _db.Faq.Remove(_faq);
                _db.SaveChanges();
            }
        }
    }
}
