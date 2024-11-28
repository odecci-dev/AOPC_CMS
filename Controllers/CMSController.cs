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
using _CMS.Manager;
using ExcelDataReader;
using AOPC_CMSv2.ViewModel;
using static AOPC.Controllers.VendorController;
using System.Collections.Generic;

namespace AOPC.Controllers
{
    public class CMSController : Controller
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

        public CMSController(IOptions<AppSettings> appSettings, GlobalService globalService,
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

        public async Task<String> GetCorporate()
        {

            var url = DBConn.HttpString + "/api/ApiCorporatePrivilege/CorporatePrivilegeLsit";
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
            string response = await client.GetStringAsync(url);

            return response;
        }
        //try


        [HttpGet]
        public async Task<JsonResult> GetCorp()
        {
            string response = await GetCorporate();
            List<CorporatePrivilegeVM> models = JsonConvert.DeserializeObject<List<CorporatePrivilegeVM>>(response);
            return new(models);
        }
        [HttpGet]
        public async Task<JsonResult> getTopCorp()
        {
            string response = await GetCorporate();

            List<TopCorporateVM> models = JsonConvert.DeserializeObject<List<TopCorporateVM>>(response);
            var result = new List<TopCorporateVM>();
            for (int x = 0; x < models.Count; x++)
            {
                var item = new TopCorporateVM();
                item.Corporatename = models[x].Corporatename;
                item.NoOfVisit = models[x].NoOfVisit;
                result.Add(item);
            }
            return new(result);
        }

        public class AuditTrailPaginationModel
        {
            public string? CurrentPage { get; set; }
            public string? NextPage { get; set; }
            public string? PrevPage { get; set; }
            public string? TotalPage { get; set; }
            public string? PageSize { get; set; }
            public string? TotalRecord { get; set; }
            public List<Audittrailvm> items { get; set; }


        }
        public class AuditFullName
        {
            public string FullName { get; set; }
        }
        [HttpPost]
        public async Task<IActionResult> GetAuditSearch(AuditFullName data)
        {
            string result = "";
            var list = new List<Audittrailvm>();
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/AuditTrail/AuditTrailSearch";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    string res = await response.Content.ReadAsStringAsync();
                    list = JsonConvert.DeserializeObject<List<Audittrailvm>>(res);
                }
            }
            catch (Exception ex)
            {
                string status = ex.GetBaseException().ToString();
            }
            return Json(list);
        }
        [HttpPost]
        public async Task<IActionResult> GetDataAuditTrailList(paginate data)
        {
            string result = "";
            var list = new List<AuditTrailPaginationModel>();
            try
            {
                HttpClient client = new HttpClient();
                var url = DBConn.HttpString + "/api/ApiPagination/AuditTrailPaginate";
                //var url = DBConn.HttpString + "/api/ApiAuditTrail/AudittrailList";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token_.GetValue());
                StringContent content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await client.PostAsync(url, content))
                {
                    string res = await response.Content.ReadAsStringAsync();
                    list = JsonConvert.DeserializeObject<List<AuditTrailPaginationModel>>(res);

                }
            }

            catch (Exception ex)
            {
                string status = ex.GetBaseException().ToString();
            }
            return Json(list);
        }
        [HttpGet]
        public async Task<JsonResult> GetAuditTrailList()
        {
            //var url = DBConn.HttpString + "/api/AuditTrail/AudittrailList";
            var url = DBConn.HttpString + "/api/ApiAuditTrail/AudittrailList";
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token_.GetValue());
            string response = await client.GetStringAsync(url);
            List<Audittrailvm> models = JsonConvert.DeserializeObject<List<Audittrailvm>>(response);
            //return new(models);
            return Json(new { draw = 1, data = models, recordFiltered = models?.Count, recordsTotal = models?.Count });
        }

        public IActionResult Index()
        {
            string token = HttpContext.Session.GetString("Bearer");
            if (token == null || token == string.Empty)
            {
                return RedirectToAction("Index", "LogIn");
            }
            return View();
        }
        public IActionResult AuditTrail()
        {
            string token = HttpContext.Session.GetString("Bearer");
            if (token == null)
            {
                return RedirectToAction("Index", "LogIn");
            }
            return View();
        }

        #region DataModels

        public class Audittrailvm
        {

            public int Id { get; set; }
            public string Actions { get; set; }
            public string Module { get; set; }
            public string DateCreated { get; set; }
            public string status { get; set; }
            public string EmployeeID { get; set; }
            public string FullName { get; set; }
            public string Fname { get; set; }
            public string Lname { get; set; }
            public string PositionName { get; set; }
            public string CorporateName { get; set; }
            public string UserType { get; set; }
        }
        #endregion
    }
}
