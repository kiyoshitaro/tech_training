using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace aspdotnetcore.Models
{
    [Table("Faqs")]
    public class Faq
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Column("Question")]
        public string Question { get; set; }

        [Column("Answer")]
        public string Answer { get; set; }
    }
}
