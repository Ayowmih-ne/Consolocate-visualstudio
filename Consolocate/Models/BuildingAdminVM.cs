using System.ComponentModel.DataAnnotations;

namespace Consolocate.Models
{
    public class BuildingAdminVM
    {
        public int Id { get; set; }

        [Required]
        public string Code { get; set; } = "";

        [Required]
        public string Name { get; set; } = "";

        public string Color { get; set; } = "#000000";

        public string Title { get; set; } = "";

        public string Description { get; set; } = "";

        public string ImageUrl { get; set; } = "";

        public string QrCodeUrl { get; set; } = "";

        // ADMIN-ONLY FIELDS
        public string OfficesText { get; set; } = "";
        public string CoordinatesJson { get; set; } = "";
        public bool IsDeleted { get; set; }

    }
}
