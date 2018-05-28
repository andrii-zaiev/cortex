using System;
using System.Web;
using Cortex.Web.Models.Shared;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Cortex.Web.Helpers
{
    public static class Helpers
    {
        public static IHtmlContent DisplayForUser(this IHtmlHelper helper, UserDisplayModel model, Guid? userId)
        {
            if (userId == model.Id)
            {
                return new HtmlString("<span>you</span>");
            }

            string name = HttpUtility.HtmlEncode(model.Name);
            string username = HttpUtility.HtmlEncode($"<{model.UserName.ToLower()}>");
            return new HtmlString($"<span>{name} {username}</span>");
        }
    }
}
