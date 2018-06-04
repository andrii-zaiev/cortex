using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cortex.Auth;
using Cortex.Services.Dtos;
using Cortex.Services.Interfaces;
using Cortex.Web.Models.Networks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cortex.Web.Controllers
{
    [Authorize]
    public class NetworksController : Controller
    {
        private readonly INetworkService _networkService;
        private readonly INetworkVersionsService _networkVersionsService;
        private readonly IUserService _userService;

        public NetworksController(INetworkService networkService, INetworkVersionsService networkVersionsService, IUserService userService)
        {
            _networkService = networkService;
            _networkVersionsService = networkVersionsService;
            _userService = userService;
        }

        [HttpGet("/create-network")]
        public IActionResult CreateNetwork()
        {
            return View();
        }

        [HttpPost("/create-network")]
        public async Task<IActionResult> CreateNetwork(NewNetworkModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            var network = new NewNetwork
            {
                Name = model.Name,
                Description = model.Description,
                OwnerId = User.GetId()
            };

            Guid networkId = await _networkService.CreateNetworkAsync(network);

            return RedirectToAction(nameof(GetNetwork), 
                new
                {
                    id = networkId
                });
        }

        [HttpGet("/networks/{id:guid}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetNetwork(Guid id)
        {
            bool canAccess = User.Identity.IsAuthenticated
                ? await _networkService.CanAccessNetworkAsync(id, User.GetId())
                : await _networkService.CanAccessNetworkAnonymouslyAsync(id);

            if (!canAccess)
            {
                return Forbid();
            }

            Network network = await _networkService.GetNetworkAsync(id);
            List<Guid> networkUserIds = network.ReadAccess.PermittedUsers
                .Union(network.WriteAccess.PermittedUsers)
                .Union(Enumerable.Repeat(network.OwnerId, 1))
                .ToList();

            Dictionary<Guid, User> users = (await _userService.GetUsersAsync(networkUserIds)).ToDictionary(u => u.Id);

            bool isOwner = false;
            bool canEdit = false;

            if (User.Identity.IsAuthenticated)
            {
                Guid userId = User.GetId();

                isOwner = userId == network.OwnerId;
                canEdit = User.Identity.IsAuthenticated
                       && await _networkService.CanEditNetworkAsync(id, userId);
            }

            NetworkVersionMetadata currentVersion = await _networkVersionsService.GetCurrentVersionInfoAsync(id);

            var model = new NetworkDetailsModel(network, users, isOwner, canEdit, currentVersion != null);

            return View(model);
        }

        [HttpGet("/networks")]
        public async Task<IActionResult> GetOwnNetworks()
        {
            IList<Network> networks =  await _networkService.GetUserNetworksAsync(User.GetId());

            List<NetworkModel> models = networks
                .Select(n => new NetworkModel(n))
                .OrderBy(n => n.Name)
                .ToList();

            return View(models);
        }

        [HttpGet("/networks/shared")]
        public async Task<IActionResult> GetSharedNetworks()
        {
            IList<Network> networks = await _networkService.GetUserSharedNetworksAsync(User.GetId());

            List<Guid> authorIds = networks.Select(n => n.OwnerId).ToList();
            Dictionary<Guid, User> authors = (await _userService.GetUsersAsync(authorIds)).ToDictionary(u => u.Id);

            List<NetworkModel> models = networks
                .Select(n => new NetworkModel(n, authors[n.OwnerId]))
                .OrderBy(n => n.Name)
                .ToList();

            return View(models);
        }

        [HttpGet("/networks/{id:guid}/edit")]
        public async Task<IActionResult> EditNetwork(Guid id)
        {
            Network network = await _networkService.GetNetworkAsync(id);

            if (network.OwnerId != User.GetId())
            {
                return Forbid();
            }

            List<Guid> permittedUserIds = network.ReadAccess.PermittedUsers
                .Concat(network.WriteAccess.PermittedUsers)
                .Distinct()
                .ToList();

            IList<User> permittedUsers = await _userService.GetUsersAsync(permittedUserIds);

            Dictionary<Guid, User> usersMapping = permittedUsers.ToDictionary(u => u.Id);

            var model = new NetworkEditModel(network, usersMapping);

            return View(model);
        }

        [HttpPost("/networks/edit")]
        public async Task<IActionResult> Edit(NetworkUpdateModel model)
        {
            if (!ModelState.IsValid)
            {
                return await EditNetwork(model.Id);
            }

            Network network = await _networkService.GetNetworkAsync(model.Id);

            if (network.OwnerId != User.GetId())
            {
                return Forbid();
            }

            var networkUpdate = new NetworkUpdate(
                model.Name,
                model.Description,
                model.ViewMode,
                model.EditMode,
                model.ViewUsers ?? new List<Guid>(),
                model.EditUsers ?? new List<Guid>());

            await _networkService.UpdateNetworkAsync(model.Id, networkUpdate);

            return RedirectToAction("GetNetwork", "Networks", new { network.Id });
        }
    }
}
