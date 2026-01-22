using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ConsoLocate.Models
{
    public class Building
    {
        public int Id { get; set; }

        // unique string id used by frontend (ex: "SA-building")
        [Required]
        [MaxLength(120)]
        public string Code { get; set; } = "";

        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = "";

        [MaxLength(20)]
        public string Color { get; set; } = "#ff2200";

        // Info fields (same as your info:{...})
        [MaxLength(200)]
        public string Title { get; set; } = "";

        public string Description { get; set; } = "";

        [MaxLength(500)]
        public string ImageUrl { get; set; } = "";

        public List<BuildingCoordinate> Coordinates { get; set; } = new();
        public List<BuildingOffice> Offices { get; set; } = new();
    }
}
