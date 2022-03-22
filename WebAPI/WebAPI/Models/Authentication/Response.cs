using System;

namespace WebAPI.Models
{
    public class Response
    {
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
        public string EnteredBy { get; set; }
        public DateTime EnteredOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public bool success { get; set; } = false;
        public string message { get; set; }
        public int code { get; set; }
        public string DeletedBy { get; set; }
        public DateTime DeletedOn { get; set; }
        public bool IsActive { get; set; }
    }
}
