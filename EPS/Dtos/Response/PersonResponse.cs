using System.ComponentModel.DataAnnotations;

namespace EPS.Dtos.Response
{
    public class PersonResponse
    {
        [Required]
        public System.Guid PersonId { get; set; }
        [Required]
        public string Firstname { get; set; }
        [Required]
        public string Lastname { get; set; }
        [Required]
        public string EMail { get; set; }
        [Required]
        public System.DateTime DateOfBirth { get; set; }
    }
}
