using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public partial class Model
    {
        [NotMapped]
        public List<Manufacturer> ManufacturerList { get; set; }
    }
}
