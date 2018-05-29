using Microsoft.AspNetCore.Mvc;

namespace Cortex.Web.ViewComponents
{
    public class RegistrationViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke()
        {
            return View();
        }
    }
}
