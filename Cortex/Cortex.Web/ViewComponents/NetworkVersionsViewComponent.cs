using System;
using System.Collections.Generic;
using Cortex.Web.Models.NetworkVersions;
using Microsoft.AspNetCore.Mvc;

namespace Cortex.Web.ViewComponents
{
    public class NetworkVersionsViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke(Guid networkId)
        {
            return View(new List<NetworkVersionModel>());
        }
    }
}
