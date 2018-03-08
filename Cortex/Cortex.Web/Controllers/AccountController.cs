using System;
using Cortex.Web.Models.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using IdentityUser = Cortex.Auth.IdentityUser;

namespace Cortex.Web.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AccountController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpGet("/register")]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost("/register")]
        [ValidateAntiForgeryToken]
        public IActionResult Register(RegisterModel registerModel)
        {
            return RedirectToAction("Index", "Main");
        }

        [HttpGet("/log-in")]
        public IActionResult LogIn()
        {
            return View();
        }

        [HttpPost("/log-in")]
        [ValidateAntiForgeryToken]
        public IActionResult LogIn(LogInModel logInModel)
        {
            return RedirectToAction("Index", "Main");
        }

        [HttpPost("/log-out")]
        [ValidateAntiForgeryToken]
        public IActionResult LogOut()
        {
            throw new NotImplementedException();
        }
    }
}