using System.ComponentModel.DataAnnotations;

namespace Cortex.Web.Models.Account
{
    public class LogInModel
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        public bool RememberMe { get; set; }
    }
}
