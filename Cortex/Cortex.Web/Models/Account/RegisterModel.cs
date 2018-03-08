using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Cortex.Web.Models.Account
{
    public class RegisterModel
    {
        [Required]
        [MaxLength(30)]
        [DisplayName("Username")]
        public string UserName { get; set; }

        [Required]
        [MaxLength(200)]
        [DisplayName("Name")]
        public string Name { get; set; }

        [Required]
        [MaxLength(200)]
        [DisplayName("Email")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [MaxLength(200)]
        [DisplayName("Password")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [Compare(nameof(Password))]
        [DisplayName("Confirm password")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }
    }
}
