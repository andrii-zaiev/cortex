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
using System.Security.Claims;
namespace Cortex.Auth
{
    public static class ClaimsPrincipalExtensions
    {
        public static Guid GetId(this ClaimsPrincipal principal)
        {
            Guid? id = GetNullableId(principal);

            if (id.HasValue)
            {
                return id.Value;
            }

            throw new InvalidOperationException("User Id not found in ClaimsPrincipal");
        }

        public static Guid? GetNullableId(this ClaimsPrincipal principal)
        {
            string idString = principal.FindFirstValue(ClaimTypes.NameIdentifier);

            if (Guid.TryParse(idString, out Guid id))
            {
                return id;
            }

            return null;
        }
    }
}
