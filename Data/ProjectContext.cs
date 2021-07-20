using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using aspdotnetcore.Models;

namespace aspdotnetcore.Data
{
    public class ProjectContext : DbContext
    {
        public ProjectContext(DbContextOptions<ProjectContext> options) : base(options)
        { }

        public DbSet<Announcement> Announcement { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Faq> Faq { get; set; }
        public DbSet<Event> Event { get; set; }
        public DbSet<Quicklink> Quicklink { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer(
        //        @"Server=(localdb)\mssqllocaldb;Database=MyDatabase;Integrated Security=True");
        //}
    }


    
}
