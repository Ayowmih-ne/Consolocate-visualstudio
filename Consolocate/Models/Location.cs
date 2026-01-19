// Models/Location.cs
namespace ConsoLocate.Models // Palitan ayon sa project name mo
{
    public class Location
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; } // e.g., "admin", "facilities"
        public string Floor { get; set; }
        public string Contact { get; set; }
    }
}
