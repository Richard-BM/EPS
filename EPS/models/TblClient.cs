using System;
using System.Collections.Generic;

#nullable disable

namespace EPS.models
{
    public partial class TblClient
    {
        public TblClient()
        {
            TblProjects = new HashSet<TblProject>();
        }

        public Guid IdClient { get; set; }
        public string Name { get; set; }

        public virtual ICollection<TblProject> TblProjects { get; set; }
    }
}
