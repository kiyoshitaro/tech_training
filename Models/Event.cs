using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace aspdotnetcore.Models
{
    [Table("Events")]
    public class Event
    {
        [Key]
        public int Id { get; set; }

        [Column("EventDate", TypeName = "Datetime")]

        public DateTime EventDate { get; set; }

        [Column("EndDate", TypeName = "Datetime")]

        public DateTime EndDate { get; set; }

        [Required]
        [MaxLength(100)]
        [Column("Title")]

        public string Title { get; set; }

    }
}
