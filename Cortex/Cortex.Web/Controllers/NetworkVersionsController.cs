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
        private readonly INetworkVersionsService _networkVersions;
        private readonly IUserService _userService;

        public NetworkVersionsController(
            INetworkService networkService,
            INetworkVersionsService networkVersions,
            IUserService userService)
        {
            _networkService = networkService;
            _networkVersions = networkVersions;
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

            NetworkVersionMetadata currentVersion = await _networkVersions.GetCurrentVersionAsync(networkId);
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

            return new EmptyResult();
        }
    }
}