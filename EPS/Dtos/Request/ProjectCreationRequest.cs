using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EPS.Dtos.Request
{
    public class ProjectCreationRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public Guid ClientId { get; set; }

        public string Number { get; set; }

        public string Description { get; set; }
    }
}
