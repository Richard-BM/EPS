using System.ComponentModel.DataAnnotations;

namespace EPS.Dtos.Response
{
    public class LocationResponse
    {
        [Required]
        public System.Guid locationId { get; set; }
        [Required]
        public string name { get; set; }
        [Required]
        public string street { get; set; }
        [Required]
        public string postalcode { get; set; }
        [Required]
        public string city { get; set; }
    }
}
