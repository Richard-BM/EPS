using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EPS.Dtos.Request
{
    public class ProjectEditRequest
    {
        public string Name { get; set; }

        public Guid ClientId { get; set; }

        public string Number { get; set; }

        public string Description { get; set; }
    }
}
