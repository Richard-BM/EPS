using System.ComponentModel.DataAnnotations;

namespace EPS.Dtos.Response
{
    public class AppointmentResponse
    {
        [Required]
        public System.Guid AppointmentId { get; set; }
        [Required]
        public Dtos.Response.PersonResponse personResponse { get; set; }
        [Required]
        public Dtos.Response.LocationResponse locationResponse { get; set; }
        [Required]
        public Dtos.Response.ProjectResponse projectResponse { get; set; }
        [Required]
        public System.DateTime EndDate { get; set; }
        [Required]
        public System.DateTime StartDate { get; set; }
    }
}
