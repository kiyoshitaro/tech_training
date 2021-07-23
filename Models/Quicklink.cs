using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace aspdotnetcore.Models
{
    public class Quicklink
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [MaxLength(100)]
        [Column("Icon")]

        public string Icon { get; set; }

        [MaxLength(100)]
        [Column("Link")]

        public string Link { get; set; }

        [Required]
        [MaxLength(100)]
        [Column("Title")]
        public string Title { get; set; }
    }
}
