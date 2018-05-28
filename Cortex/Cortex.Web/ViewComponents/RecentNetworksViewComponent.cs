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
