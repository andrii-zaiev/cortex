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

        public NetworkVersionsViewComponent(
            INetworkVersionsService versionsService,
            IUserService userService)
        {
            _versionsService = versionsService;
            _userService = userService;
        }

        public async Task<IViewComponentResult> InvokeAsync(Guid networkId)
        {
            IList<NetworkVersionMetadata> versions = await _versionsService.GetNetworkVersionsAsync(networkId);

            List<Guid> authorIds = versions.Select(v => v.AuthorId).Distinct().ToList();

            Dictionary<Guid, User> authors = (await _userService.GetUsersAsync(authorIds))
                .ToDictionary(u => u.Id);

            List<NetworkVersionModel> models = versions
                .OrderByDescending(v => v.Date)
                .Select(v => new NetworkVersionModel(v, authors[v.AuthorId]))
                .ToList();

            return View(models);
        }
    }
}
