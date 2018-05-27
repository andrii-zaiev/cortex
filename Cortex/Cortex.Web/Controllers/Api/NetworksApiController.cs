using System;
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
    public class NetworksApiController : Controller
    {
        private readonly INetworkService _networkService;
        private readonly INetworkVersionsService _networkVersionsService;

        public NetworksApiController(
            INetworkService networkService,
            INetworkVersionsService networkVersionsService)
        {
            _networkService = networkService;
            _networkVersionsService = networkVersionsService;
        }

        [HttpPost("api/networks")]
        public async Task<IActionResult> SaveVersion(NetworkVersionInputModel networkVersion)
        {
            bool canEdit = await _networkService.CanEditNetworkAsync(networkVersion.NetworkId, User.GetId());
            if (!canEdit)
            {
                return BadRequest("Version creation is not allowed");
            }

            NetworkVersionMetadata currentVersion =
                await _networkVersionsService.GetCurrentVersionAsync(networkVersion.NetworkId);

            if (currentVersion.Id != networkVersion.BaseVersionId)
            {
                return BadRequest("Version is outdated");
            }



            Guid newVersionId = await _networkVersionsService.SaveVersionAsync(new NewNetworkVersion());

            return Ok(newVersionId);
        }
    }
}
