using System.Text.Json.Serialization;

namespace Consolocate.Models
{
    public class BuildingOffice
    {
        public int Id { get; set; }
        public int BuildingId { get; set; }

        [JsonIgnore] // 🔥 REQUIRED to stop JSON infinite loop
        public Building Building { get; set; } = null!;

        public string? OfficeName { get; set; }
    }
}
