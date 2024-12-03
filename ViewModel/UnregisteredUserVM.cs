using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace AOPC_CMSv2.ViewModel
{
    public class UnregisteredResult
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public int Count { get; set; }

    }
}
