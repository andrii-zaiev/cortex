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
        private readonly IUserService _userService;

        public NetworksController(INetworkService networkService, IUserService userService)
        {
            _networkService = networkService;
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

            var model = new NetworkDetailsModel(network, users, User.GetId() == network.OwnerId);

            return View(model);
        }

        [HttpGet("/networks")]
        public async Task<IActionResult> GetOwnNetworks()
        {
            IList<Network> networks =  await _networkService.GetUserNetworksAsync(User.GetId());

            List<NetworkModel> models = networks
                .Select(n => new NetworkModel(n, null))
                .OrderBy(n => n.Name)
                .ToList();

            return View(models);
        }

        [HttpGet("/networks/shared")]
        public IActionResult GetSharedNetworks()
        {
            var networks = new List<NetworkModel>();
            return View(networks);
        }

        [HttpGet("/networks/{id:guid}/edit")]
        public async Task<IActionResult> EditNetwork(Guid id)
        {
            Network network = await _networkService.GetNetworkAsync(id);

            if (network.OwnerId != User.GetId())
            {
                return Forbid();
            }

            var model = new NetworkEditModel(network);

            return View(model);
        }

        [HttpPost("/networks/edit")]
        public async Task<IActionResult> Edit(NetworkEditModel model)
        {
            Network network = await _networkService.GetNetworkAsync(model.Id);

            if (network.OwnerId != User.GetId())
            {
                return Forbid();
            }

            return RedirectToAction("GetNetwork", "Networks", new { network.Id });
        }
    }
}
