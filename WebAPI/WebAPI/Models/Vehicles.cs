using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public partial class Vehicles
    {
       
        public int Id { get; set; }
        public int StatusId { get; set; }
        public int? ModelId { get; set; }
        public int? Year { get; set; }
        public string Colour { get; set; }

        public virtual Model Model { get; set; }

        public virtual VehicleStatus Status { get; set; }
    }
}
