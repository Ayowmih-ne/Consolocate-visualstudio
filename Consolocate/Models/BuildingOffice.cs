using System.ComponentModel.DataAnnotations;

namespace ConsoLocate.Models
{
    public class BuildingOffice
    {
        public int Id { get; set; }

        public int BuildingId { get; set; }
        public Building Building { get; set; } = null!;

        [Required]
        [MaxLength(200)]
        public string OfficeName { get; set; } = "";
    }
}
