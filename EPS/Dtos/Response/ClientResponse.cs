using System.ComponentModel.DataAnnotations;

namespace EPS.Dtos.Response
{
    public class ClientResponse
    {
        [Required]
        public System.Guid ClientId { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
