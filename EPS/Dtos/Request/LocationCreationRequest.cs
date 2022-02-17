using System.ComponentModel.DataAnnotations;

namespace EPS.Dtos.Request
{
    public class LocationCreationRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Street { get; set; }

        [Required]
        public string Postalcode { get; set; }

        [Required]
        public string City { get; set; }
    }
}
