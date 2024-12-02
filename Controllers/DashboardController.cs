﻿using AuthSystem.Areas.Identity.Data;
using AuthSystem.Models;
using AOPC_CMSv2.ViewModel;
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
using _CMS.Manager;
using ExcelDataReader;
using System.Collections.Generic;
using OfficeOpenXml.Style;
using OfficeOpenXml;
using System.ComponentModel;
using System.Drawing;
using Net.SourceForge.Koogra.Excel2007.OX;
using static AOPC.Controllers.RegisterController;
using static AOPC.Controllers.VendorController;
using OfficeOpenXml.DataValidation;
using static NPOI.HSSF.Util.HSSFColor;
using static AOPC.Controllers.CMSController;

namespace AOPC.Controllers
{
    public class DashboardController : Controller
    {
        string status = "";
        private readonly QueryValueService token;
        private readonly AppSettings _appSettings;
        private ApiGlobalModel _global = new ApiGlobalModel();
        private GlobalService _globalService;
        DbManager db = new DbManager();
        public readonly QueryValueService token_;
        private readonly UserManager<ApplicationUser> _userManager;
        private IConfiguration _configuration;
        private string apiUrl = "http://";
        public DashboardController(IOptions<AppSettings> appSettings, GlobalService globalService,
                  UserManager<ApplicationUser> userManager, QueryValueService _token,
                  IHttpContextAccessor contextAccessor,
                  IConfiguration configuration)
        {
            _userManager = userManager;
            token_ = _token;
            _configuration = configuration;
            apiUrl = _configuration.GetValue<string>("AppSettings:WebApiURL");
            _appSettings = appSettings.Value;
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
        public IActionResult CorporateDashboard()
        {
            string token = HttpContext.Session.GetString("Bearer");
            if (token == null)
            {
                return RedirectToAction("Index", "LogIn");
            }
            return View("CorporateDashboard");
        }
        [HttpPost]
        public async Task<IActionResult> GetAllUserCount(UserFilterUsername data)
        {
            string result = "";
            var list = new List<UserCountListing>();
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiCorporateListing/GetAllUserCount";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    string res = await response.Content.ReadAsStringAsync();
                    list = JsonConvert.DeserializeObject<List<UserCountListing>>(res);

                }
            }

            catch (Exception ex)
            {
                string status = ex.GetBaseException().ToString();
            }
            return Json(list);
        }



        public class NotificationPaginateModel
        {
            public string? CurrentPage { get; set; }
            public string? NextPage { get; set; }
            public string? PrevPage { get; set; }
            public string? TotalPage { get; set; }
            public string? PageSize { get; set; }
            public string? TotalRecord { get; set; }
            public List<NotificationVM> items { get; set; }


        }
        [HttpPost]
        public async Task<IActionResult> GetDataNotification(paginate data)
        {
            string result = "";
            var list = new List<NotificationPaginateModel>();
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiPagination/NotificationPaginate";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    string res = await response.Content.ReadAsStringAsync();
                    list = JsonConvert.DeserializeObject<List<NotificationPaginateModel>>(res);

                }
            }

            catch (Exception ex)
            {
                string status = ex.GetBaseException().ToString();
            }
            return Json(list);
        }
        [HttpGet]
        public async Task<JsonResult> GetNewRegisteredWeekly()
        {
            var url = DBConn.HttpString + "/api/ApiSupport/GetNewRegisteredWeekly";
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            string response = await client.GetStringAsync(url);
            List<Usertotalcount> models = JsonConvert.DeserializeObject<List<Usertotalcount>>(response);
            return new(models);
        }
        [HttpGet]
        public async Task<JsonResult> GetCountAllUser()
        {
            var url = DBConn.HttpString + "/api/ApiSupport/GetCountAllUserlist  ";
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            string response = await client.GetStringAsync(url);
            List<Usertotalcount> models = JsonConvert.DeserializeObject<List<Usertotalcount>>(response);
            return new(models);
        }
        public class UserFilterDateRange
        {
            public int day { get; set; }
            public string? startdate { get; set; }
            public string? enddate { get; set; }

        }
        [HttpPost]
        public async Task<IActionResult> PostCountAllUser(UserFilterDateRange data)
        {
            string result = "";
            var list = new List<Usertotalcount>();
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiSupport/PostNewRegistered";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    string res = await response.Content.ReadAsStringAsync();

                    list = JsonConvert.DeserializeObject<List<Usertotalcount>>(res);

                }
            }

            catch (Exception ex)
            {
                string status = ex.GetBaseException().ToString();
            }
            return Json(list);
        }

        [HttpGet]
        public async Task<JsonResult> GetClickCounts()
        {
            var url = DBConn.HttpString + "/api/ApiSupport/GetClickCountsListAll";
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            string response = await client.GetStringAsync(url);
            List<ClicCountModel> models = JsonConvert.DeserializeObject<List<ClicCountModel>>(response);
            return new(models.ToList().Take(2));
            //return Json(new { draw = 1, data = models, recordFiltered = models?.Count, recordsTotal = models?.Count });
        }
        [HttpPost]
        public async Task<IActionResult> PostMostClickCounts(UserFilterDateRange data)
        {

            string result = "";
            var list = new List<ClicCountModel>();
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiSupport/GetClickCountsListAll ";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    string res = await response.Content.ReadAsStringAsync();
                    list = JsonConvert.DeserializeObject<List<ClicCountModel>>(res);

                }
            }

            catch (Exception ex)
            {
                string status = ex.GetBaseException().ToString();
            }
            //return Json(list);
            return Json(new { draw = 1, data = list, recordFiltered = list?.Count, recordsTotal = list?.Count });
        }
        [HttpGet]
        public async Task<JsonResult> GetClickCountsGetAll()
        {
            var url = DBConn.HttpString + "/api/ApiSupport/GetClickCountsListAll";
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            string response = await client.GetStringAsync(url);
            List<ClicCountModel> models = JsonConvert.DeserializeObject<List<ClicCountModel>>(response);
            return new(models);
        }

        [HttpGet]
        public async Task<JsonResult> GetSuppoprtCount()
        {
            var url = DBConn.HttpString + "/api/ApiSupport/GetSupportCountList ";
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            string response = await client.GetStringAsync(url);
            List<SupportModel> models = JsonConvert.DeserializeObject<List<SupportModel>>(response);
            return new(models);
        }
        [HttpGet]
        public async Task<JsonResult> GetCallToAction()
        {
            var url = DBConn.HttpString + "/api/ApiSupport/GetCallToActionsList ";
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            string response = await client.GetStringAsync(url);
            List<CallToActionsModel> models = JsonConvert.DeserializeObject<List<CallToActionsModel>>(response);
            return new(models.ToList().Take(5));
        }
        [HttpGet]
        public async Task<JsonResult> GetCallToActionModal()
        {
            var url = DBConn.HttpString + "/api/ApiSupport/GetCallToActionsList ";
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            string response = await client.GetStringAsync(url);
            List<CallToActionsModel> models = JsonConvert.DeserializeObject<List<CallToActionsModel>>(response);
            return new(models);
        }

        [HttpGet]
        public async Task<JsonResult> GetMostClickStore()
        {
            var url = DBConn.HttpString + "/api/ApiSupport/GetMostCickStoreList ";
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            string response = await client.GetStringAsync(url);
            List<MostClickStoreModel> models = JsonConvert.DeserializeObject<List<MostClickStoreModel>>(response);
            return new(models.ToList());
        }
        [HttpGet]
        public async Task<JsonResult> GetMostClickedHospitality()
        {
            var url = DBConn.HttpString + "/api/ApiSupport/GetMostClickedHospitalityList ";
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            string response = await client.GetStringAsync(url);
            List<MostClickHospitalityModel> models = JsonConvert.DeserializeObject<List<MostClickHospitalityModel>>(response);
            return new(models.ToList().Take(4));
        }
        [HttpGet]
        public async Task<JsonResult> GetMostClickStoreAll()
        {
            var url = DBConn.HttpString + "/api/ApiSupport/GetMostCickStoreList ";
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            string response = await client.GetStringAsync(url);
            List<MostClickStoreModel> models = JsonConvert.DeserializeObject<List<MostClickStoreModel>>(response);
            return new(models);
        }
        [HttpGet]
        public async Task<JsonResult> GetMostClickedHospitalityAll()
        {
            var url = DBConn.HttpString + "/api/ApiSupport/GetMostClickedHospitalityList";
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            string response = await client.GetStringAsync(url);
            List<MostClickStoreModel> models = JsonConvert.DeserializeObject<List<MostClickStoreModel>>(response);
            return new(models);
        }
        [HttpGet]
        public async Task<JsonResult> GetMostClickRestaurant()
        {
            var url = DBConn.HttpString + "/api/ApiSupport/GetMostClickRestaurantList ";
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            string response = await client.GetStringAsync(url);
            List<MostClickHospitalityModel> models = JsonConvert.DeserializeObject<List<MostClickHospitalityModel>>(response);
            return new(models.ToList().Take(4));
        }
        [HttpGet]
        public async Task<JsonResult> GetMostClickRestaurantAll()
        {
            var url = DBConn.HttpString + "/api/ApiSupport/GetMostClickRestaurantList ";
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            string response = await client.GetStringAsync(url);
            List<MostClickHospitalityModel> models = JsonConvert.DeserializeObject<List<MostClickHospitalityModel>>(response);
            return new(models);
        }
        [HttpGet]
        public async Task<JsonResult> GetQrTrail()
        {
            var url = DBConn.HttpString + "/api/AuditTrail/QRTrailList";
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            string response = await client.GetStringAsync(url);
            List<QrTrailVM> models = JsonConvert.DeserializeObject<List<QrTrailVM>>(response);
            //return new(models);
            return Json(new { draw = 1, data = models, recordFiltered = models?.Count, recordsTotal = models?.Count });
        }
        [HttpGet]
        public async Task<JsonResult> GetSupportDetails()
        {
            var url = DBConn.HttpString + "/api/ApiSupport/GetSupportDetailsList";
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            string response = await client.GetStringAsync(url);
            List<SupportDetailModel> models = JsonConvert.DeserializeObject<List<SupportDetailModel>>(response);
            //return new(models);
            return Json(new { draw = 1, data = models, recordFiltered = models?.Count, recordsTotal = models?.Count });
        }
        [HttpGet]
        public async Task<JsonResult> GetNotification()
        {
            var url = DBConn.HttpString + "/api/ApiNotifcation/NotificationList";
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            string response = await client.GetStringAsync(url);
            List<NotificationVM> models = JsonConvert.DeserializeObject<List<NotificationVM>>(response);
            //return new(models);
            return Json(new { draw = 1, data = models, recordFiltered = models?.Count, recordsTotal = models?.Count });
        }
        [HttpGet]
        public async Task<JsonResult> GetLineGraphCount()
        {
            var url = DBConn.HttpString + "/api/ApiSupport/GetLineGraphCountList";
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            string response = await client.GetStringAsync(url);
            List<UserCountLineGraphModel> models = JsonConvert.DeserializeObject<List<UserCountLineGraphModel>>(response);
            return new(models);
        }
        public IActionResult QrTrailIndex()
        {
            string token = HttpContext.Session.GetString("Bearer");
            if (token == null)
            {
                return RedirectToAction("Index", "LogIn");
            }
            return View();
        }
        public IActionResult SupportIndex()
        {
            string token = HttpContext.Session.GetString("Bearer");
            if (token == null)
            {
                return RedirectToAction("Index", "LogIn");
            }
            return View();
        }
        public IActionResult NotificationIndex()
        {
            string token = HttpContext.Session.GetString("Bearer");
            if (token == null)
            {
                return RedirectToAction("Index", "LogIn");
            }
            return View();
        }
        #region POST
        [HttpPost]
        public async Task<IActionResult> PostNewRegisteredCount(UserFilterday data)
        {

            string result = "";
            var list = new List<Usertotalcount>();
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiSupport/PostNewRegistered ";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    string res = await response.Content.ReadAsStringAsync();
                    list = JsonConvert.DeserializeObject<List<Usertotalcount>>(res);

                }
            }

            catch (Exception ex)
            {
                string status = ex.GetBaseException().ToString();
            }
            return Json(list);
        }
        public class SupportID
        {

            public string Id { get; set; }
            public string status { get; set; }
        }
        public class Registerstats
        {
            public string Status { get; set; }

        }
        [HttpPost]
        public async Task<IActionResult> UpdateStatsSupport(SupportID data)
        {
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiSupport/UpdateSupportStatus";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    _global.Status = await response.Content.ReadAsStringAsync();
                    status = JsonConvert.DeserializeObject<Registerstats>(_global.Status).Status;
                }
            }

            catch (Exception ex)
            {
                string status = ex.GetBaseException().ToString();
            }
            return Json(new { stats = status });
        }
        [HttpPost]
        public async Task<IActionResult> PostEmail(emailpost data)
        {

            string result = "";
            var list = new List<emailpost>();
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiSupport/PostEmailbyEmpID ";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    string res = await response.Content.ReadAsStringAsync();
                    list = JsonConvert.DeserializeObject<List<emailpost>>(res);

                }
            }

            catch (Exception ex)
            {
                string status = ex.GetBaseException().ToString();
            }
            return Json(list);
        }

        public IActionResult DownloadCalltoActionExcel()
        {
            var stream = new MemoryStream();
            using (var pck = new ExcelPackage(stream))
            {
                ExcelWorksheet ws = pck.Workbook.Worksheets.Add("Sheet 1");
                ws.Cells["A:AZ"].Style.Font.Size = 11;
                ws.Cells["A8:E8"].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                ws.Cells["A8:E8"].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                ws.Cells["A8:E8"].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                ws.Cells["A8:E8"].Style.Border.Left.Style = ExcelBorderStyle.Thin;


                ws.Cells["A1"].Value = "Call to Action Report";
                ws.Cells[1, 1].Style.Font.Bold = true;
                ws.Cells[1, 1].Style.Font.SetFromFont(new System.Drawing.Font("Arial Black", 22));

                ws.Cells["A3"].Value = "User:                      " + HttpContext.Session.GetString("Name");
                //ws.Cells["B3"].Value = ;
                ws.Cells["A4"].Value = "Date Printed:     " + DateTime.Now.ToString("yyyy-MM-dd"); ;
                //ws.Cells["B4"].Value =

                ws.Cells["A8"].Value = "Name";
                ws.Cells["B8"].Value = "Categories";
                ws.Cells["C8"].Value = "Call";
                ws.Cells["D8"].Value = "Email";
                ws.Cells["E8"].Value = "Book";
                for (var col = 1; col <= 10; col++)
                {
                    ws.Cells[1, col].Style.Font.Bold = true;
                }
                string sql = $@"SELECT        Mail.Business, Mail.Email, Call.Call, Book.Book, Category.Module AS Category, Book.DateCreated
                             FROM            (SELECT        Business, COUNT(*) AS Email, DateCreated
                             FROM            tbl_audittrailModel
                             WHERE        (Module = 'Mail')
                             GROUP BY Business, DateCreated) AS Mail LEFT OUTER JOIN
                             (SELECT        Business, COUNT(*) AS Call, DateCreated
                             FROM            tbl_audittrailModel AS tbl_audittrailModel_1
                             WHERE        (Module = 'Call')
                             GROUP BY Business, DateCreated) AS Call ON Mail.Business = Call.Business LEFT OUTER JOIN
                             (SELECT        Business, COUNT(*) AS Book, DateCreated
                             FROM            tbl_audittrailModel AS tbl_audittrailModel_1
                             WHERE        (Module = 'Book')
                             GROUP BY Business, DateCreated) AS Book ON Call.Business = Book.Business LEFT OUTER JOIN
                             (SELECT        Business, Module
                             FROM            tbl_audittrailModel AS tbl_audittrailModel_1
                             WHERE       Module='Hotel' or Module='Food & Beverage'  or Module='Access to co-working spaces'  or Module='Health'  or Module='Shops & Services'  or Module='Shops & Services' or Module='News' 
                             GROUP BY Business, Module) AS Category ON Book.Business = Category.Business
                             ORDER BY Mail.Email DESC";
                DataTable dt = db.SelectDb(sql).Tables[0];
                int ctr = 9;
                foreach (DataRow dr in dt.Rows)
                {
                    ws.Cells[ctr, 1].Value = dr["Business"].ToString();
                    ws.Cells[ctr, 2].Value = dr["Category"].ToString();
                    ws.Cells[ctr, 3].Value = dr["Email"].ToString();
                    ws.Cells[ctr, 4].Value = dr["Call"].ToString();
                    ws.Cells[ctr, 5].Value = dr["Book"].ToString();
                    ws.Cells["A" + ctr + ":E" + ctr].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    ctr++;
                }
                ws.Cells.AutoFitColumns();
                pck.Save();
            }

            stream.Position = 0;
            string excelName = "" + HttpContext.Session.GetString("CorporateName") + "-AOPC-Call to Action Result.xlsx";
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
        }
        public IActionResult DownloadNewsFeedClick()
        {
            var stream = new MemoryStream();
            using (var pck = new ExcelPackage(stream))
            {
                ExcelWorksheet ws = pck.Workbook.Worksheets.Add("Sheet 1");
                ws.Cells["A:AZ"].Style.Font.Size = 11;
                ws.Cells["A8:E8"].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                ws.Cells["A8:E8"].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                ws.Cells["A8:E8"].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                ws.Cells["A8:E8"].Style.Border.Left.Style = ExcelBorderStyle.Thin;


                ws.Cells["A1"].Value = "News Feed Clicks Report";
                ws.Cells[1, 1].Style.Font.Bold = true;
                ws.Cells[1, 1].Style.Font.SetFromFont(new System.Drawing.Font("Arial Black", 22));

                ws.Cells["A3"].Value = "User:                      " + HttpContext.Session.GetString("Name");
                //ws.Cells["B3"].Value = ;
                ws.Cells["A4"].Value = "Date Printed:     " + DateTime.Now.ToString("yyyy-MM-dd"); ;
                //ws.Cells["B4"].Value =

                ws.Cells["A8"].Value = "Name";
                ws.Cells["B8"].Value = "Categories";
                ws.Cells["C8"].Value = "Call";
                ws.Cells["D8"].Value = "Email";
                ws.Cells["E8"].Value = "Book";
                for (var col = 1; col <= 10; col++)
                {
                    ws.Cells[1, col].Style.Font.Bold = true;
                }
                string sql = $@"SELECT        Mail.Business, Mail.Email, Call.Call, Book.Book, Category.Module AS Category, Book.DateCreated
                             FROM            (SELECT        Business, COUNT(*) AS Email, DateCreated
                             FROM            tbl_audittrailModel
                             WHERE        (Module = 'Mail')
                             GROUP BY Business, DateCreated) AS Mail LEFT OUTER JOIN
                             (SELECT        Business, COUNT(*) AS Call, DateCreated
                             FROM            tbl_audittrailModel AS tbl_audittrailModel_1
                             WHERE        (Module = 'Call')
                             GROUP BY Business, DateCreated) AS Call ON Mail.Business = Call.Business LEFT OUTER JOIN
                             (SELECT        Business, COUNT(*) AS Book, DateCreated
                             FROM            tbl_audittrailModel AS tbl_audittrailModel_1
                             WHERE        (Module = 'Book')
                             GROUP BY Business, DateCreated) AS Book ON Call.Business = Book.Business LEFT OUTER JOIN
                             (SELECT        Business, Module
                             FROM            tbl_audittrailModel AS tbl_audittrailModel_1
                             WHERE       Module='Hotel' or Module='Food & Beverage'  or Module='Access to co-working spaces'  or Module='Health'  or Module='Shops & Services'  or Module='Shops & Services' or Module='News' 
                             GROUP BY Business, Module) AS Category ON Book.Business = Category.Business
                             ORDER BY Mail.Email DESC";
                DataTable dt = db.SelectDb(sql).Tables[0];
                int ctr = 9;
                foreach (DataRow dr in dt.Rows)
                {
                    ws.Cells[ctr, 1].Value = dr["Business"].ToString();
                    ws.Cells[ctr, 2].Value = dr["Category"].ToString();
                    ws.Cells[ctr, 3].Value = dr["Email"].ToString();
                    ws.Cells[ctr, 4].Value = dr["Call"].ToString();
                    ws.Cells[ctr, 5].Value = dr["Book"].ToString();
                    ws.Cells["A" + ctr + ":E" + ctr].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    ctr++;
                }
                ws.Cells.AutoFitColumns();
                pck.Save();
            }

            stream.Position = 0;
            string excelName = "" + HttpContext.Session.GetString("CorporateName") + "-AOPC-Call to Action Reports.xlsx";
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
        }
        public IActionResult DownloadMSC()
        {
            var stream = new MemoryStream();
            using (var pck = new ExcelPackage(stream))
            {
                ExcelWorksheet ws = pck.Workbook.Worksheets.Add("Sheet 1");
                ws.Cells["A:AZ"].Style.Font.Size = 11;
                ws.Cells["A6:B6"].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:B6"].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:B6"].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:B6"].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:B6"].Style.Font.Bold = true;


                ws.Cells["A1"].Value = "Most Click Store Report";
                ws.Cells[1, 1].Style.Font.Bold = true;
                ws.Cells[1, 1].Style.Font.SetFromFont(new System.Drawing.Font("Arial Black", 22));

                ws.Cells["A3"].Value = "User:                      " + HttpContext.Session.GetString("Name");
                //ws.Cells["B3"].Value = ;
                ws.Cells["A4"].Value = "Date Printed:     " + DateTime.Now.ToString("yyyy-MM-dd"); ;
                //ws.Cells["B4"].Value =

                ws.Cells["A6"].Value = "Module";
                ws.Cells["B6"].Value = "Number of Clicks";
                for (var col = 1; col <= 10; col++)
                {
                    ws.Cells[1, col].Style.Font.Bold = true;
                }

                string sql = $@"SELECT Business, Count(*) as count FROM tbl_audittrailModel
                         WHERE Actions LIKE '%view%'  and Module ='news' and Business <> '' GROUP BY Business order by count desc";
                DataTable dt = db.SelectDb(sql).Tables[0];
                int ctr = 7;
                foreach (DataRow dr in dt.Rows)
                {
                    ws.Cells[ctr, 1].Value = dr["Business"].ToString();
                    ws.Cells[ctr, 2].Value = dr["count"].ToString();
                    ws.Cells["A" + ctr + ":B" + ctr].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    ctr++;
                }
                ws.Cells.AutoFitColumns();
                pck.Save();
            }

            stream.Position = 0;
            string excelName = "" + HttpContext.Session.GetString("CorporateName") + "-AOPC-Most Click Store Reports.xlsx";
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
        }
        public IActionResult DownloadMCS()
        {
            var stream = new MemoryStream();
            using (var pck = new ExcelPackage(stream))
            {
                ExcelWorksheet ws = pck.Workbook.Worksheets.Add("Sheet 1");
                ws.Cells["A:AZ"].Style.Font.Size = 11;
                ws.Cells["A6:C6"].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:C6"].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:C6"].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:C6"].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:C6"].Style.Font.Bold = true;


                ws.Cells["A1"].Value = "Most Click Store Report";
                ws.Cells[1, 1].Style.Font.Bold = true;
                ws.Cells[1, 1].Style.Font.SetFromFont(new System.Drawing.Font("Arial Black", 22));

                ws.Cells["A3"].Value = "User:                      " + HttpContext.Session.GetString("Name");
                //ws.Cells["B3"].Value = ;
                ws.Cells["A4"].Value = "Date Printed:     " + DateTime.Now.ToString("yyyy-MM-dd"); ;
                //ws.Cells["B4"].Value =

                ws.Cells["A6"].Value = "Store";
                ws.Cells["B6"].Value = "Click Counter";
                ws.Cells["C6"].Value = "Total Percentage";
                for (var col = 1; col <= 10; col++)
                {
                    ws.Cells[1, col].Style.Font.Bold = true;
                }

                string sql = $@"SELECT     Count(*)as count, Actions,Business,Module,tbl_audittrailModel.DateCreated
                         FROM         tbl_audittrailModel  WHERE Actions LIKE '%View%' and module ='Shops & Services'
                         GROUP BY    Actions,Business,Module,tbl_audittrailModel.DateCreated order by count desc";
                DataTable dt = db.SelectDb(sql).Tables[0];
                int ctr = 7;
                int total = 0;
                foreach (DataRow dr in dt.Rows)
                {
                    total += int.Parse(dr["count"].ToString());
                }
                foreach (DataRow dr in dt.Rows)
                {
                    ws.Cells[ctr, 1].Value = dr["Business"].ToString();
                    ws.Cells[ctr, 2].Value = dr["count"].ToString();
                    double val1 = double.Parse(dr["count"].ToString());
                    double val2 = double.Parse(total.ToString());

                    double results = val1 / val2 * 100;
                    ws.Cells[ctr, 3].Value = Math.Round(results, 2);
                    ws.Cells["A" + ctr + ":C" + ctr].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    ctr++;
                }
                ws.Cells.AutoFitColumns();
                pck.Save();
            }

            stream.Position = 0;
            string excelName = "" + HttpContext.Session.GetString("CorporateName") + "-AOPC-Most Click Store Reports.xlsx";
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
        }
        public IActionResult DownloadMCH()
        {
            var stream = new MemoryStream();
            using (var pck = new ExcelPackage(stream))
            {
                ExcelWorksheet ws = pck.Workbook.Worksheets.Add("Sheet 1");
                ws.Cells["A:AZ"].Style.Font.Size = 11;
                ws.Cells["A6:C6"].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:C6"].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:C6"].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:C6"].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:C6"].Style.Font.Bold = true;


                ws.Cells["A1"].Value = "Most Click Hospitality Report";
                ws.Cells[1, 1].Style.Font.Bold = true;
                ws.Cells[1, 1].Style.Font.SetFromFont(new System.Drawing.Font("Arial Black", 22));

                ws.Cells["A3"].Value = "User:                      " + HttpContext.Session.GetString("Name");
                //ws.Cells["B3"].Value = ;
                ws.Cells["A4"].Value = "Date Printed:     " + DateTime.Now.ToString("yyyy-MM-dd"); ;
                //ws.Cells["B4"].Value =

                ws.Cells["A6"].Value = "Hospitality";
                ws.Cells["B6"].Value = "Click Count";
                ws.Cells["C6"].Value = "Total Percentage";
                for (var col = 1; col <= 10; col++)
                {
                    ws.Cells[1, col].Style.Font.Bold = true;
                }

                string sql = $@"SELECT     Count(*)as count, Actions,Business,Module,tbl_audittrailModel.DateCreated
                        FROM         tbl_audittrailModel  WHERE Actions LIKE '%Viewed%' and module ='Rooms & Suites' 
                        GROUP BY    Actions,Business,Module,tbl_audittrailModel.DateCreated order by count desc";
                DataTable dt = db.SelectDb(sql).Tables[0];
                int ctr = 7;
                int total = 0;
                foreach (DataRow dr in dt.Rows)
                {
                    total += int.Parse(dr["count"].ToString());
                }
                foreach (DataRow dr in dt.Rows)
                {
                    ws.Cells[ctr, 1].Value = dr["Business"].ToString();
                    ws.Cells[ctr, 2].Value = dr["count"].ToString();
                    double val1 = double.Parse(dr["count"].ToString());
                    double val2 = double.Parse(total.ToString());

                    double results = val1 / val2 * 100;
                    ws.Cells[ctr, 3].Value = Math.Round(results, 2);
                    ws.Cells["A" + ctr + ":C" + ctr].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    ctr++;
                }
                ws.Cells.AutoFitColumns();
                pck.Save();
            }

            stream.Position = 0;
            string excelName = "" + HttpContext.Session.GetString("CorporateName") + "-AOPC-Most Click Hospitality Reports.xlsx";
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
        }
        public IActionResult DownloadMCR()
        {
            var stream = new MemoryStream();
            using (var pck = new ExcelPackage(stream))
            {
                ExcelWorksheet ws = pck.Workbook.Worksheets.Add("Sheet 1");
                ws.Cells["A:AZ"].Style.Font.Size = 11;
                ws.Cells["A6:C6"].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:C6"].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:C6"].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:C6"].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:C6"].Style.Font.Bold = true;


                ws.Cells["A1"].Value = "Most Click Restaurant Report";
                ws.Cells[1, 1].Style.Font.Bold = true;
                ws.Cells[1, 1].Style.Font.SetFromFont(new System.Drawing.Font("Arial Black", 22));

                ws.Cells["A3"].Value = "User:                      " + HttpContext.Session.GetString("Name");
                //ws.Cells["B3"].Value = ;
                ws.Cells["A4"].Value = "Date Printed:     " + DateTime.Now.ToString("yyyy-MM-dd"); ;
                //ws.Cells["B4"].Value =

                ws.Cells["A6"].Value = "Hospitality";
                ws.Cells["B6"].Value = "Click Count";
                ws.Cells["C6"].Value = "Total Percentage";
                for (var col = 1; col <= 10; col++)
                {
                    ws.Cells[1, col].Style.Font.Bold = true;
                }

                string sql = $@"SELECT     Count(*)as count, Actions,Business,Module,tbl_audittrailModel.DateCreated
                        FROM         tbl_audittrailModel  WHERE Actions LIKE '%Viewed%' and module ='Food & Beverage' 
                        GROUP BY    Actions,Business,Module,tbl_audittrailModel.DateCreated order by count desc";
                DataTable dt = db.SelectDb(sql).Tables[0];
                int ctr = 7;
                int total = 0;
                foreach (DataRow dr in dt.Rows)
                {
                    total += int.Parse(dr["count"].ToString());
                }
                foreach (DataRow dr in dt.Rows)
                {
                    ws.Cells[ctr, 1].Value = dr["Business"].ToString();
                    ws.Cells[ctr, 2].Value = dr["count"].ToString();
                    double val1 = double.Parse(dr["count"].ToString());
                    double val2 = double.Parse(total.ToString());

                    double results = val1 / val2 * 100;
                    ws.Cells[ctr, 3].Value = Math.Round(results, 2);
                    ws.Cells["A" + ctr + ":C" + ctr].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    ctr++;
                }
                ws.Cells.AutoFitColumns();
                pck.Save();
            }

            stream.Position = 0;
            string excelName = "" + HttpContext.Session.GetString("CorporateName") + "-AOPC-Most Click Restaurant Reports.xlsx";
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
        }
        public IActionResult DownloadMCW()
        {
            var stream = new MemoryStream();
            using (var pck = new ExcelPackage(stream))
            {
                ExcelWorksheet ws = pck.Workbook.Worksheets.Add("Sheet 1");
                ws.Cells["A:AZ"].Style.Font.Size = 11;
                ws.Cells["A6:C6"].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:C6"].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:C6"].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:C6"].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:C6"].Style.Font.Bold = true;


                ws.Cells["A1"].Value = "Most Click Wellness Report";
                ws.Cells[1, 1].Style.Font.Bold = true;
                ws.Cells[1, 1].Style.Font.SetFromFont(new System.Drawing.Font("Arial Black", 22));

                ws.Cells["A3"].Value = "User:                      " + HttpContext.Session.GetString("Name");
                //ws.Cells["B3"].Value = ;
                ws.Cells["A4"].Value = "Date Printed:     " + DateTime.Now.ToString("yyyy-MM-dd"); ;
                //ws.Cells["B4"].Value =

                ws.Cells["A6"].Value = "Wellness";
                ws.Cells["B6"].Value = "Click Count";
                ws.Cells["C6"].Value = "Total Percentage";
                for (var col = 1; col <= 10; col++)
                {
                    ws.Cells[1, col].Style.Font.Bold = true;
                }

                string sql = $@"SELECT     Count(*)as count, Actions,Business,Module,tbl_audittrailModel.DateCreated
                        FROM         tbl_audittrailModel  WHERE Actions LIKE '%Viewed%' and module ='Wellness' 
                        GROUP BY    Actions,Business,Module,tbl_audittrailModel.DateCreated order by count desc";
                DataTable dt = db.SelectDb(sql).Tables[0];
                int ctr = 7;
                int total = 0;
                foreach (DataRow dr in dt.Rows)
                {
                    total += int.Parse(dr["count"].ToString());
                }
                foreach (DataRow dr in dt.Rows)
                {
                    ws.Cells[ctr, 1].Value = dr["Business"].ToString();
                    ws.Cells[ctr, 2].Value = dr["count"].ToString();
                    double val1 = double.Parse(dr["count"].ToString());
                    double val2 = double.Parse(total.ToString());

                    double results = val1 / val2 * 100;
                    ws.Cells[ctr, 3].Value = Math.Round(results, 2);
                    ws.Cells["A" + ctr + ":C" + ctr].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    ctr++;
                }
                ws.Cells.AutoFitColumns();
                pck.Save();
            }

            stream.Position = 0;
            string excelName = "" + HttpContext.Session.GetString("CorporateName") + "-AOPC-Most Click Wellness Reports.xlsx";
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
        }
        public IActionResult DownloadMCO()
        {
            var stream = new MemoryStream();
            using (var pck = new ExcelPackage(stream))
            {
                ExcelWorksheet ws = pck.Workbook.Worksheets.Add("Sheet 1");
                ws.Cells["A:AZ"].Style.Font.Size = 11;
                ws.Cells["A6:C6"].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:C6"].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:C6"].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:C6"].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                ws.Cells["A6:C6"].Style.Font.Bold = true;


                ws.Cells["A1"].Value = "Most Click Offer Report";
                ws.Cells[1, 1].Style.Font.Bold = true;
                ws.Cells[1, 1].Style.Font.SetFromFont(new System.Drawing.Font("Arial Black", 22));

                ws.Cells["A3"].Value = "User:                      " + HttpContext.Session.GetString("Name");
                //ws.Cells["B3"].Value = ;
                ws.Cells["A4"].Value = "Date Printed:     " + DateTime.Now.ToString("yyyy-MM-dd"); ;
                //ws.Cells["B4"].Value =

                ws.Cells["A6"].Value = "Offer";
                ws.Cells["B6"].Value = "Click Count";
                ws.Cells["C6"].Value = "Total Percentage";
                for (var col = 1; col <= 10; col++)
                {
                    ws.Cells[1, col].Style.Font.Bold = true;
                }

                string sql = $@"SELECT     Count(*)as count, Actions,Business,Module,tbl_audittrailModel.DateCreated
                        FROM         tbl_audittrailModel  WHERE Actions LIKE '%Viewed%' and module ='Health' 
                        GROUP BY    Actions,Business,Module,tbl_audittrailModel.DateCreated order by count desc";
                DataTable dt = db.SelectDb(sql).Tables[0];
                int ctr = 7;
                int total = 0;
                foreach (DataRow dr in dt.Rows)
                {
                    total += int.Parse(dr["count"].ToString());
                }
                foreach (DataRow dr in dt.Rows)
                {
                    ws.Cells[ctr, 1].Value = dr["Business"].ToString();
                    ws.Cells[ctr, 2].Value = dr["count"].ToString();
                    double val1 = double.Parse(dr["count"].ToString());
                    double val2 = double.Parse(total.ToString());

                    double results = val1 / val2 * 100;
                    ws.Cells[ctr, 3].Value = Math.Round(results, 2);
                    ws.Cells["A" + ctr + ":C" + ctr].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    ctr++;
                }
                ws.Cells.AutoFitColumns();
                pck.Save();
            }

            stream.Position = 0;
            string excelName = "" + HttpContext.Session.GetString("CorporateName") + "-AOPC-Most Click Offer Reports.xlsx";
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
        }
        public class UserFilterCat

        {
            public int day { get; set; }
            public string? startdate { get; set; }
            public string? enddate { get; set; }

            //public int day { get; set; }
            public string category { get; set; }

        }

        [HttpPost]
        public async Task<IActionResult> PostCallToActions(UserFilterCat data)
        {
            string result = "";
            var list = new List<CallToActionsModel>();
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiSupport/PostCallToActionsList";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    string res = await response.Content.ReadAsStringAsync();
                    list = JsonConvert.DeserializeObject<List<CallToActionsModel>>(res);

                }
            }

            catch (Exception ex)
            {
                string status = ex.GetBaseException().ToString();
            }
            //return Json(list);
            return Json(new { draw = 1, data = list, recordFiltered = list?.Count, recordsTotal = list?.Count });
        }
        [HttpPost]
        public async Task<IActionResult> PostMostClickRestaurant(UserFilterDateRange data)
        {

            string result = "";
            var list = new List<MostClickRestoModel>();
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiSupport/PostMostClickRestaurantList ";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    string res = await response.Content.ReadAsStringAsync();
                    list = JsonConvert.DeserializeObject<List<MostClickRestoModel>>(res);

                }
            }

            catch (Exception ex)
            {
                string status = ex.GetBaseException().ToString();
            }
            return Json(list);
        }
        [HttpPost]
        public async Task<IActionResult> PostViewMostClickRestaurant(UserFilterDateRange data)
        {

            string result = "";
            var list = new List<MostClickRestoModel>();
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiSupport/PostMostClickRestaurantList ";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    string res = await response.Content.ReadAsStringAsync();
                    list = JsonConvert.DeserializeObject<List<MostClickRestoModel>>(res);

                }
            }

            catch (Exception ex)
            {
                string status = ex.GetBaseException().ToString();
            }
            //return Json(list);
            return Json(new { draw = 1, data = list, recordFiltered = list?.Count, recordsTotal = list?.Count });
        }

        [HttpPost]
        public async Task<IActionResult> PostMostClickedHospitalityv2(UserFilterDateRange data)
        {

            string result = "";
            var list = new List<MostClickHospitalityModel>();
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiSupport/PostMostClickedHospitalityList ";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    string res = await response.Content.ReadAsStringAsync();
                    list = JsonConvert.DeserializeObject<List<MostClickHospitalityModel>>(res);

                }
            }

            catch (Exception ex)
            {
                string status = ex.GetBaseException().ToString();
            }
            return Json(list);
        }
        [HttpPost]
        public async Task<IActionResult> PostViewClickedHospitalityv2(UserFilterDateRange data)
        {

            string result = "";
            var list = new List<MostClickHospitalityModel>();
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiSupport/PostMostClickedHospitalityList ";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    string res = await response.Content.ReadAsStringAsync();
                    list = JsonConvert.DeserializeObject<List<MostClickHospitalityModel>>(res);

                }
            }

            catch (Exception ex)
            {
                string status = ex.GetBaseException().ToString();
            }
            //return Json(list);
            return Json(new { draw = 1, data = list, recordFiltered = list?.Count, recordsTotal = list?.Count });
        }
        [HttpPost]
        public async Task<IActionResult> PostMostCickStorev2(UserFilterDateRange data)
        {

            string result = "";
            var list = new List<MostClickStoreModel>();
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiSupport/PostMostCickStoreList";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    string res = await response.Content.ReadAsStringAsync();
                    list = JsonConvert.DeserializeObject<List<MostClickStoreModel>>(res);

                }
            }

            catch (Exception ex)
            {
                string status = ex.GetBaseException().ToString();
            }
            return Json(list);
        }
        [HttpPost]
        public async Task<IActionResult> PostViewMostCickStorev2(UserFilterDateRange data)
        {

            string result = "";
            var list = new List<MostClickStoreModel>();
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiSupport/PostMostCickStoreList ";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    string res = await response.Content.ReadAsStringAsync();
                    list = JsonConvert.DeserializeObject<List<MostClickStoreModel>>(res);

                }
            }

            catch (Exception ex)
            {
                string status = ex.GetBaseException().ToString();
            }
            //return Json(list);
            return Json(new { draw = 1, data = list, recordFiltered = list?.Count, recordsTotal = list?.Count });
        }
        [HttpPost]
        public async Task<IActionResult> PostMostCickWellnessv2(UserFilterDateRange data)
        {

            string result = "";
            var list = new List<MostClickStoreModel>();
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiSupport/PostMostClickWellnessList";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    string res = await response.Content.ReadAsStringAsync();
                    list = JsonConvert.DeserializeObject<List<MostClickStoreModel>>(res);

                }
            }

            catch (Exception ex)
            {
                string status = ex.GetBaseException().ToString();
            }
            return Json(list);
        }
        [HttpPost]
        public async Task<IActionResult> PostViewMostCickWellnessv2(UserFilterDateRange data)
        {

            string result = "";
            var list = new List<MostClickStoreModel>();
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiSupport/PostMostClickWellnessList ";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    string res = await response.Content.ReadAsStringAsync();
                    list = JsonConvert.DeserializeObject<List<MostClickStoreModel>>(res);

                }
            }

            catch (Exception ex)
            {
                string status = ex.GetBaseException().ToString();
            }
            //return Json(list);
            return Json(new { draw = 1, data = list, recordFiltered = list?.Count, recordsTotal = list?.Count });
        }
        [HttpPost]
        public async Task<IActionResult> PostMostCickOfferv2(UserFilterDateRange data)
        {
            string result = "";
            var list = new List<MostClickStoreModel>();
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiSupport/PostMostClickHealthList";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    string res = await response.Content.ReadAsStringAsync();
                    list = JsonConvert.DeserializeObject<List<MostClickStoreModel>>(res);

                }
            }

            catch (Exception ex)
            {
                string status = ex.GetBaseException().ToString();
            }
            return Json(list);
        }
        [HttpPost]
        public async Task<IActionResult> PostViewMostCickOfferv2(UserFilterDateRange data)
        {

            string result = "";
            var list = new List<MostClickStoreModel>();
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiSupport/PostMostClickHealthList ";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    string res = await response.Content.ReadAsStringAsync();
                    list = JsonConvert.DeserializeObject<List<MostClickStoreModel>>(res);

                }
            }

            catch (Exception ex)
            {
                string status = ex.GetBaseException().ToString();
            }
            //return Json(list);
            return Json(new { draw = 1, data = list, recordFiltered = list?.Count, recordsTotal = list?.Count });
        }

        //Company Info
        [HttpGet]
        public async Task<JsonResult> GetCompanyInformationv2()
        {
            ////var url = DBConn.HttpString + "/api/AuditTrail/AudittrailList";
            //var url = DBConn.HttpString + "/api/ApiCorporateListing/CorporateUserCountAll";
            //HttpClient client = new HttpClient();
            //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
            //string response = await client.GetStringAsync(url);
            //List<CorporateUserCountVM> models = JsonConvert.DeserializeObject<List<CorporateUserCountVM>>(response);
            ////return new(models);
            //return Json(new { draw = 1, data = models, recordFiltered = models?.Count, recordsTotal = models?.Count });

            var url = DBConn.HttpString + "/api/ApiCorporateListing/CorporateUserCountAll";
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
            string response = await client.GetStringAsync(url);
            List<CorporateUserCountVM> models = JsonConvert.DeserializeObject<List<CorporateUserCountVM>>(response);
            //return new(models);
            return Json(new { draw = 1, data = models, recordFiltered = models?.Count, recordsTotal = models?.Count });



        }
        [HttpGet]
        public async Task<JsonResult> GetCompanyInformation()
        {
            string test = token_.GetValue();
            var url = DBConn.HttpString + "/api/ApiCorporateListing/CorporateUserCountAll";
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());

            string response = await client.GetStringAsync(url);
            List<CorporateUserCountVM> models = JsonConvert.DeserializeObject<List<CorporateUserCountVM>>(response);
            //return new(models);
            return Json(new { draw = 1, data = models, recordFiltered = models?.Count, recordsTotal = models?.Count });
        }
        [HttpPost]
        public async Task<IActionResult> PostCompanyInformation(CorporateUserCountFilter data)
        {
            string result = "";
            var list = new List<PaginationCorpUserCountModel>();
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiCorporateListing/CorporateUserCount";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    string res = await response.Content.ReadAsStringAsync();
                    list = JsonConvert.DeserializeObject<List<PaginationCorpUserCountModel>>(res);

                }

            }

            catch (Exception ex)
            {
                string status = ex.GetBaseException().ToString();
            }
            return Json(list);
        }

        public IActionResult DownloadCompanyInformationExcel()
        {
            var stream = new MemoryStream();
            using (var pck = new ExcelPackage(stream))
            {
                ExcelWorksheet ws = pck.Workbook.Worksheets.Add("Sheet 1");
                ws.Cells["A:AZ"].Style.Font.Size = 11;
                ws.Cells["A8:G8"].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                ws.Cells["A8:G8"].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                ws.Cells["A8:G8"].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                ws.Cells["A8:G8"].Style.Border.Left.Style = ExcelBorderStyle.Thin;


                ws.Cells["A1"].Value = "Company Information Report";
                ws.Cells[1, 1].Style.Font.Bold = true;
                ws.Cells[1, 1].Style.Font.SetFromFont(new System.Drawing.Font("Arial Black", 22));

                ws.Cells["A3"].Value = "User:" + HttpContext.Session.GetString("Name");
                //ws.Cells["B3"].Value = ;
                ws.Cells["A4"].Value = "Date Printed:     " + DateTime.Now.ToString("yyyy-MM-dd"); ;
                //ws.Cells["B4"].Value =

                ws.Cells["A8"].Value = "Corporate Name";
                ws.Cells["B8"].Value = "Registered Users";
                ws.Cells["C8"].Value = "Unregistered Users";
                ws.Cells["D8"].Value = "VIP Registered";
                ws.Cells["E8"].Value = "VIP User Count";
                ws.Cells["F8"].Value = "User Count";
                ws.Cells["G8"].Value = "Total Users";
                for (var col = 1; col <= 10; col++)
                {
                    ws.Cells[1, col].Style.Font.Bold = true;
                }
                string sql = $@"
                    select 
                        Corp.CorporateName,
                        Coalesce(Reg.RegCount,0) 'Registered',
                        Coalesce(UnReg.UnRegCount,0) 'Unregistered',
                        Coalesce(VIP.VipCount,0) 'Registered VIP',
                        Coalesce(TotVIP.Count,0) 'Total VIP Count',
                        Coalesce(TotVIP.Count,0) - Coalesce(VIP.VipCount,0) 'Remaining VIP',
                        TotVIP.Count 'User Count' ,
                        Coalesce(Reg.RegCount,0)  + Coalesce(VIP.VipCount,0) 'Total User' 
                            
                    from (select Id, CorporateName from tbl_CorporateModel group by Id,CorporateName)As Corp
                                
                        left join (select CorporateID,Count(*) 'RegCount' from UsersModel where Active = '1' and isVIP = 0 group by CorporateID)Reg on Corp.Id = Reg.CorporateID
                        left join (select CorporateID,Count(*) 'UnRegCount' from UsersModel where Active = '6' group by CorporateID)UnReg on Corp.Id = UnReg.CorporateID
                        left join (select CorporateID,Count(*) 'VipCount' from UsersModel where Active = '1' and isVIP = 1 group by CorporateID)VIP on Corp.Id = VIP.CorporateID
                        left join (select Id,Coalesce(VipCount,0) 'Count',Count 'UserCount' from tbl_CorporateModel)TotVIP on Corp.Id = TotVIP.Id";

                DataTable dt = db.SelectDb(sql).Tables[0];
                int ctr = 9;
                foreach (DataRow dr in dt.Rows)
                {
                    ws.Cells[ctr, 1].Value = dr["CorporateName"].ToString();
                    ws.Cells[ctr, 2].Value = dr["Registered"].ToString();
                    ws.Cells[ctr, 3].Value = dr["Unregistered"].ToString();
                    ws.Cells[ctr, 4].Value = dr["Registered VIP"].ToString();
                    ws.Cells[ctr, 5].Value = dr["Total VIP Count"].ToString();
                    ws.Cells[ctr, 6].Value = dr["User Count"].ToString();
                    ws.Cells[ctr, 7].Value = dr["Total User"].ToString();

                    ws.Cells["A" + ctr + ":G" + ctr].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    ctr++;
                }
                ws.Cells.AutoFitColumns();
                pck.Save();
            }

            stream.Position = 0;
            string excelName = "" + HttpContext.Session.GetString("CorporateName") + "-AOPC-Company Information Result.xlsx";
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
        }

        public class CorporateUserCountExportFilter
        {
            public string Registered { get; set; }
            public string Unregistered { get; set; }
            public string RegisteredVIP { get; set; }
            public string TotalVIP { get; set; }
            public string UserCount { get; set; }
            public string TotalUser { get; set; }
        }

        //[HttpPost]
        public IActionResult ExportExcelTest(bool Registered, bool Unregistered, bool RegisteredVIP, bool TotalVIP, bool UserCount, bool TotalUser)
        //public IActionResult ExportExcelTest()
        {
            Console.WriteLine(Registered);
            Console.WriteLine(Unregistered);
            Console.WriteLine(RegisteredVIP);
            Console.WriteLine(TotalVIP);
            Console.WriteLine(UserCount);
            Console.WriteLine(TotalUser);

            string sql = $@"select Corp.CorporateName";
            if (Registered == true)
            {
                sql += " ,Coalesce(Reg.RegCount,0) 'Registered' ";
            }
            if (Unregistered == true)
            {
                sql += " ,Coalesce(UnReg.UnRegCount,0) 'Unregistered'";
            }
            if (RegisteredVIP == true)
            {
                sql += " ,Coalesce(VIP.VipCount,0) 'Registered VIP'";
            }
            if (TotalVIP == true)
            {
                sql += " ,Coalesce(TotVIP.Count,0) 'Total VIP Count'";
                //sql += " Coalesce(TotVIP.Count,0) - Coalesce(VIP.VipCount,0) 'Remaining VIP',";
            }
            if (UserCount == true)
            {
                sql += " ,TotVIP.Count 'User Count' ";
            }
            if (TotalUser == true)
            {
                sql += " ,Coalesce(Reg.RegCount,0)  + Coalesce(VIP.VipCount,0) 'Total User' ";
            }

            sql += "    from (select Id, CorporateName from tbl_CorporateModel group by Id,CorporateName)As Corp";
            sql += "    left join (select CorporateID,Count(*) 'RegCount' from UsersModel where Active = '1' and isVIP = 0 group by CorporateID)Reg on Corp.Id = Reg.CorporateID";
            sql += "    left join (select CorporateID,Count(*) 'UnRegCount' from UsersModel where Active = '6' group by CorporateID)UnReg on Corp.Id = UnReg.CorporateID";
            sql += "    left join (select CorporateID,Count(*) 'VipCount' from UsersModel where Active = '1' and isVIP = 1 group by CorporateID)VIP on Corp.Id = VIP.CorporateID";
            sql += "    left join (select Id,Coalesce(VipCount,0) 'Count',Count 'UserCount' from tbl_CorporateModel)TotVIP on Corp.Id = TotVIP.Id";

            Console.WriteLine(sql);
            string stm = sql;
            DataSet ds = db.SelectDb(sql);
            var stream = new MemoryStream();

            using (var package = new ExcelPackage(stream))
            {
                var worksheet = package.Workbook.Worksheets.Add("Sheet1");

                worksheet.Cells["A:AZ"].Style.Font.Size = 11;
                //worksheet.Cells["A8:G8"].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                //worksheet.Cells["A8:G8"].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                //worksheet.Cells["A8:G8"].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                //worksheet.Cells["A8:G8"].Style.Border.Left.Style = ExcelBorderStyle.Thin;

                worksheet.Cells["A1"].Value = "Company Information Report";
                worksheet.Cells[1, 1].Style.Font.Bold = true;
                worksheet.Cells[1, 1].Style.Font.SetFromFont(new System.Drawing.Font("Arial Black", 22));

                worksheet.Cells["A3"].Value = "User:" + HttpContext.Session.GetString("Name");
                //ws.Cells["B3"].Value = ;
                worksheet.Cells["A4"].Value = "Date Printed:     " + DateTime.Now.ToString("yyyy-MM-dd"); ;
                //ws.Cells["B4"].Value =

                worksheet.Cells["A6:Z6"].Style.Font.Bold = true;
                worksheet.Cells["A6"].LoadFromDataTable(ds.Tables[0], true);
                worksheet.Cells["A6:Z10000"].AutoFitColumns();

                package.Save();
            }
            stream.Position = 0;
            string excelName = "" + HttpContext.Session.GetString("CorporateName") + "-AOPC-Company Information Result.xlsx";

            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
            //return View("index");
        }

        [HttpPost]
        public async Task<IActionResult> EmailCorporate(CorporateNotificationEmailRequest data)
        {
            var list = new List<CorporateNotificationEmailRequest>();
            try
            {

                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiNotifcation/EmailCorporate";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");

                using (var response = await client.PostAsync(url, content))
                {
                    string res = await response.Content.ReadAsStringAsync();
                    list = JsonConvert.DeserializeObject<List<CorporateNotificationEmailRequest>>(res);

                }
            }

            catch (Exception ex)
            {
                string status = ex.GetBaseException().ToString();
            }
            return Json(list);
        }



        #endregion

        #region DataModels
        public class CorporateNotificationEmailRequest
        {
            public string Body { get; set; }
            public string Subject { get; set; }
            public string[] CorporateList { get; set; }

        }
        public class CorporateUserCountFilter
        {
            public string? Corporatename { get; set; }
            public int page { get; set; }
        }
        public class CorporateUserCountVM
        {
            public string CorporateName { get; set; }
            public string Registered { get; set; }
            public string Unregistered { get; set; }
            public string RegisteredVIP { get; set; }
            public string TotalVIP { get; set; }
            public string RemainingVip { get; set; }
            public string UserCount { get; set; }
            public string TotalUser { get; set; }
        }
        public class PaginationCorpUserCountModel
        {
            public string? CurrentPage { get; set; }
            public string? NextPage { get; set; }
            public string? PrevPage { get; set; }
            public string? TotalPage { get; set; }
            public string? PageSize { get; set; }
            public string? TotalRecord { get; set; }
            public string? TotalVIP { get; set; }
            public List<CorporateUserCountVM> items { get; set; }


        }
        public class emailpost
        {
            public string EmailAddress { get; set; }
            public string EmployeeID { get; set; }

        }
        public class MostClickRestoModel
        {
            public string Actions { get; set; }
            public string Business { get; set; }
            public string Module { get; set; }
            public string DateCreated { get; set; }
            public int count { get; set; }
            public double Total { get; set; }

        }
        public class MostClickHospitalityModel
        {
            public string Actions { get; set; }
            public string Business { get; set; }
            public string Module { get; set; }
            public string DateCreated { get; set; }
            public int count { get; set; }
            public double Total { get; set; }

        }
        public class UserCountLineGraphModel
        {
            public string DateCreated { get; set; }
            public int count { get; set; }

        }
        public class SupportModel
        {
            public int Supportcount { get; set; }

        }
        public class Usertotalcount
        {
            public int count { get; set; }
            public int graph_count { get; set; }
            public double percentage { get; set; }
            public string Date { get; set; }

        }
        public class UserFilterday
        {
            public int day { get; set; }
            public string category { get; set; }
        }



        public class NewRegCount
        {
            public int count { get; set; }

        }

        public class ClicCountModel
        {
            public string Module { get; set; }
            public int Count { get; set; }

        }
        public class SupportDetailModel
        {
            public int Id { get; set; }
            public string Message { get; set; }
            public string EmployeeID { get; set; }
            public string Fullname { get; set; }
            public string Status { get; set; }
            public string StatusID { get; set; }
            public string DateCreated { get; set; }

        }
        public class NotificationVM
        {

            public string? Id { get; set; }
            public string? EmployeeID { get; set; }
            public string? Details { get; set; }
            public string? Fullname { get; set; }
            public string? isRead { get; set; }
            public string? DateCreated { get; set; }

        }

        public class QrTrailVM
        {
            public int Id { get; set; }
            public string EmployeeID { get; set; }
            public string Longtitude { get; set; }
            public string Latitude { get; set; }
            public string IPAddres { get; set; }
            public string Region { get; set; }
            public string Country { get; set; }
            public string City { get; set; }
            public string AreaCode { get; set; }
            public string ZipCode { get; set; }
            public string ISOCode { get; set; }
            public string MetroCode { get; set; }
            public string TimeZone { get; set; }
            public string DateCreated { get; set; }
            public string PostalCode { get; set; }
            public string Fullname { get; set; }
        }
        public class CallToActionsModel
        {
            public string Business { get; set; }
            public string Category { get; set; }
            public int EmailCount { get; set; }
            public int CallCount { get; set; }
            public int BookCount { get; set; }

        }
        public class MostClickStoreModel
        {
            public string Actions { get; set; }
            public string Business { get; set; }
            public string Module { get; set; }
            public string DateCreated { get; set; }
            public int count { get; set; }
            public double Total { get; set; }

        }

        public class UserFilterUsername
        {
            public string userName { get; set; }
        }

        public class UserCountListing
        {
            public int registered { get; set; }
            public int unregistered { get; set; }
            public int isVIP { get; set; }
            public int totalVIP { get; set; }
            public int remainingVIP { get; set; }


        }

        #endregion

    }
}
