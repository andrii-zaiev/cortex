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
using Cortex.Services.Dtos;
using Cortex.Services.Interfaces;
using Cortex.Web.Models.NetworkVersions;
using Microsoft.AspNetCore.Mvc;

namespace Cortex.Web.ViewComponents
{
    public class NetworkVersionsViewComponent : ViewComponent
    {
        private readonly INetworkVersionsService _versionsService;
        private readonly IUserService _userService;
        private readonly INetworkService _networkService;

        public NetworkVersionsViewComponent(
            INetworkVersionsService versionsService,
            IUserService userService,
            INetworkService networkService)
        {
            _versionsService = versionsService;
            _userService = userService;
            _networkService = networkService;
        }

        public async Task<IViewComponentResult> InvokeAsync(Guid networkId, Guid? userId)
        {
            IList<NetworkVersionMetadata> versions = await _versionsService.GetNetworkVersionsAsync(networkId);

            List<Guid> authorIds = versions.Select(v => v.AuthorId).Distinct().ToList();

            Dictionary<Guid, User> authors = (await _userService.GetUsersAsync(authorIds))
                .ToDictionary(u => u.Id);
            bool canEdit = userId.HasValue && await _networkService.CanEditNetworkAsync(networkId, userId.Value);

            List<NetworkVersionModel> versionModels = versions
                .OrderByDescending(v => v.Date)
                .Select(v => new NetworkVersionModel(v, authors[v.AuthorId]))
                .ToList();

            var model = new NetworkVersionsListModel(versionModels, canEdit);

            return View(model);
        }
    }
}
