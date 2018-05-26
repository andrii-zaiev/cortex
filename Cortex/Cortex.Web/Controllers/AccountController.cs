using System;
using System.Threading.Tasks;
using Cortex.Web.Models.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using IdentityUser = Cortex.Auth.IdentityUser;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

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
        public async Task<IActionResult> Register(RegisterModel registerModel)
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Main");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identityUser = new IdentityUser
            {
                Id = Guid.NewGuid(),
                Email = registerModel.Email,
                Name = registerModel.Name,
                UserName = registerModel.UserName
            };

            IdentityResult result = await _userManager.CreateAsync(identityUser, registerModel.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(identityUser, false);

                return RedirectToAction("Index", "Main");
            }

            return BadRequest();
        }

        [HttpGet("/log-in")]
        public IActionResult LogIn(string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            return View();
        }

        [HttpPost("/log-in")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> LogIn(LogInModel logInModel, string returnUrl = null)
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Main");
            }

            SignInResult result = await _signInManager.PasswordSignInAsync(
                logInModel.UserName,
                logInModel.Password,
                logInModel.RememberMe,
                false);

            if (result.Succeeded)
            {
                if (returnUrl != null)
                {
                    return Redirect(returnUrl);
                }

                return RedirectToAction("Index", "Main");
            }

            ViewData["ReturnUrl"] = returnUrl;

            return View();
        }

        [HttpPost("/log-out")]
        [Authorize]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> LogOut()
        {
            await _signInManager.SignOutAsync();

            return RedirectToAction("Index", "Main");
        }
    }
}