using System;
using System.ComponentModel.DataAnnotations;

namespace Cortex.DataAccess.Models
{
    public class User
    {
        public Guid Id { get; set; }

        [MaxLength(200)]
        public string Name { get; set; }

        [MaxLength(30)]
        [Required]
        public string UserName { get; set; }

        [MaxLength(200)]
        [Required]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public string Salt { get; set; }
    }
}
