using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http; // Need ito para sa Session

namespace ConsoLocate.Controllers
{
    public class AccountController : Controller
    {
        // GET: Login Page
        public IActionResult Login()
        {
            return View();
        }

        // POST: Check Password
        [HttpPost]
        public IActionResult Login(string username, string password)
        {
            // DITO MO BABAGUHIN ANG USERNAME AT PASSWORD
            if (username == "consolocateadmin" && password == "@password123")
            {
                // Pag tama, bigyan ng VIP Stamp (Session)
                HttpContext.Session.SetString("IsAdmin", "true");

                // Papuntahin na sa Admin Panel
                return RedirectToAction("Index", "Locations1");
            }
            else
            {
                // Pag mali, error message
                ViewBag.Error = "Not Admin!";
                return View();
            }
        }

        // Logout
        public IActionResult Logout()
        {
            HttpContext.Session.Clear(); // Burahin ang stamp
            return RedirectToAction("Index", "Home");
        }
    }
}