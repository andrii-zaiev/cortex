// Cortex - web application for creating and managing neural networks diagrams.
// Copyright (C) 2018  Andrii Zaiev <andrii.zaiev@gmail.com>
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.


using System;
using System.Collections.Generic;
using System.Linq;
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

            List<string> errors = result.Errors.Select(e => e.Description).ToList();

            return BadRequest(errors);
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
