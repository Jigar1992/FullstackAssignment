using System;
using System.Collections.Generic;

namespace WebAPI.Models
{
    public partial class Model
    {
        public Model()
        {
            Vehicles = new HashSet<Vehicles>();
        }

        public int Id { get; set; }
        public int ManufacturerId { get; set; }
        public string ModelName { get; set; }
        public DateTime FirstProductionDate { get; set; }

        public virtual Manufacturer Manufacturer { get; set; }
        public virtual ICollection<Vehicles> Vehicles { get; set; }
    }
}
