using ConsoLocate.Data;
using ConsoLocate.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ConsoLocate.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LocationsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Locations
        // Ito ang tinatawag ng JavaScript mo para kunin ang buildings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Location>>> GetLocations()
        {
            var locations = await _context.Locations.ToListAsync();

            // Check natin kung may laman, kung wala, magbabalik ng empty list
            if (locations == null)
            {
                return NotFound();
            }

            return locations;
        }
    }
}