using System;
using System.Collections.Generic;

#nullable disable

namespace EPS.models
{
    public partial class TblProject
    {
        public TblProject()
        {
            TblAppointments = new HashSet<TblAppointment>();
        }

        public Guid IdProject { get; set; }
        public Guid IdClient { get; set; }
        public string ProjectName { get; set; }
        public string ProjectNumber { get; set; }
        public string ProjectDescription { get; set; }

        public virtual TblClient IdClientNavigation { get; set; }
        public virtual ICollection<TblAppointment> TblAppointments { get; set; }
    }
}
