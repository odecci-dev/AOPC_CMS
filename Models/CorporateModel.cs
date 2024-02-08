using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AuthSystem.Models
{
    public class CorporateModel
    {
        public int Id { get; set; }
        public int Count { get; set; }
        public int VipCount { get; set; }

        public string CorporateName { get; set; }
        public string? Address { get; set; }
        public string? CNo { get; set; }
        public string? EmailAddress { get; set; }
        public string? MembershipID { get; set; }
        public int? Status { get; set; }
    }
}
