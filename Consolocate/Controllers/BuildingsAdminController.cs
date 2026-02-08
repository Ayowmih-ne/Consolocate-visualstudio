using System;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Consolocate.Models;
using ConsoLocate.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ConsoLocate.Controllers
{
    public class BuildingsAdminController : Controller
    {
        private readonly AppDbContext _context;

        public BuildingsAdminController(AppDbContext context)
        {
            _context = context;
        }

        // =====================
        // ADMIN CHECK (CALL ON GET PAGES)
        // =====================
        private IActionResult AdminCheck()
        {
            if (HttpContext.Session.GetString("IsAdmin") != "true")
                return RedirectToAction("Login", "Account");

            return null;
        }

        // =====================
        // INDEX (ACTIVE BUILDINGS)
        // =====================
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var guard = AdminCheck();
            if (guard != null) return guard;

            var buildings = await _context.Buildings
                .Where(b => !b.IsDeleted)
                .OrderBy(b => b.Name)
                .Select(b => new BuildingAdminVM
                {
                    Id = b.Id,
                    Code = b.Code,
                    Name = b.Name,
                    Title = b.Title,
                    Description = b.Description,
                    Color = b.Color,
                    ImageUrl = b.ImageUrl,
                    QrCodeUrl = b.QrCodeUrl,
                    IsDeleted = b.IsDeleted
                })
                .ToListAsync();

            return View(buildings);
        }

        // =====================
        // DELETED PAGE (ONLY DELETED)
        // =====================
        [HttpGet]
        public async Task<IActionResult> Deleted()
        {
            var guard = AdminCheck();
            if (guard != null) return guard;

            var buildings = await _context.Buildings
                .Where(b => b.IsDeleted)
                .OrderBy(b => b.Name)
                .Select(b => new BuildingAdminVM
                {
                    Id = b.Id,
                    Name = b.Name,
                    IsDeleted = true
                })
                .ToListAsync();

            return View(buildings);
        }

        // =====================
        // CREATE (GET)
        // =====================
        [HttpGet]
        public IActionResult Create()
        {
            var guard = AdminCheck();
            if (guard != null) return guard;

            return View(new BuildingAdminVM());
        }

        // =====================
        // CREATE (POST) ✅ SIMPLE & WORKING
        // =====================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(BuildingAdminVM vm)
        {
            Console.WriteLine("🔥 CREATE POST HIT");

            if (!ModelState.IsValid)
            {
                Console.WriteLine("❌ ModelState INVALID");
                return View(vm);
            }

            var building = new Building
            {
                Code = string.IsNullOrWhiteSpace(vm.Code) ? Guid.NewGuid().ToString() : vm.Code,
                Name = vm.Name,
                Title = vm.Title,
                Description = vm.Description,
                Color = string.IsNullOrWhiteSpace(vm.Color) ? "#cccccc" : vm.Color,
                ImageUrl = string.IsNullOrWhiteSpace(vm.ImageUrl) ? "/images/default.png" : vm.ImageUrl,
                QrCodeUrl = string.IsNullOrWhiteSpace(vm.QrCodeUrl) ? "/images/qr/default.png" : vm.QrCodeUrl,
                IsDeleted = false
            };

            _context.Buildings.Add(building);
            await _context.SaveChangesAsync();

            Console.WriteLine("✅ INSERT SUCCESS");
            TempData["Success"] = "Building added successfully.";
            return RedirectToAction(nameof(Index));
        }

        // =====================
        // EDIT (GET)
        // =====================
        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var guard = AdminCheck();
            if (guard != null) return guard;

            var building = await _context.Buildings
                .Include(b => b.Offices)
                .Include(b => b.Coordinates)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (building == null)
                return NotFound();

            var vm = new BuildingAdminVM
            {
                Id = building.Id,
                Code = building.Code,
                Name = building.Name,
                Color = building.Color,
                Title = building.Title,
                Description = building.Description,
                ImageUrl = building.ImageUrl,
                QrCodeUrl = building.QrCodeUrl,
                IsDeleted = building.IsDeleted,
                OfficesText = string.Join("\n", building.Offices.Select(o => o.OfficeName)),
                CoordinatesJson = JsonSerializer.Serialize(
                    building.Coordinates
                        .OrderBy(c => c.Seq)
                        .Select(c => new[] { c.Lng, c.Lat })
                )
            };

            return View(vm);
        }

        // =====================
        // EDIT (POST)
        // =====================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(BuildingAdminVM vm)
        {
            if (!ModelState.IsValid)
                return View(vm);

            var building = await _context.Buildings.FindAsync(vm.Id);
            if (building == null)
                return NotFound();

            building.Name = vm.Name;
            building.Title = vm.Title;
            building.Description = vm.Description;
            building.Color = vm.Color;

            // prevent NULL into NOT NULL columns
            building.ImageUrl = string.IsNullOrWhiteSpace(vm.ImageUrl) ? building.ImageUrl : vm.ImageUrl;
            building.QrCodeUrl = string.IsNullOrWhiteSpace(vm.QrCodeUrl) ? building.QrCodeUrl : vm.QrCodeUrl;

            await _context.SaveChangesAsync();

            TempData["Success"] = "Building updated.";
            return RedirectToAction(nameof(Index));
        }

        // =====================
        // DELETE (GET) ✅ RESTORED
        // =====================
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var guard = AdminCheck();
            if (guard != null) return guard;

            var building = await _context.Buildings.FindAsync(id);
            if (building == null)
                return NotFound();

            var vm = new BuildingAdminVM
            {
                Id = building.Id,
                Code = building.Code,
                Name = building.Name,
                Color = building.Color,
                Title = building.Title,
                Description = building.Description,
                ImageUrl = building.ImageUrl,
                QrCodeUrl = building.QrCodeUrl,
                IsDeleted = building.IsDeleted
            };

            return View(vm);
        }

        // =====================
        // DELETE (POST) ✅ SOFT DELETE
        // =====================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(BuildingAdminVM vm)
        {
            var building = await _context.Buildings.FindAsync(vm.Id);
            if (building == null)
                return NotFound();

            building.IsDeleted = true;
            await _context.SaveChangesAsync();

            TempData["Success"] = "Building deleted.";
            return RedirectToAction(nameof(Index));
        }

        // =====================
        // RESTORE
        // =====================
        [HttpGet]
        public async Task<IActionResult> Restore(int id)
        {
            var building = await _context.Buildings.FindAsync(id);
            if (building == null)
                return NotFound();

            building.IsDeleted = false;
            await _context.SaveChangesAsync();

            TempData["Success"] = "Building restored.";
            return RedirectToAction(nameof(Index));
        }

        // =====================
        // EXIT ADMIN
        // =====================
        [HttpGet]
        public IActionResult Back()
        {
            return RedirectToAction("Index", "Home", new { screen = "welcome" });
        }
    }
}
