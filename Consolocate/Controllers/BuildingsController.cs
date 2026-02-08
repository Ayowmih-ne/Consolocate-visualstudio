
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
    public async Task<IActionResult> GetBuildings()
    {
        var buildings = await _db.Buildings
            .Include(b => b.Coordinates)
            .Include(b => b.Offices)
            .Where(b => !b.IsDeleted)
            .ToListAsync();

        return Ok(buildings);
    }
}
