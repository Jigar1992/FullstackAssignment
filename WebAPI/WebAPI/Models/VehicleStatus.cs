using System;
using System.Collections.Generic;

namespace WebAPI.Models
{
    public partial class VehicleStatus
    {
        public VehicleStatus()
        {
            Vehicles = new HashSet<Vehicles>();
        }

        public int Id { get; set; }
        public string StatusName { get; set; }

        public virtual ICollection<Vehicles> Vehicles { get; set; }
    }
}
