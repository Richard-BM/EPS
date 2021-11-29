using System;
using System.ComponentModel.DataAnnotations;

namespace EPS.Dtos.Request
{
    public class RegisterRequest
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string firstname { get; set; }

        [Required]
        public string lastname { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }
    }
}
