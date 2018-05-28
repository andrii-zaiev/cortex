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
        public async Task<IActionResult> SaveVersion([FromBody]NetworkVersionInputModel networkVersion)
        {
            bool canEdit = await _networkService.CanEditNetworkAsync(networkVersion.NetworkId, User.GetId());
            if (!canEdit)
            {
                return BadRequest("Version creation is not allowed");
            }

            NetworkVersionMetadata currentVersion =
                await _networkVersionsService.GetCurrentVersionInfoAsync(networkVersion.NetworkId);

            if (currentVersion?.Id != networkVersion.BaseVersionId)
            {
                return BadRequest("Version is outdated");
            }

            var versionDto = new NewNetworkVersion(
                networkVersion.NetworkId,
                networkVersion.Comment,
                networkVersion.Network.ToDto(),
                User.GetId());

            Guid newVersionId = await _networkVersionsService.SaveVersionAsync(versionDto);

            return Ok(newVersionId);
        }

        [HttpGet("api/networks/{versionId:guid}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetVersion(Guid versionId)
        {
            NetworkVersion version = await _networkVersionsService.GetVersionAsync(versionId);

            bool canAccess = User.Identity.IsAuthenticated
                ? await _networkService.CanAccessNetworkAsync(version.Metadata.NetworkId, User.GetId())
                : await _networkService.CanAccessNetworkAnonymouslyAsync(version.Metadata.NetworkId);

            if (!canAccess)
            {
                return Forbid();
            }

            var model = new NetworkDiagramModel(version.Diagram);

            return Ok(model);
        }
    }
}
