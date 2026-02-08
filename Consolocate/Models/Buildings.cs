using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Consolocate.Models
{
    public class Building
    {
        public int Id { get; set; }

        [Required, MaxLength(120)]
        public string Code { get; set; } = "";

        [Required, MaxLength(200)]
        public string Name { get; set; } = "";

        public string Color { get; set; } = "#ff2200";
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public string ImageUrl { get; set; } = "";
        public string? QrCodeUrl { get; set; }

        public bool IsDeleted { get; set; } = false;

        // ✅ MUST be List<T>, not ICollection
        public List<BuildingCoordinate> Coordinates { get; set; } = new();
        public List<BuildingOffice> Offices { get; set; } = new();
    }
}
