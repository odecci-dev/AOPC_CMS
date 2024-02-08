using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace AOPC_CMSv2.ViewModel
{
    public class MembershipVM
    {
        public string Id { get; set; }


        public string MembershipName { get; set; }


        public string Description { get; set; }

        public string? MembershipCard { get; set; }
        public string? VIPCard { get; set; }
        public string? QRFrame { get; set; }
        public string? VIPBadge { get; set; }

        public string? DateStarted { get; set; }
        public string? DateCreated { get; set; }
        public string? MembershipID { get; set; }
        public string? UserCount { get; set; }
        public string? VIPCount { get; set; }


        public string? DateEnded { get; set; }

        public string? Status { get; set; }
    }
}
