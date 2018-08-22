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
using Cortex.Web.Models.Networks;
using Microsoft.AspNetCore.Mvc;

namespace Cortex.Web.ViewComponents
{
    public class RecentNetworksViewComponent : ViewComponent
    {
        private readonly INetworkService _networkService;
        private readonly IUserService _userService;

        public RecentNetworksViewComponent(
            INetworkService networkService,
            IUserService userService)
        {
            _networkService = networkService;
            _userService = userService;
        }

        public async Task<IViewComponentResult> InvokeAsync(Guid userId)
        {
            IList<Network> networks = await _networkService.GetRecentNetworksAsync(userId);

            List<Guid> authorIds = networks.Select(n => n.OwnerId).ToList();
            Dictionary<Guid, User> authors = (await _userService.GetUsersAsync(authorIds)).ToDictionary(u => u.Id);

            List<NetworkModel> models = networks
                .Select(n => new NetworkModel(n, authors[n.OwnerId]))
                .ToList();

            return View(models);
        }
    }
}
