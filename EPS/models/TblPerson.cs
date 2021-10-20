using System;
using System.Collections.Generic;

#nullable disable

namespace EPS.models
{
    public partial class TblPerson
    {
        public TblPerson()
        {
            TblAppointments = new HashSet<TblAppointment>();
        }

        public Guid IdPerson { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }

        public virtual ICollection<TblAppointment> TblAppointments { get; set; }
    }
}
