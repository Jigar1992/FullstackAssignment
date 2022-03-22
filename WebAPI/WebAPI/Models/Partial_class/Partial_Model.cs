using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public partial class Vehicles
    {
        [NotMapped]
        public List<VehicleStatus> VehicleStatusList { get; set; }

        [NotMapped]
        public List<Model> ModelList { get; set; }
        
    }
}
