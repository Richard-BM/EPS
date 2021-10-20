using System;
using System.Collections.Generic;

#nullable disable

namespace EPS.models
{
    public partial class TblAppointment
    {
        public Guid IdAppointment { get; set; }
        public Guid? IdPerson { get; set; }
        public Guid? IdLocation { get; set; }
        public Guid? IdProject { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public virtual TblLocation IdLocationNavigation { get; set; }
        public virtual TblPerson IdPersonNavigation { get; set; }
        public virtual TblProject IdProjectNavigation { get; set; }
    }
}
