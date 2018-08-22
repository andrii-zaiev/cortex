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
