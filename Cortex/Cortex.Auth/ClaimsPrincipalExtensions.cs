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
