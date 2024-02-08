using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace AOPC_CMSv2.ViewModel
{
    public class BusinessLocVM
    {
        public int Id { get; set; }


        public string? PostalCode { get; set; }

        public string? City { get; set; }

        public string? Country { get; set; }

        public string? DateCreated { get; set; }
        public string? Status { get; set; }
        public string? BusinessLocID { get; set; }



    }
}
