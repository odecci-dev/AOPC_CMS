using AuthSystem.Models;
using CMS.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;
using static Humanizer.On;
using System.Net.Http.Headers;
using AuthSystem.Services;
using AuthSystem.Areas.Identity.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System.Text;
using System;
using System.Data;
using AuthSystem.Manager;
using Microsoft.Extensions.Options;
using ExcelDataReader;


using MimeKit;
using MailKit.Net.Smtp;
using NPOI.SS.Formula.Functions;
using System.Xml.Linq;
using NPOI.HPSF;
using NPOI.Util;
using System.Collections.Generic;
using System.IO;
using System.Xml;
using System.Collections;
using NPOI.POIFS.Properties;
using System.Linq;
using _CMS.Manager;
using static AOPC.Controllers.OfferingController;
using AOPC_CMSv2.ViewModel;
using System.Drawing;
using System.Drawing.Imaging;

namespace AOPC.Controllers
{
    public class MembershipPrivilegeController : Controller
    {
        DBMethods dbmet = new DBMethods();
        private ApiGlobalModel _global = new ApiGlobalModel();
        DbManager db = new DbManager();
        private IWebHostEnvironment Environment;
        private readonly AppSettings _appSettings;
        private readonly IWebHostEnvironment _environment;
        private GlobalService _globalService;
        private readonly UserManager<ApplicationUser> _userManager;
        public static string UserId;
        private IConfiguration _configuration;
        private string apiUrl = "http://";
        private string status = "";
        public readonly QueryValueService token_;
        private XmlTextReader xmlreader;
        public MembershipPrivilegeController( GlobalService globalService, IOptions<AppSettings> appSettings, IWebHostEnvironment _environment,
                  UserManager<ApplicationUser> userManager, QueryValueService _token,
                  IHttpContextAccessor contextAccessor,
                  IConfiguration configuration)
        {
            _globalService = globalService;
            token_ = _token;
            _userManager = userManager;
            UserId = _userManager.GetUserId(contextAccessor.HttpContext.User);
            _configuration = configuration;
            apiUrl = _configuration.GetValue<string>("AppSettings:WebApiURL");
            _appSettings = appSettings.Value;
            Environment = _environment;

        }
        [HttpGet]
        public async Task<JsonResult> GetPrivilegeList()
        {
            var url = DBConn.HttpString + "/api/ApiPrivilege/PrivilegeList";
            HttpClient client = new HttpClient();
            // client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", HttpContext.Session.GetString("Bearer"));

             client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            string response = await client.GetStringAsync(url);
            List<PrivilegeVM> models = JsonConvert.DeserializeObject<List<PrivilegeVM>>(response);
            //return new(models);
            return Json(new { draw = 1, data = models, recordFiltered = models?.Count, recordsTotal = models?.Count });
        }
        public class LoginStats
        {
            public string Status { get; set; }

        }
        [HttpPost]
        public async Task<IActionResult> SavePrivilegeInfo(PrivilegeVM data)
        {
            string status = "";
            try
            {

                string action = data.Id == 0 ? "Added New" : "Updated";
                dbmet.InsertAuditTrail("User Id: " + HttpContext.Session.GetString("Id") +
                   action + " PrivilegeInfo Id#: " + data.Id, DateTime.Now.ToString(),
                   "CMS-PrivilegeInfo",
                   HttpContext.Session.GetString("Name"),
                   HttpContext.Session.GetString("Id"),
                   "2",
                   HttpContext.Session.GetString("EmployeeID"));
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiPrivilege/SavePrivilege";
                // client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", HttpContext.Session.GetString("Bearer"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());

                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    _global.Status = await response.Content.ReadAsStringAsync();
                    status = JsonConvert.DeserializeObject<LoginStats>(_global.Status).Status;

                }

            }

            catch (Exception ex)
            {
                status = ex.GetBaseException().ToString();
            }
            return Json(new { stats = status });
        }
        public class DeletePriv
        {

            public int Id { get; set; }
        }
        public class PrivCorp
        {
            public string? privilegeID { get; set; }
            public string? usercount { get; set; }
            public string? vipcount { get; set; }
            public string? CorporateID { get; set; }
            public string? status { get; set; }
            public string? stats { get; set; }
        }
        public class PrivMem
        {


            public string? privilegeID { get; set; }
            public string? usercount { get; set; }
            public string? vipcount { get; set; }
            public string? MembershipID { get; set; }
            public string? status { get; set; }
            public string? stats { get; set; }
        }
        public class PrivCorpisVIP
        {
            public string? privilegeID { get; set; }
            public string? usercount { get; set; }
            public string? vipcount { get; set; }
            public string? CorporateID { get; set; }
            public string? status { get; set; }
            public string? stats { get; set; }
            public string? vipstats { get; set; }
        }
        [HttpPost]
        public async Task<IActionResult> SavepCorporatePrivlist(List<PrivCorp> IdList)
        {
            string status = "";
            try
            {
               
                var url = DBConn.HttpString + "/api/ApiCorporatePrivilege/SaveCorporatePrivilegeList";

                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
                    StringContent content = new StringContent(JsonConvert.SerializeObject(IdList), Encoding.UTF8, "application/json");
                    using (var response = await client.PostAsync(url, content))
                    {
                        _global.Status = await response.Content.ReadAsStringAsync();
                        status = JsonConvert.DeserializeObject<LoginStats>(_global.Status).Status;
                    }
                }
            }

            catch (Exception ex)
            {
                status = ex.GetBaseException().ToString();
            }
            return Json(new { stats = status });
        }

        [HttpPost]
        public async Task<IActionResult> SavepCorporatePrivlistisVIP(List<PrivCorpisVIP> VIPList)
        {
            string status = "";
            try
            {

                var url = DBConn.HttpString + "/api/ApiCorporatePrivilege/SaveCorporatePrivilegeListisVIP";

                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
                    StringContent content = new StringContent(JsonConvert.SerializeObject(VIPList), Encoding.UTF8, "application/json");
                    using (var response = await client.PostAsync(url, content))
                    {
                        _global.Status = await response.Content.ReadAsStringAsync();
                        status = JsonConvert.DeserializeObject<LoginStats>(_global.Status).Status;
                    }
                }
            }

            catch (Exception ex)
            {
                status = ex.GetBaseException().ToString();
            }
            return Json(new { stats = status });
        }
        [HttpPost]
        public async Task<IActionResult> Saveprivlist(List<PrivMem> IdList)
        {
            string status = "";
            try
            {

                var url = DBConn.HttpString + "/api/ApiPrivilege/SavePrivilegeList";

                using (var client = new HttpClient())
                {
                     client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
                    StringContent content = new StringContent(JsonConvert.SerializeObject(IdList), Encoding.UTF8, "application/json");
                    using (var response = await client.PostAsync(url, content))
                    {
                        _global.Status = await response.Content.ReadAsStringAsync();
                        status = JsonConvert.DeserializeObject<LoginStats>(_global.Status).Status;
                    }
                }
            }

            catch (Exception ex)
            {
                status = ex.GetBaseException().ToString();
            }
            return Json(new { stats = status });
        }

        public class PrivMemListItem
        {
            public string Id { get; set; }
            public string Title { get; set; }
            public string PrivilegeID { get; set; }
            public string MembershipID { get; set; }
            public string MembershipName { get; set; }
            public string UserCount { get; set; }
            public string VIPCount { get; set; }
            public string Status { get; set; }

        }
        public class privID
        {
            public string Id { get; set; }

        }
         [HttpPost]
        public async Task<IActionResult> GetPrivilegeMembershipList(privID data)
        {

            List<PrivMemListItem> model = new List<PrivMemListItem>();
            HttpClient client = new HttpClient();
            var url = DBConn.HttpString + "/api/ApiPrivilege/PrivilegeMembershipList";
            _global.Token = _global.GenerateToken("token", _appSettings.Key.ToString());
            // client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", HttpContext.Session.GetString("Bearer"));
             client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
            using (var response = await client.PostAsync(url, content))
            {
                var res = await response.Content.ReadAsStringAsync();
                model = JsonConvert.DeserializeObject<List<PrivMemListItem>>(res);
            }


            return Json(model);
        }

        public class PrivCorpListItem
        {
            public string Id { get; set; }
            public string Title { get; set; }
            public string PrivilegeID { get; set; }
            public string CorporateID { get; set; }
            public string CorporateName { get; set; }
            public string UserCount { get; set; }
            public string VIPCount { get; set; }
            public string Status { get; set; }
            public string isVIP { get; set; }

        }
        public class privIDs
        {
            public string Id { get; set; }
            public string memid { get; set; }

        }public class VenIDs
        {
            public string Id { get; set; }
            public string? vid { get; set; }

        }
        public class PrivVendListItem
        {
            public string? Id { get; set; }
            public string? VendorName { get; set; }
            public string? PrivilegeID { get; set; }
            public string? vid { get; set; }
            public string? stats { get; set; }


        }

        [HttpPost]
        public async Task<IActionResult> SavepVendorPrivlist(List<PrivVendListItem> IdList)
        {
            string status = "";
            try
            {

                var url = DBConn.HttpString + "/api/ApiMembership/SaveVendorePrivilegeList";

                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
                    StringContent content = new StringContent(JsonConvert.SerializeObject(IdList), Encoding.UTF8, "application/json");
                    using (var response = await client.PostAsync(url, content))
                    {
                        _global.Status = await response.Content.ReadAsStringAsync();
                        status = JsonConvert.DeserializeObject<LoginStats>(_global.Status).Status;
                    }
                }
            }

            catch (Exception ex)
            {
                status = ex.GetBaseException().ToString();
            }
            return Json(new { stats = status });
        }
        public async Task<IActionResult> UploadFile(List<IFormFile> postedFiles)
        {
            int i;
            var stream = (dynamic)null;
            string wwwPath = this.Environment.WebRootPath;
            string contentPath = this.Environment.ContentRootPath;
            int ctr = 0;
            string img = "";

            for (i = 0; i < Request.Form.Files.Count; i++)
            {
                if (Request.Form.Files[i].Length > 0)
                {
                    var filePath = "C:\\inetpub\\AOPCAPP\\public\\assets\\img\\";
                    //var filePath = Environment.WebRootPath + "\\uploads\\";
                    if (!Directory.Exists(filePath))
                    {
                        Directory.CreateDirectory(filePath);
                    }
                    List<string> uploadedFiles = new List<string>();


                    Guid guid = Guid.NewGuid();
                    string getextension = Path.GetExtension(Request.Form.Files[i].FileName);
                    string MyUserDetailsIWantToAdd = "EMP-01" + getextension;
                    string file = Path.Combine(filePath, Request.Form.Files[i].FileName);

                   stream = new FileStream(file, FileMode.Create);
                    Request.Form.Files[i].CopyToAsync(stream);
                    //status = "https://www.alfardanoysterprivilegeclub.com/assets/img/" + MyUserDetailsIWantToAdd;
                    foreach (IFormFile postedFile in postedFiles)
                    {
                        string fileName = Path.GetFileName(postedFile.FileName);
                        using (FileStream streams = new FileStream(Path.Combine(filePath, fileName), FileMode.Create))
                        {
                            postedFile.CopyTo(streams);
                            uploadedFiles.Add(fileName);
                            ViewBag.Message += string.Format("<b>{0}</b> uploaded.<br />", fileName);
                        }
                    }
                }
                ctr++;
                stream.Close();
                stream.Dispose();
            }

            if (Request.Form.Files.Count == 0) { status = "Error"; }
            return Json(new { stats = status });
        }
        [HttpPost]
        public async Task<IActionResult> PrivilegeCorporateList(privIDs data)
        {

            List<PrivCorpListItem> model = new List<PrivCorpListItem>();
            HttpClient client = new HttpClient();
            var url = DBConn.HttpString + "/api/ApiCorporatePrivilege/PrivilegeCorporateList";
            _global.Token = _global.GenerateToken("token", _appSettings.Key.ToString());
            // client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", HttpContext.Session.GetString("Bearer"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
            using (var response = await client.PostAsync(url, content))
            {
                var res = await response.Content.ReadAsStringAsync();
                model = JsonConvert.DeserializeObject<List<PrivCorpListItem>>(res);
            }


            return Json(model);
        }

        [HttpPost]
        public async Task<IActionResult> PrivilegeVendorList(VenIDs data)
        {

            List<PrivVendListItem> model = new List<PrivVendListItem>();
            HttpClient client = new HttpClient();
            var url = DBConn.HttpString + "/api/ApiMembership/PrivilegeVendorList";
            _global.Token = _global.GenerateToken("token", _appSettings.Key.ToString());
            // client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", HttpContext.Session.GetString("Bearer"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
            using (var response = await client.PostAsync(url, content))
            {
                var res = await response.Content.ReadAsStringAsync();
                model = JsonConvert.DeserializeObject<List<PrivVendListItem>>(res);
            }


            return Json(model);
        }


        [HttpPost]
        public async Task<IActionResult> SaveMembershipTier(MembershipModelVM data)
        {
            var stream = (dynamic)null;
     
            string status = "";
            try
            {
                var item = new MembershipModelVM();

                item.MembershipCard = data.MembershipCard;
                item.VIPBadge = data.VIPBadge;
                item.QRFrame = data.QRFrame;
                item.VIPCard = data.VIPCard;
                item.textCardColor = data.textCardColor;
                for (int i = 0; i < Request.Form.Count; i++)
                {
                    string randomFileName = "";
                    string fileExtension = "";
                    string uniqueFileName = "";
                    
                    //if (Request.Form.Files[i].Length > 0)
                    //{
                        try
                        {

                            using var imageStream = new MemoryStream();
                    
                            string uploadsFolder = "";
                            switch (i)
                            {
                                case 0:
                                    item.MembershipName = data.MembershipName;
                                    break;
                                case 1:
                          
                                    item.DateStarted = data.DateStarted;
                                    break;
                                case 2:
                           

                                    item.Description = data.Description;
                                    break;
                                case 3:
                                    item.DateEnded = data.DateEnded;
                                    break;
                                case 4:
                                    item.UserCount = data.UserCount;
                                    break;
                                case 5:
                                    item.VIPCount = data.VIPCount;
                                    break;
                                case 6:
                                    uploadsFolder = "C:\\inetpub\\AOPCAPP\\public\\assets\\img\\VIPBadge\\";
                                    randomFileName = Path.GetRandomFileName();
                                    fileExtension = Path.GetExtension(Request.Form.Files[3].FileName);
                                    uniqueFileName = Path.ChangeExtension(randomFileName, fileExtension);

                                    if (!Directory.Exists(uploadsFolder))
                                    {
                                        Directory.CreateDirectory(uploadsFolder);
                                    }

                                    var image = System.Drawing.Image.FromStream(Request.Form.Files[3].OpenReadStream());
                                    var resized = new Bitmap(image, new System.Drawing.Size(400, 400));
                                    resized.Save(imageStream, ImageFormat.Jpeg);
                                    var imageBytes = imageStream;
                                    string sql = "";

                             

                                    //img += "https://www.alfardanoysterprivilegeclub.com/assets/img/" + Request.Form.Files[i].FileName + ";";

                                    string file = Path.Combine(uploadsFolder, uniqueFileName);
                                    FileInfo f1 = new FileInfo(file);

                                    stream = new FileStream(file, FileMode.Create);
                                    await Request.Form.Files[3].CopyToAsync(stream);

                                    item.VIPBadge = uniqueFileName;

                                    stream.Close();
                                    stream.Dispose();

                                    break;
                                case 7:
                                    uploadsFolder = "C:\\inetpub\\AOPCAPP\\public\\assets\\img\\QRFrame\\";
                                    randomFileName = Path.GetRandomFileName();
                                fileExtension = Path.GetExtension(Request.Form.Files[2].FileName);
                                uniqueFileName = Path.ChangeExtension(randomFileName, fileExtension);

                                    if (!Directory.Exists(uploadsFolder))
                                    {
                                        Directory.CreateDirectory(uploadsFolder);
                                    }
                                    var image7 = System.Drawing.Image.FromStream(Request.Form.Files[2].OpenReadStream());
                                    var resized7 = new Bitmap(image7, new System.Drawing.Size(400, 400));
                                    resized7.Save(imageStream, ImageFormat.Jpeg);
                                    var imageBytes7= imageStream;

                                    string file7 = Path.Combine(uploadsFolder, uniqueFileName);
                             

                                    stream = new FileStream(file7, FileMode.Create);
                                    await Request.Form.Files[2].CopyToAsync(stream);

                                    item.QRFrame = uniqueFileName;

                                    stream.Close();
                                    stream.Dispose();

                                    break;
                                case 8:
                                    uploadsFolder = "C:\\inetpub\\AOPCAPP\\public\\assets\\img\\VIPCard\\";
                                    randomFileName = Path.GetRandomFileName();
                                    fileExtension = Path.GetExtension(Request.Form.Files[1].FileName);
                                    uniqueFileName = Path.ChangeExtension(randomFileName, fileExtension);

                                    if (!Directory.Exists(uploadsFolder))
                                    {
                                        Directory.CreateDirectory(uploadsFolder);
                                    }
                                    var image8 = System.Drawing.Image.FromStream(Request.Form.Files[1].OpenReadStream());
                                    var resized8 = new Bitmap(image8, new System.Drawing.Size(400, 400));
                                    resized8.Save(imageStream, ImageFormat.Jpeg);
                                    var imageBytes8 = imageStream;

                                    string file8 = Path.Combine(uploadsFolder, uniqueFileName);
                                    FileInfo f8 = new FileInfo(file8);

                                    stream = new FileStream(file8, FileMode.Create);
                                    await Request.Form.Files[1].CopyToAsync(stream);

                                    item.VIPCard = uniqueFileName;

                                    stream.Close();
                                    stream.Dispose();

                                    break;
                                case 9:
                                    uploadsFolder = "C:\\inetpub\\AOPCAPP\\public\\assets\\img\\MembershipCard\\";
                                    randomFileName = Path.GetRandomFileName();
                                     fileExtension = Path.GetExtension(Request.Form.Files[0].FileName);
                                     uniqueFileName = Path.ChangeExtension(randomFileName, fileExtension);


                                    if (!Directory.Exists(uploadsFolder))
                                    {
                                        Directory.CreateDirectory(uploadsFolder);
                                    }
                                    var image9 = System.Drawing.Image.FromStream(Request.Form.Files[0].OpenReadStream());
                                    var resized9 = new Bitmap(image9, new System.Drawing.Size(400, 400));
                                    resized9.Save(imageStream, ImageFormat.Jpeg);
                                    var imageBytes9 = imageStream;
                                


                                    string file9 = Path.Combine(uploadsFolder, uniqueFileName);
                                    FileInfo f9 = new FileInfo(file9);

                                    stream = new FileStream(file9, FileMode.Create);
                                    await Request.Form.Files[0].CopyToAsync(stream);
                                    item.MembershipCard = uniqueFileName;

                                    stream.Close();
                                    stream.Dispose();

                                    break;
                                case 10:
                               
                                    item.Id = data.Id;

                                    break;
                                default:
                                    break;
                            }

                            
                        }
                        catch (Exception ex)
                        {
                            status = "Error! " + ex.GetBaseException().ToString();
                        }
                   
                
                 
                }
                //Console.Write("Switch Case: "+Request.Form.Count + "\n");
                //Console.Write("/n Membership: " + item.MembershipCard + "\n");
                //Console.Write("/n VIPCard: " + item.VIPCard + "\n");
                //Console.Write("/n QRFrame: " + item.QRFrame + "\n");
                //Console.Write("/n VIPBadge: " + item.VIPBadge + "\n");
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiMembership/SaveMembershipTier";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());

                StringContent content = new StringContent(JsonConvert.SerializeObject(item), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    _global.Status = await response.Content.ReadAsStringAsync();
                    status = JsonConvert.DeserializeObject<LoginStats>(_global.Status).Status;

                }



            }

            catch (Exception ex)
            {
                status = ex.GetBaseException().ToString();
            }
            return Json(new { stats = status });
        }
        [HttpPost]
        public async Task<IActionResult> DeletePrivilegeInfo(DeletePriv data)
        {
            try
            {
                string action = data.Id == 0 ? "Added New" : "Updated";
                dbmet.InsertAuditTrail("User Id: " + HttpContext.Session.GetString("Id") +
                   "Deleted Privilege Id#: " + data.Id, DateTime.Now.ToString(),
                   "CMS-Privilege",
                   HttpContext.Session.GetString("Name"),
                   HttpContext.Session.GetString("Id"),
                   "2",
                   HttpContext.Session.GetString("EmployeeID"));
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiPrivilege/DeletePrivilege";
                //  client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", HttpContext.Session.GetString("Bearer"));
                 client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());

                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    _global.Status = await response.Content.ReadAsStringAsync();
                    status = JsonConvert.DeserializeObject<LoginStats>(_global.Status).Status;
                }
            }

            catch (Exception ex)
            {
                string status = ex.GetBaseException().ToString();
            }
            return Json(new { stats = status });
        }
        public class DeleteMem
        {

            public int Id { get; set; }
        }
        [HttpPost]
        public async Task<IActionResult> DeleteMemInfo(DeleteMem data)
        {      string status = "";
            try
            {
                string action = data.Id == 0 ? "Added New" : "Updated";
                dbmet.InsertAuditTrail("User Id: " + HttpContext.Session.GetString("Id") +
                   "Deleted MemberInfo Id#: " + data.Id, DateTime.Now.ToString(),
                   "CMS-MemberInfo",
                   HttpContext.Session.GetString("Name"),
                   HttpContext.Session.GetString("Id"),
                   "2",
                   HttpContext.Session.GetString("EmployeeID"));
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiMembership/DeleteMemship";
                //  client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", HttpContext.Session.GetString("Bearer"));
                 client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());

                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    _global.Status = await response.Content.ReadAsStringAsync();
                   status = JsonConvert.DeserializeObject<LoginStats>(_global.Status).Status;
                }
            }

            catch (Exception ex)
            {
               status = ex.GetBaseException().ToString();
            }
            return Json(new { stats = status });
        }
        public async Task<IActionResult> UploadMemberCard()
        {

            int i;
        
            var stream = (dynamic)null;
            string wwwPath = this.Environment.WebRootPath;
            string contentPath = this.Environment.ContentRootPath;
            int ctr = 0;
            string img = "";

            for (i = 0; i < Request.Form.Files.Count; i++)
            {
                if (Request.Form.Files[i].Length > 0)
                {
                    try
                    {
                       
                        string uploadsFolder = "";
                        switch (i) {
                            case 0:
                                uploadsFolder = "C:\\inetpub\\AOPCAPP\\public\\assets\\img\\MembershipCard\\";
                                break;
                            case 1:
                                uploadsFolder = "C:\\inetpub\\AOPCAPP\\public\\assets\\img\\VIPCard\\";
                                break;
                            case 2:
                                uploadsFolder = "C:\\inetpub\\AOPCAPP\\public\\assets\\img\\QRFrame\\";
                                break;
                            case 3:
                                uploadsFolder = "C:\\inetpub\\AOPCAPP\\public\\assets\\img\\VIPBadge\\";
                                break;
                            default:
                                break;
                        }

                        if (!Directory.Exists(uploadsFolder))
                        {
                            Directory.CreateDirectory(uploadsFolder);
                        }
                        List<string> uploadedFiles = new List<string>();

                        string randomFileName = Path.GetRandomFileName();
                        string fileExtension = Path.GetExtension(Request.Form.Files[i].FileName);
                        string uniqueFileName = Path.ChangeExtension(randomFileName, fileExtension);


                        var image = System.Drawing.Image.FromStream(Request.Form.Files[i].OpenReadStream());
                        var resized = new Bitmap(image, new System.Drawing.Size(400, 400));

                        using var imageStream = new MemoryStream();
                        resized.Save(imageStream, ImageFormat.Jpeg);
                        var imageBytes = imageStream;
                        string sql = "";

                        ////var id = table.Rows[0]["OfferingID"].ToString();
                        //string getextension = Path.GetExtension(Request.Form.Files[i].FileName);
                        ////string MyUserDetailsIWantToAdd = str + ".jpg";


                        //img += "https://www.alfardanoysterprivilegeclub.com/assets/img/" + Request.Form.Files[i].FileName + ";";

                        string file = Path.Combine(uploadsFolder, uniqueFileName);
                        FileInfo f1 = new FileInfo(file);

                        stream = new FileStream(file, FileMode.Create);
                        await Request.Form.Files[i].CopyToAsync(stream);

                    }
                    catch (Exception ex)
                    {
                        status = "Error! " + ex.GetBaseException().ToString();
                    }
                }
                stream.Close();
                stream.Dispose();
            }

            if (Request.Form.Files.Count == 0) { status = "Error"; }
            return Json(new { stats = status });
        }
     
        public IActionResult Index()
        {
            string token = HttpContext.Session.GetString("Bearer");
            if (token == "")
            {
                return RedirectToAction("Index", "LogIn");
            }

            return View();
        }

    }
}
