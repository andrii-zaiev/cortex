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
using Cortex.Auth;
using Cortex.Services.Dtos;
using Cortex.Services.Interfaces;
using Cortex.Web.Models.NetworkVersions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cortex.Web.Controllers
{
    [Authorize]
    public class NetworkVersionsController : Controller
    {
        private readonly INetworkService _networkService;
        private readonly INetworkVersionsService _networkVersionsService;
        private readonly IUserService _userService;

        public NetworkVersionsController(
            INetworkService networkService,
            INetworkVersionsService networkVersionsService,
            IUserService userService)
        {
            _networkService = networkService;
            _networkVersionsService = networkVersionsService;
            _userService = userService;
        }

        [HttpGet("/network/{networkId:guid}/new-version")]
        public async Task<IActionResult> CreateVersion(Guid networkId)
        {
            bool canEdit = await _networkService.CanEditNetworkAsync(networkId, User.GetId());

            if (!canEdit)
            {
                return Forbid();
            }

            NetworkVersionMetadata currentVersion = await _networkVersionsService.GetCurrentVersionInfoAsync(networkId);
            Network network = await _networkService.GetNetworkAsync(networkId);

            var model = new NewNetworkVersionModel(network, currentVersion?.Id);

            return View(model);
        }

        [AllowAnonymous]
        [HttpGet("/network/{networkId:guid}/{versionId:guid}")]
        public async Task<IActionResult> GetVersion(Guid networkId, Guid versionId)
        {
            bool canAccess = User.Identity.IsAuthenticated
                ? await _networkService.CanAccessNetworkAsync(networkId, User.GetId())
                : await _networkService.CanAccessNetworkAnonymouslyAsync(networkId);

            if (!canAccess)
            {
                return Forbid();
            }

            NetworkVersionMetadata version = await _networkVersionsService.GetVersionInfoAsync(versionId);
            NetworkVersionMetadata currentVersion = await _networkVersionsService.GetCurrentVersionInfoAsync(networkId);
            Network network = await _networkService.GetNetworkAsync(networkId);
            User author = await _userService.GetUserAsync(version.AuthorId);
            bool canEdit = User.Identity.IsAuthenticated
                        && await _networkService.CanEditNetworkAsync(networkId, User.GetId());

            var model = new NetworkVersionDetailsModel(version, network, author, canEdit, currentVersion.Id == versionId);

            return View("GetVersion", model);
        }

        [AllowAnonymous]
        [HttpGet("/network/{networkId:guid}/current-version")]
        public async Task<IActionResult> GetCurrentVersion(Guid networkId)
        {
            NetworkVersionMetadata currentVersion = await _networkVersionsService.GetCurrentVersionInfoAsync(networkId);

            return await GetVersion(networkId, currentVersion.Id);
        }

        [HttpPost("/version/{versionId:guid}/revert")]
        public async Task<IActionResult> RevertVersion(Guid versionId)
        {
            NetworkVersionMetadata version = await _networkVersionsService.GetVersionInfoAsync(versionId);
            bool canEdit = await _networkService.CanEditNetworkAsync(version.NetworkId, User.GetId());

            if (!canEdit)
            {
                return Forbid();
            }

            await _networkVersionsService.RevertVersionAsync(versionId, User.GetId());

            return RedirectToAction(nameof(NetworksController.GetNetwork), "Networks", new { id = version.NetworkId });
        }

        [HttpPost("/version/{versionId:guid}/reset")]
        public async Task<IActionResult> ResetToVersion(Guid versionId)
        {
            NetworkVersionMetadata version = await _networkVersionsService.GetVersionInfoAsync(versionId);
            bool canEdit = await _networkService.CanEditNetworkAsync(version.NetworkId, User.GetId());

            if (!canEdit)
            {
                return Forbid();
            }

            await _networkVersionsService.ResetToVersionAsync(versionId);

            return RedirectToAction(nameof(NetworksController.GetNetwork), "Networks", new { id = version.NetworkId });
        }
    }
}
