using System;
using System.Security.Claims;
namespace Cortex.Auth
{
    public static class ClaimsPrincipalExtensions
    {
        public static Guid GetId(this ClaimsPrincipal principal)
        {
            string idString = principal.FindFirstValue(ClaimTypes.NameIdentifier);

            if (Guid.TryParse(idString, out Guid id))
            {
                return id;
            }

            throw new InvalidOperationException("User Id not found in ClaimsPrincipal");
        }
    }
}
