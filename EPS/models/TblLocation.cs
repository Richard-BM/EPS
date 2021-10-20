using System;
using System.Collections.Generic;

#nullable disable

namespace EPS.models
{
    public partial class TblLocation
    {
        public TblLocation()
        {
            TblAppointments = new HashSet<TblAppointment>();
        }

        public Guid IdLocation { get; set; }
        public string Name { get; set; }
        public string Street { get; set; }
        public string Postalcode { get; set; }
        public string City { get; set; }

        public virtual ICollection<TblAppointment> TblAppointments { get; set; }
    }
}
