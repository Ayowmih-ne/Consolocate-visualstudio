using System.Text.Json.Serialization;

namespace Consolocate.Models
{
    public class BuildingCoordinate
    {
        public int Id { get; set; }
        public int BuildingId { get; set; }

        public int Seq { get; set; }
        public double Lng { get; set; }
        public double Lat { get; set; }

        [JsonIgnore] // 🔥 REQUIRED
        public Building Building { get; set; } = null!;
    }
}
