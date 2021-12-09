using System.ComponentModel.DataAnnotations;

namespace EPS.Dtos.Request
{
    public class ClientEditRequest
    {
        [Required]
        public string Name { get; set; }
    }
}
