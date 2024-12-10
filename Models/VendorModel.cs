using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AuthSystem.Models
{
    public class VendorModel
    {
       
        public int Id { get; set; }

        public string VendorName { get; set; }

        public int? BusinessTypeId { get; set; }
        public string? Description { get; set; }

        public string? Services { get; set; }

        public string? WebsiteUrl { get; set; }

        public string? FeatureImg { get; set; }

        public string? Gallery { get; set; }
        public string? VendorID{ get; set; }

        public string? Cno { get; set; }

        public string? Email { get; set; }

        public string? VideoUrl { get; set; } 
        
        public string? VrUrl { get; set; }        
        
        public string? BusinessLocationID { get; set; }
        public string? Address { get; set; }
        public string? VendorLogo { get; set; }
        public string? FileUrl { get; set; }
        public string? Map { get; set; }
        public int? Status { get; set; }
    }
}
