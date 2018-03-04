using System;

namespace Cortex.Auth
{
    public class IdentityUser
    {
        public Guid Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string PasswordHash { get; set; }

        public string Name { get; set; }
    }
}
