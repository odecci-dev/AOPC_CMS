using AuthSystem.Areas.Identity.Data;
using AuthSystem.Models;
using CMS.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Data;
using AuthSystem.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using AuthSystem.Services;
using System.Text;
using System;
using AuthSystem.Manager;
using ExcelDataReader;
using MimeKit;
using MailKit.Net.Smtp;
using OfficeOpenXml;
using _CMS.Manager;
using System.Drawing;
using System.Drawing.Imaging;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
using System.IO;
using AOPC_CMSv2.ViewModel;
using OfficeOpenXml.Style;
using Net.SourceForge.Koogra.Excel;
using Net.SourceForge.Koogra.Excel2007;
using static AOPC.Controllers.CorporateController;

namespace AOPC.Controllers
{
    public class OfferingController : Controller
    {
        DBMethods dbmet = new DBMethods();
        private string status = "";
        private readonly AppSettings _appSettings;
        private ApiGlobalModel _global = new ApiGlobalModel();
        private GlobalService _globalService;
        DbManager db = new DbManager();
        private readonly UserManager<ApplicationUser> _userManager;
        public static string UserId;
        private IConfiguration _configuration;
        private string apiUrl = "http://";
        public readonly QueryValueService token_;
        private IWebHostEnvironment Environment;
        public OfferingController(IOptions<AppSettings> appSettings, GlobalService globalService, IWebHostEnvironment _environment,
                  UserManager<ApplicationUser> userManager, QueryValueService _token,
                  IHttpContextAccessor contextAccessor,
                  IConfiguration configuration)
        {
            token_ = _token;
            _userManager = userManager;
            UserId = _userManager.GetUserId(contextAccessor.HttpContext.User);
            _configuration = configuration;
            apiUrl = _configuration.GetValue<string>("AppSettings:WebApiURL");
            _appSettings = appSettings.Value;
            Environment = _environment;
            
        }
        [HttpGet]
        public async Task<JsonResult> GetOfferingList()
        {
            var url = DBConn.HttpString + "/api/ApiOffering/CMSOfferingList";
            HttpClient client = new HttpClient();
           // client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", HttpContext.Session.GetString("Bearer"));

           client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            string response = await client.GetStringAsync(url);
            List<OfferingVM> models = JsonConvert.DeserializeObject<List<OfferingVM>>(response);
            //return new(models);
            return Json(new { draw = 1, data = models, recordFiltered = models?.Count, recordsTotal = models?.Count });
        }
              public class LoginStats
        {
            public string Status { get; set; }

        }
        public class Userlist
        {
            public string Fullname { get; set; }
            public string Email { get; set; }

        }
        [HttpGet]
        public async Task<JsonResult> GetUserList()
        {
            var url = DBConn.HttpString + "/api/ApiOffering/UserListEmail";
            HttpClient client = new HttpClient();
           // client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", HttpContext.Session.GetString("Bearer"));

           client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            string response = await client.GetStringAsync(url);
            List<Userlist> models = JsonConvert.DeserializeObject<List<Userlist>>(response);
            return new(models);
        }
     
        [HttpPost]
        public async Task<IActionResult> SaveOffering(OfferingVM data)
        {
           try
            {
                string action = data.Id == 0 ? "Added New" : "Updated";
                dbmet.InsertAuditTrail("User Id: " + HttpContext.Session.GetString("Id") +
                   action + " Offering Id#: " + data.Id, DateTime.Now.ToString(),
                   "CMS-Offering",
                   HttpContext.Session.GetString("Name"),
                   HttpContext.Session.GetString("Id"),
                   "2",
                   HttpContext.Session.GetString("EmployeeID"));
                HttpClient client = new HttpClient();
                var url =DBConn.HttpString + "/api/ApiOffering/SaveOffering";
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
        [HttpPost]
        public async Task<IActionResult> PostNotifications(NotificationInsertModel data)
        {
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiNotifcation/InsertNotifications";
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
        public class NotificationInsertModel
        {

            public string? Id { get; set; }
            public string? EmployeeID { get; set; }
            public string? Details { get; set; }
            public string? Module { get; set; }
            public string? ItemID { get; set; }
            public int? isRead { get; set; }
            public int? EmailStatus { get; set; }


        }
        public class DeleteOffer
        {

            public int Id { get; set; }
        }   
        public class UserEmail
        {

            public string email { get; set; }
            public string offerid { get; set; }
        }
        public class Registerstats
        {
            public string Status { get; set; }

        }
        [HttpPost]
        public async Task<IActionResult> DeleteOfferingInfolist(List<DeleteOffer> IdList)
        {
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiOffering/DeleteOfferingList";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());

                StringContent content = new StringContent(JsonConvert.SerializeObject(IdList), Encoding.UTF8, "application/json");
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

        [HttpPost]
        public async Task<IActionResult> UserSendEmail(List<UserEmail> IdList)
        {
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiOffering/SendEmail";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());

                StringContent content = new StringContent(JsonConvert.SerializeObject(IdList), Encoding.UTF8, "application/json");
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
        [HttpPost]
        public async Task<IActionResult> DeleteOffering(DeleteOffer data)
        {
            try
            {
                string action = data.Id == 0 ? "Added New" : "Updated";
                dbmet.InsertAuditTrail("User Id: " + HttpContext.Session.GetString("Id") +
                   "Deleted Offering Id#: " + data.Id, DateTime.Now.ToString(),
                   "CMS-Offering",
                   HttpContext.Session.GetString("Name"),
                   HttpContext.Session.GetString("Id"),
                   "2",
                   HttpContext.Session.GetString("EmployeeID"));
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiOffering/DeleteOffering";
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
        public async Task<IActionResult> UploadFile(List<IFormFile> postedFiles, int id)
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
                        //  string uploadsFolder = @"C:\\Files\\";
                        //var uploadsFolder = DBConn.Path;
                        //var filePath = Environment.WebRootPath + "\\uploads\\";
                        //var uploadsFolder = DBConn.Path;
                        var uploadsFolder = "C:\\Users\\franc\\Documents\\C# Project\\Odecci\\AOPC\\AOPC_CMS\\wwwroot\\img";
                        if (!Directory.Exists(uploadsFolder))
                        {
                            Directory.CreateDirectory(uploadsFolder);
                        }
                        List<string> uploadedFiles = new List<string>();



                        var image = System.Drawing.Image.FromStream(Request.Form.Files[i].OpenReadStream());
                        var resized = new Bitmap(image, new System.Drawing.Size(400, 400));

                        using var imageStream = new MemoryStream();
                        resized.Save(imageStream, ImageFormat.Jpeg);
                        var imageBytes = imageStream;
                        string sql = "";

                        if (id != 0)
                        {
                            sql += $@"select Top(1) OfferingID from tbl_OfferingModel where StatusID =5 and id='" + id + "' order by id desc  ";

                        }
                        else
                        {
                            sql += $@"select Top(1) OfferingID from tbl_OfferingModel where StatusID =5  order by id desc  ";
                        }
                        string ext = "";
                        if (ctr == 0)
                        {
                            ext = "";
                        }
                        else
                        {
                            ext = "(" + ctr + ")";
                        }
                        DataTable table = db.SelectDb(sql).Tables[0];
                        string str = table.Rows[0]["OfferingID"].ToString() + ext;
                        //var id = table.Rows[0]["OfferingID"].ToString();
                        string getextension = Path.GetExtension(Request.Form.Files[i].FileName);
                        string MyUserDetailsIWantToAdd = str + getextension;

                        img += "https://www.alfardanoysterprivilegeclub.com/assets/img/" + MyUserDetailsIWantToAdd + ";";

                        string file = Path.Combine(uploadsFolder, MyUserDetailsIWantToAdd);
                        FileInfo f1 = new FileInfo(file);
                        if (f1.Exists)
                        {
                            f1.Delete();
                        }

                        stream = new FileStream(file, FileMode.Create);
                        await Request.Form.Files[i].CopyToAsync(stream);
                        //if (!System.IO.File.Exists(file))
                        //{
                        //    System.IO.FileStream f = System.IO.File.Create(file);
                        //    f.Close();
                        //}
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
        public IActionResult DownloadHeader()
        {
            //string action = "Deleted";
            //string action = data.Id == 0 ? "Added New" : "Updated";
            dbmet.InsertAuditTrail("User Id: " + HttpContext.Session.GetString("Id") +
               "Downloaded Header", DateTime.Now.ToString(),
               "CMS-Offering",
               HttpContext.Session.GetString("Name"),
               HttpContext.Session.GetString("Id"),
               "2",
               HttpContext.Session.GetString("EmployeeID"));
            var stream = new MemoryStream();
            using (var pck = new ExcelPackage(stream))
            {
                ExcelWorksheet ws = pck.Workbook.Worksheets.Add("Sheet 1");
                ws.Cells["A1"].Value = "Offering Name";
                ws.Cells["B1"].Value = "Promo Description";
                ws.Cells["C1"].Value = "Vendor Name";
                ws.Cells["D1"].Value = "Vendor Id";
                ws.Cells["E1"].Value = "Business Type";
                ws.Cells["F1"].Value = "Business Type Id";
                ws.Cells["G1"].Value = "Membership Tier";
                ws.Cells["H1"].Value = "Membership Id";
                ws.Cells["I1"].Value = "Offering URL";
                ws.Cells["J1"].Value = "Start Date";
                ws.Cells["K1"].Value = "End Date";
                ws.Cells["L1"].Value = "From Time";
                ws.Cells["M1"].Value = "To Time";
                ws.Cells["N1"].Value = "Offer Days";

                ws.Cells["P1"].Style.Font.Italic = true;
                ws.Cells["P1"].Style.Font.Color.SetColor(Color.Red);
                ws.Cells["Q1"].Value = "All Fields are required";
                ws.Cells["Q1"].Style.Font.Italic = true;
                ws.Cells["Q1"].Style.Font.Color.SetColor(Color.Red);
                ws.Cells.Style.Locked = false;
                //ws.Column(4).Style.Locked = true;
                //ws.Column(6).Style.Locked = true;
                //ws.Column(8).Style.Locked = true;
                //ws.Column(21).Style.Locked = true;
                //ws.Column(22).Style.Locked = true;
                //ws.Column(23).Style.Locked = true;
                //ws.Column(24).Style.Locked = true;
                //ws.Column(25).Style.Locked = true;
                //ws.Column(26).Style.Locked = true;
                //// Protect the worksheet with a password
                //ws.Protection.SetPassword("12345"); // Set a password
                //ws.Protection.IsProtected = true;  // Enable protection
                // Lock and hide specific columns
                

                // Enable worksheet protection (Required for Locking to take effect)
                ws.Protection.IsProtected = true;
                ws.Protection.SetPassword("yourpassword"); // Optional: Set a password
                //Start MembershipModel Tier Dropdown
                ws.Cells["U1"].Value = "Membership Name";
                ws.Cells["V1"].Value = "Membership Id";
                
                for (var col = 1; col <= 7; col++)
                {
                    ws.Cells[1, col].Style.Font.Bold = true;
                }
                string sqlTier = $@"SELECT        
	                                    tbl_MembershipModel.Id
	                                    , tbl_MembershipModel.Name AS MembershipName
                                    FROM tbl_MembershipModel 
                                    WHERE        
	                                    (tbl_MembershipModel.Status = 5) or tbl_MembershipModel.Id = 10
                                    ORDER BY tbl_MembershipModel.Name asc";
                DataTable dt = db.SelectDb(sqlTier).Tables[0];
                int ctr = 2;
                var validation = ws.DataValidations.AddListValidation("G2:G1000");
                foreach (DataRow dr in dt.Rows)
                {
                   
                    ws.Cells["U" + ctr].Value = dr["MembershipName"].ToString();
                    ws.Cells["V" + ctr].Value = dr["Id"].ToString();
                    // Add a dropdown list in A2 (below the header)

                    validation.Formula.Values.Add(dr["MembershipName"].ToString());
                    ctr++;
                }
                validation.ShowErrorMessage = true;
                validation.ErrorTitle = "Invalid Selection";
                validation.Error = "Please select a valid option from the dropdown list.";
                int ctrTierId = 1000;
                for (int i = 2; i < ctrTierId; i++) {

                    ws.Cells["H" + i].Formula = "=IFERROR(VLOOKUP(G" + i + ",U2:V8,2,FALSE),0)";
                }
                //End MembershipModel Tier Dropdown
                //Start Vendor Name Dropdown
                ws.Cells["W1"].Value = "Vendor Name";
                ws.Cells["X1"].Value = "Vendor Id";
               
                for (var col = 1; col <= 7; col++)
                {
                    ws.Cells[1, col].Style.Font.Bold = true;
                }
                // Step 1: Fetch vendor data from the database
                string sqlVendor = $@"SELECT   
                            tbl_VendorModel.Id,
                            tbl_VendorModel.VendorName
                        FROM           
                            tbl_VendorModel 
                        WHERE        
                            (tbl_VendorModel.Status = 5)
                        ORDER BY 
                            tbl_VendorModel.VendorName ASC";

                DataTable dtVendor = db.SelectDb(sqlVendor).Tables[0];

                // Step 2: Store vendor names in a separate column (hidden or separate sheet)
                int ctrVendor = 2; // Start from row 2 (assuming row 1 is a header)
                foreach (DataRow drVendor in dtVendor.Rows)
                {
                    ws.Cells["W" + ctrVendor].Value = drVendor["VendorName"].ToString(); // Store Vendor Names in Column W
                    ws.Cells["X" + ctrVendor].Value = drVendor["Id"].ToString(); // Store Vendor IDs in Column X
                    ctrVendor++;
                }

                // Step 3: Create a Named Range for the Vendor List
                string namedRange = "VendorList";
                ws.Names.Add(namedRange, ws.Cells[$"W2:W{ctrVendor - 1}"]); // Exclude empty cells

                // Step 4: Apply Data Validation using Named Range
                var validationVendor = ws.DataValidations.AddListValidation("C2:C1000");
                validationVendor.Formula.ExcelFormula = namedRange; // Use Named Range instead of direct values
                validationVendor.ShowErrorMessage = true;
                validationVendor.ErrorTitle = "Invalid Selection";
                validationVendor.Error = "Please select a valid option from the dropdown list.";
                int ctrVendorId = 1000;
                for (int i = 2; i < ctrVendorId; i++)
                {

                    ws.Cells["D" + i].Formula = "=IFERROR(VLOOKUP(C" + i + ",W2:X8,2,FALSE),0)";
                }
                //End Vendor Name Dropdown
                //Start BT Dropdown
                ws.Cells["Y1"].Value = "Business Type";
                ws.Cells["Z1"].Value = "Business Type Id";
               
                for (var col = 1; col <= 7; col++)
                {
                    ws.Cells[1, col].Style.Font.Bold = true;
                }
                // Step 1: Fetch vendor data from the database
                string sqlBT = $@"SELECT   
                                    tbl_businesstypemodel.Id,
                                    tbl_businesstypemodel.businesstypename
                                FROM           
                                    tbl_businesstypemodel
                                WHERE        
                                    (tbl_businesstypemodel.Status = 5)
                                ORDER BY 
                                    tbl_businesstypemodel.businesstypename ASC";

                DataTable dtBT = db.SelectDb(sqlBT).Tables[0];

                // Step 2: Store vendor names in a separate column (hidden or separate sheet)
                int ctrBT = 2; // Start from row 2 (assuming row 1 is a header)
                foreach (DataRow drBT in dtBT.Rows)
                {
                    ws.Cells["Y" + ctrBT].Value = drBT["businesstypename"].ToString(); // Store Vendor Names in Column W
                    ws.Cells["Z" + ctrBT].Value = drBT["Id"].ToString(); // Store Vendor IDs in Column X
                    ctrBT++;
                }

                // Step 3: Create a Named Range for the Vendor List
                string namedRangeBT = "businesstypename";
                ws.Names.Add(namedRangeBT, ws.Cells[$"Y2:Y{ctrBT - 1}"]); // Exclude empty cells

                // Step 4: Apply Data Validation using Named Range
                var validationBT = ws.DataValidations.AddListValidation("E2:E1000");
                validationBT.Formula.ExcelFormula = namedRangeBT; // Use Named Range instead of direct values
                validationBT.ShowErrorMessage = true;
                validationBT.ErrorTitle = "Invalid Selection";
                validationBT.Error = "Please select a valid option from the dropdown list.";
                int ctrBTId = 1000;
                for (int i = 2; i < ctrBTId; i++)
                {

                    ws.Cells["F" + i].Formula = "=IFERROR(VLOOKUP(E" + i + ",Y2:Z8,2,FALSE),0)";
                }
                //End BT Dropdown
                
                // Step 1: Apply Date Validation (Excel will show a Date Picker)
                var dateValidation = ws.DataValidations.AddDateTimeValidation("j2:j1000");
                var dateValidation2 = ws.DataValidations.AddDateTimeValidation("k2:k1000");
                dateValidation.ShowErrorMessage = true;
                dateValidation.ErrorTitle = "Invalid Date!";
                dateValidation.Error = "Please enter a valid date using the date picker."; 
                dateValidation2.ShowErrorMessage = true;
                dateValidation2.ErrorTitle = "Invalid Date!";
                dateValidation2.Error = "Please enter a valid date using the date picker.";

                // Step 2: Ensure Only Valid Dates Are Allowed (Optional)
                dateValidation.Formula.Value = new DateTime(2020, 1, 1);  // Earliest date allowed
                dateValidation.Formula2.Value = new DateTime(2030, 12, 31); // Latest date allowed
                dateValidation2.Formula.Value = new DateTime(2020, 1, 1);  // Earliest date allowed
                dateValidation2.Formula2.Value = new DateTime(2030, 12, 31); // Latest date allowed

                // Step 3: Format the Column as a Date (Required for Date Picker)
                ws.Column(10).Style.Numberformat.Format = "yyyy-mm-dd"; // Column C as Date format
                ws.Column(11).Style.Numberformat.Format = "yyyy-mm-dd"; // Column C as Date format

                // Step 4: (Optional) Set Default Values
                ws.Cells["j2:j1000"].Value = "yyyy-mm-dd"; // Set format date in all cells
                ws.Cells["k2:k1000"].Value = "yyyy-mm-dd"; // Set format date in all cells

                ws.Cells.AutoFitColumns();
                int[] lockedColumns = { 4, 6, 8, 21, 22, 23, 24, 25, 26 };

                int[] hideColumns = { 21, 22, 23, 24, 25, 26 };
                foreach (int col in lockedColumns)
                {
                    ws.Column(col).Style.Locked = true; // Lock column
                }
                foreach (int col in hideColumns)
                {
                    ws.Column(col).Hidden = true;       // Hide column
                }
                pck.Save();
            }

            stream.Position = 0;
            string excelName = "Offering-Registration-Template.xlsx";
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
        }

        [HttpPost]
        public async Task<IActionResult> Index(IFormFile file, [FromServices] IWebHostEnvironment hostingEnvironment)
        {
            System.Text.Encoding.RegisterProvider(
           System.Text.CodePagesEncodingProvider.Instance);

            if (file == null)
            {
                ViewData["Message"] = "Error: Please select a file.";
            }
            else
            {
                if (file.FileName.EndsWith("xls") || file.FileName.EndsWith("xlsx"))
                {
                    if (file.FileName.Contains("Offering-Registration-Template"))
                    {

                        ViewData["Message"] = "Error: Invalid file.";
                        string filename = $"{hostingEnvironment.WebRootPath}\\excel\\{file.FileName}";
                        using (FileStream fileStream = System.IO.File.Create(filename))
                        {
                            file.CopyTo(fileStream);
                            fileStream.Flush();
                        }

                        IExcelDataReader reader = null;
                        FileStream stream = System.IO.File.Open(filename, FileMode.Open, FileAccess.Read);
                        StreamReader sr = new StreamReader(stream);
                        if (file.FileName.EndsWith("xls"))
                        {
                            reader = ExcelReaderFactory.CreateBinaryReader(stream);

                        }
                        if (file.FileName.EndsWith("xlsx"))
                        {
                            reader = ExcelReaderFactory.CreateOpenXmlReader(stream);

                        }
                        int i = 0;

                        var data = new List<OfferingVM>();

                        while (reader.Read())
                        {
                            i++;

                            if (i > 1)
                            {
                                if (reader.GetValue(1) != null)
                                {
                                    string sql = $@"SELECT Id FROM tbl_OfferingModel where OfferingName ='" + reader.GetValue(1).ToString() + "'";
                                    DataTable dt = db.SelectDb(sql).Tables[0];
                                    var memid = "";
                                    if (dt.Rows.Count > 0)
                                    {
                                        memid = dt.Rows[0]["Id"].ToString();
                                    }
                                    string OfferingName = reader.GetValue(0) == null ? "none" : reader.GetValue(0).ToString();
                                    string PromoDesc = reader.GetValue(1) == null ? "none" : reader.GetValue(1).ToString();
                                    string VendorName = reader.GetValue(2) == null ? "none" : reader.GetValue(2).ToString();
                                    string VendorID = reader.GetValue(3) == null ? "0" : reader.GetValue(3).ToString();
                                    string BusinessTypeName = reader.GetValue(4) == null ? "none" : reader.GetValue(4).ToString();
                                    string BusinessTypeID = reader.GetValue(5) == null ? "0" : reader.GetValue(5).ToString();
                                    string MembershipName = reader.GetValue(6) == null ? "none" : reader.GetValue(6).ToString();
                                    string MembershipID = reader.GetValue(7) == null ? "0" : reader.GetValue(7).ToString();
                                    string URL = reader.GetValue(8) == null ? "none" : reader.GetValue(8).ToString();
                                    string StartDateTime = reader.GetValue(9) == null ? "none" : reader.GetValue(9).ToString();
                                    string EndDateTime = reader.GetValue(10) == null ? "none" : reader.GetValue(10).ToString();
                                    string FromTime = reader.GetValue(11) == null ? "none" : reader.GetValue(11).ToString();
                                    string ToTime = reader.GetValue(12) == null ? "none" : reader.GetValue(12).ToString();
                                    string Offerdays = reader.GetValue(13) == null ? "none" : reader.GetValue(13).ToString();


                                    data.Add(new OfferingVM
                                    {
                                        OfferingName = OfferingName,
                                        PromoDesc = PromoDesc,
                                        VendorName = VendorName,
                                        VendorID = VendorID,
                                        BusinessTypeName = BusinessTypeName,
                                        BusinessTypeID = BusinessTypeID,
                                        MembershipName = MembershipName,
                                        MembershipID = MembershipID,
                                        URL = URL,
                                        StartDateTime = StartDateTime,
                                        EndDateTime = EndDateTime,
                                        FromTime = FromTime,
                                        ToTime = ToTime,
                                        Offerdays = Offerdays,
                                        Id = 0,
                                        Status = "5"

                                    });
                                }
                            }
                        }
                        reader.Close();

                        //Send Data to API
                        var status = "";
                        HttpClient client = new HttpClient();
                        var url = DBConn.HttpString + "/api/ApiOffering/ImportOffering";
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
                        StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                        using (var response = await client.PostAsync(url, content))
                        {
                            _global.Status = await response.Content.ReadAsStringAsync();
                        }
                        System.IO.File.Delete(filename);
                        ViewData["Message"] = "New Entry" + _global.Status;
                    }
                    else
                    {
                        ViewData["Message"] = "Error: Invalid file.";
                    }
                }
                else
                {
                    ViewData["Message"] = "Error: User Invalid file.";
                }
            }
            return View("Index");
        }
        public IActionResult Index()
        {
            string token = HttpContext.Session.GetString("Bearer");
            if (token == null)
            {
                return RedirectToAction("Index", "LogIn");
            }
            return View();
        }
        
    }
}
