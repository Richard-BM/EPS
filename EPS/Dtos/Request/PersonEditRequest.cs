using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EPS.Dtos.Request
{
    public class PersonEditRequest
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string firstname { get; set; }

        [Required]
        public string lastname { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }
    }
}
