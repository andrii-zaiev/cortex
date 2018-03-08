using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Cortex.Web.Models.Account
{
    public class LogInModel
    {
        [Required]
        [DisplayName("User name")]
        public string UserName { get; set; }

        [Required]
        [DisplayName("Password")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DisplayName("Remember Me")]
        public bool RememberMe { get; set; }
    }
}
