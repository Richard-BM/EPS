using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EPS.Dtos.Request
{
    public class AppointmentEditRequest
    {
        [Required]
        public Guid AssignedPersonId { get; set; }

        [Required]
        public Guid AssignedLocationId { get; set; }

        [Required]
        public Guid AssignedProjectId { get; set; }

        public DateTime TimeFrom { get; set; }

        public DateTime TimeTo { get; set; }
    }
}
