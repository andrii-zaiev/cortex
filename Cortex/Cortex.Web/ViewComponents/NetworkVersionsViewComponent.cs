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
