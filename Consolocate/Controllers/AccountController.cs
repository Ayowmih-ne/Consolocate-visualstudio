using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace ConsoLocate.Controllers
{
    public class AccountController : Controller
    {
        // GET: Login
        public IActionResult Login(string returnUrl = "/BuildingsAdmin")
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        // POST: Login
        [HttpPost]
        public IActionResult Login(string username, string password, string returnUrl)
        {
            if (username == "consolocateadmin" && password == "@password123")
            {
                HttpContext.Session.SetString("IsAdmin", "true");

                if (!string.IsNullOrEmpty(returnUrl))
                    return Redirect(returnUrl);

                return RedirectToAction("Index", "BuildingsAdmin");
            }

            ViewBag.Error = "Invalid admin credentials";
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        // Logout
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "Home", new { screen = "welcome" });
        }
    }
}
