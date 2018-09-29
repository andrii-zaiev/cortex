using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cortex.Services.Dtos;
using Cortex.Services.Interfaces;
using Cortex.Web.Models.Users;
using Microsoft.AspNetCore.Mvc;

namespace Cortex.Web.Controllers
{
    public class UsersController : Controller
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("/users/{userName}")]
        public async Task<IActionResult> GetUser(string userName)
        {
            User user = await _userService.GetUserAsync(userName);

            if (user == null)
            {
                return NotFound();
            }

            var model = new UserDetailsModel(user);

            return View(model);
        }
    }
}