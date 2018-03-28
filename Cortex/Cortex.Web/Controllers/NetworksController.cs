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

        public NetworksController(INetworkService networkService)
        {
            _networkService = networkService;
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



            return View();
        }

        [HttpGet("/networks")]
        public IActionResult GetOwnNetworks()
        {
            return View(Enumerable.Empty<NetworkModel>().ToList());
        }

        [HttpGet("/networks/shared")]
        public IActionResult GetSharedNetworks()
        {
            var networks = new List<NetworkModel>
            {
                new NetworkModel
                {
                    AuthorName = "Jane Brown",
                    AuthorLogin = "jbrown",
                    CreatedDate = DateTimeOffset.Now,
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit, augue eu rutrum hendrerit, turpis erat dictum justo, ut porta mauris purus at lacus. Donec purus ante, ultrices et dapibus vitae, pretium ac ex. Aliquam erat volutpat. Integer eu elementum libero. Curabitur venenatis tortor faucibus pulvinar consectetur. Morbi ac neque in risus auctor vulputate vitae scelerisque est. Etiam pretium dignissim ligula, sit amet tempus risus lacinia at. Pellentesque consectetur nulla justo, vitae fermentum quam tristique non. Vestibulum in mi ipsum.",
                    Id = Guid.NewGuid(),
                    Name = "CNN"
                }
            };
            return View(networks);
        }
    }
}
