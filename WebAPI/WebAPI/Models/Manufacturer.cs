using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public partial class Manufacturer
    {
        public Manufacturer()
        {
            Model = new HashSet<Model>();
        }

        public int Id { get; set; }
        public string ManufacturerName { get; set; }
        public int Country { get; set; }

        public virtual ICollection<Model> Model { get; set; }
    }
}
