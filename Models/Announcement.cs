using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace aspdotnetcore.Models
{
    [Table("Announcements")]

    public class Announcement
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("Content")]
        public string Content { get; set; }
        [Column("Time", TypeName = "Date")]
        public DateTime Time { get; set; }

        [MaxLength(100)]
        [Column("Img")]
        public string Img { get; set; }

        [Required]
        [MaxLength(100)]
        [Column("Title")]
        public string Title { get; set; }

    }
}
