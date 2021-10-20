using System.ComponentModel.DataAnnotations;

namespace EPS.Dtos.Response
{
    public class ProjectResponse
    {
        [Required]
        public System.Guid projectId { get; set; }
        [Required]
        public string projectName { get; set; }
        [Required]
        public string projectNumber { get; set; }
        [Required]
        public string projectDescription { get; set; }
        public Dtos.Response.ClientResponse clientResponse { get; set; }
    }
}
