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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Announcement>()
                .Property(b => b.Title)
                .HasColumnName("Title")
                .HasMaxLength(100)
                .IsRequired();
            modelBuilder.Entity<Announcement>()
                .Property(b => b.Img)
                .HasColumnName("Img")
                .HasMaxLength(100);
            modelBuilder.Entity<Announcement>()
                .Property(b => b.Time)
                .HasColumnName("Time")
                .HasColumnType("Date");

            modelBuilder.Entity<News>()
                .Property(b => b.Title)
                .HasColumnName("Title")
                .HasMaxLength(100)
                .IsRequired();
            modelBuilder.Entity<News>()
                .Property(b => b.Img)
                .HasColumnName("Img")
                .HasMaxLength(100);
            modelBuilder.Entity<News>()
                .Property(b => b.Time)
                .HasColumnName("Time")
                .HasColumnType("Date");

            modelBuilder.Entity<Event>()
                .Property(b => b.Title)
                .HasColumnName("Title")
                .HasMaxLength(100)
                .IsRequired();
            modelBuilder.Entity<Event>()
                .Property(b => b.EndDate)
                .HasColumnType("Datetime2")
                .HasColumnName("EndDate");
            modelBuilder.Entity<Event>()
                .Property(b => b.EventDate)
                .HasColumnType("Datetime2")
                .HasColumnName("EventDate");


            modelBuilder.Entity<Faq>()
                .Property(b => b.Question)
                .HasColumnName("Question")
                .IsRequired();


            modelBuilder.Entity<Quicklink>()
                .Property(b => b.Title)
                .HasColumnName("Title")
                .HasMaxLength(100)
                .IsRequired();
            modelBuilder.Entity<Quicklink>()
                .Property(b => b.Link)
                .HasColumnName("Link")
                .HasMaxLength(100);
            modelBuilder.Entity<Quicklink>()
                .Property(b => b.Icon)
                .HasColumnName("Icon")
                .HasMaxLength(100);
        }


        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer(
        //        @"Server=(localdb)\mssqllocaldb;Database=MyDatabase;Integrated Security=True");
        //}
    }


    
}
