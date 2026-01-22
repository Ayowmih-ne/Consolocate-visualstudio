using ConsoLocate.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class BuildingsController : ControllerBase
{
    private readonly AppDbContext _db;

    public BuildingsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var buildings = await _db.Buildings
            .Include(b => b.Coordinates.OrderBy(c => c.Seq))
            .Include(b => b.Offices)
            .ToListAsync();

        return Ok(buildings.Select(b => new
        {
            id = b.Code,
            name = b.Name,
            color = b.Color,
            coordinates = b.Coordinates
                .OrderBy(c => c.Seq)
                .Select(c => new[] { c.Lng, c.Lat }),
            info = new
            {
                title = b.Title,
                description = b.Description,
                image = b.ImageUrl,
                offices = b.Offices.Select(o => o.OfficeName)
            }
        }));
    }
}
