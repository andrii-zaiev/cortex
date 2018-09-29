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
            string name = HttpUtility.HtmlEncode(model.Name);
            string username = HttpUtility.HtmlEncode(model.UserName.ToLower());

            string linkText = userId == model.Id ? "you" : $"{name} <{username}>";

            return helper.ActionLink(linkText, "GetUser", "Users", new { userName = username }, new { });
        }
    }
}
