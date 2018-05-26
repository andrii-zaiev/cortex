using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cortex.Auth;
using Cortex.Services.Dtos;
using Cortex.Services.Interfaces;
using Cortex.Web.Models.Api;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cortex.Web.Controllers.Api
{
    [Authorize]
    public class UsersApiController : Controller
    {
        private readonly IUserService _userService;

        public UsersApiController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("api/users")]
        public async Task<IActionResult> FindUsers(string query)
        {
            if (String.IsNullOrEmpty(query) || query.Length > 50)
            {
                return BadRequest();
            }

            IList<User> users = await _userService.FindUsersAsync(query);

            List<UserModel> result = users
                .Where(u => u.Id != User.GetId())
                .Select(u => new UserModel(u))
                .ToList();

            return Ok(result);
        }
    }
}
