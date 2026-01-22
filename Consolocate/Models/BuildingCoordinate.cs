using System.ComponentModel.DataAnnotations;

namespace ConsoLocate.Models
{
    public class BuildingCoordinate
    {
        public int Id { get; set; }

        public int BuildingId { get; set; }
        public Building Building { get; set; } = null!;

        // order ng points
        public int Seq { get; set; }

        public double Lng { get; set; }
        public double Lat { get; set; }
    }
}
