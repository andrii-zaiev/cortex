using System.ComponentModel.DataAnnotations;

namespace Cortex.Web.Models
{
    public class NewNetworkModel
    {
        [MaxLength(100, ErrorMessage = "Name should be shorter than 100 symbols")]
        [Display(Name = "Name")]
        [Required]
        public string Name { get; set; }

        [MaxLength(6000, ErrorMessage = "Name should be shorter than 100 symbols")]
        [DataType(DataType.MultilineText)]
        [Display(Name = "Description")]
        public string Description { get; set; }
    }
}
