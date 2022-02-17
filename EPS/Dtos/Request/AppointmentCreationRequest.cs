using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EPS.Dtos.Request
{
    public class AppointmentCreationRequest
    {
        [Required]
        public Guid AssignedPersonId { get; set; }

        [Required]
        public Guid AssignedLocationId { get; set; }

        [Required]
        public Guid AssignedProjectId { get; set; }

        [Required]
        public DateTime TimeFrom { get; set; }

        [Required]
        public DateTime TimeTo { get; set; }
    }
}
