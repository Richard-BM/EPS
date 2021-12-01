using System.ComponentModel.DataAnnotations;

namespace EPS.Dtos.Request
{
    public class ClientCreationRequest
    {
        [Required]
        public string Name { get; set; }
    }
}
