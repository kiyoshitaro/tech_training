using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace aspdotnetcore.Models
{
    [Table("Events")]
    public class Event
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("EventDate", TypeName = "Datetime2")]

        public DateTime EventDate { get; set; }

        [Column("EndDate", TypeName = "Datetime2")]

        public DateTime EndDate { get; set; }

        [Required]
        [MaxLength(100)]
        [Column("Title")]

        public string Title { get; set; }

    }
}
