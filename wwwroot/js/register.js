const { async } = require("postcss-js");
var filtermodal = document.getElementById("filtermodal");



var FamilyUserId;
var isFmilyUserVIP;

var corporateAdminListTable;
var userRegistrationListTable;
var oysterAdminListTable;

////Filter Variables
//let corporateFilter = null;
//let companyNameFilter = null;
//let genderFilter = null;
//let positionFilter = null;
//let isVipFilter = null;
//let statusFilter = null;
//var spanval = 0;
async function userRegistrationListTableLayout() {
    //corusertable = $('#corporate-user-table').DataTable({
    //    "columnDefs": [

    //        { "width": "150px", "targets": 0 },
    //        { "width": "150px", "targets": 1 },
    //        { "width": "150px", "targets": 2 },
    //        { "width": "200px", "targets": 3 },
    //        { "width": "200px", "targets": 4 },
    //        { "width": "200px", "targets": 5 },
    //        { "width": "200px", "targets": 6 },
    //        { "width": "150px", "targets": 7 }
    //        // { "width": "70px", "targets": 9 }
    //    ],
    //    "deferRender": true,
    //    "bPaginate": false,
    //    "bFilter": false,
    //    "stripeClasses": [],
    //    "ordering": false,
    //    "ordering": false,
    //    "info": false,
    //    "bInfo": false,
    //    "bAutoWidth": false,
    //    "bLengthChange": false,
    //    "paging": false,
    //    "aLengthMenu": [10],
    //    "searching": false
    //    , "oLanguage": { "sZeroRecords": "", "sEmptyTable": "" }
    //});

    //regtable = $('#register-table').DataTable({
    //    "columnDefs": [

    //        { "width": "150px", "targets": 0 },
    //        { "width": "150px", "targets": 1 },
    //        { "width": "150px", "targets": 2 },
    //        { "width": "200px", "targets": 3 },
    //        { "width": "200px", "targets": 4 },
    //        { "width": "200px", "targets": 5 },
    //        { "width": "200px", "targets": 6 },
    //        { "width": "150px", "targets": 7 }
    //        // { "width": "70px", "targets": 9 }
    //    ],
    //    "deferRender": true,
    //    "bPaginate": false,
    //    "bFilter": false,
    //    "stripeClasses": [],
    //    "ordering": false,
    //    "ordering": false,
    //    "info": false,
    //    "bInfo": false,
    //    "bAutoWidth": false,
    //    "bLengthChange": false,
    //    "paging": false,
    //    "aLengthMenu": [10],
    //    "searching": false
    //    , "oLanguage": { "sZeroRecords": "", "sEmptyTable": "" }

    //});
    
    //corpfamilyMemberTable = $('#corporate-family-member-table').DataTable({
    //    "columnDefs": [

    //        { "width": "150px", "targets": 0 },
    //        { "width": "150px", "targets": 1 },
    //        { "width": "150px", "targets": 2 },
    //        { "width": "200px", "targets": 3 },
    //        { "width": "200px", "targets": 4 }
    //    ],
    //    "deferRender": true,
    //    "bPaginate": false,
    //    "bFilter": false,
    //    "stripeClasses": [],
    //    "ordering": false,
    //    "ordering": false,
    //    "info": false,
    //    "bInfo": false,
    //    "bAutoWidth": false,
    //    "bLengthChange": false,
    //    "aLengthMenu": [10],
    //    "paging": true,
    //    "searching": false,
    //    "oLanguage": { "sZeroRecords": "", "sEmptyTable": "" }

    //});
    //familyMemberTable = $('#family-member-table').DataTable({
    //    "columnDefs": [

    //        { "width": "150px", "targets": 0 },
    //        { "width": "150px", "targets": 1 },
    //        { "width": "150px", "targets": 2 },
    //        { "width": "200px", "targets": 3 },
    //        { "width": "200px", "targets": 4 }
    //    ],
    //    "deferRender": true,
    //    "bPaginate": false,
    //    "bFilter": false,
    //    "stripeClasses": [],
    //    "ordering": false,
    //    "ordering": false,
    //    "info": false,
    //    "bInfo": false,
    //    "bAutoWidth": false,
    //    "bLengthChange": false,
    //    "aLengthMenu": [10],
    //    "paging": true,
    //    "searching": false,
    //    "oLanguage": { "sZeroRecords": "", "sEmptyTable": "" }

    //});
}


async function ShowFilter() {

    $('#corporateFilterBtn').click(function () {
        document.getElementById("filtermodal").style.display = "block";
        document.getElementById('apply-filter-corporate').style.display = "block";
        document.getElementById('apply-filter-user').style.display = "none";
        //UserShowPositionNameFilter();
    });

    $('#registerFilter').click(function () {
        document.getElementById("filtermodal").style.display = "block";
        document.getElementById('apply-filter-user').style.display = "block";
        document.getElementById('apply-filter-corporate').style.display = "none";
        //UserShowPositionNameFilter();
    });

    //Close Filter
    $('#closeFilterbtn').click(function () {
        document.getElementById("filtermodal").style.display = "none";

    });

    //Cancel Filter
    $('#cancelFilterbtn').click(function () {
        //filtermodal.style.display = "none";

        //Corporate Name
        corporateFilter = document.getElementById("corporateFilter").value = "";

        //Gender
        document.getElementById("femaleRadioFilter").checked = false;
        document.getElementById("maleRadioFilter").checked = false;
        document.getElementById("allGenderFilter").checked = false;

        //Position
        document.getElementById("positionFilter").value = "";
        document.getElementById("allPositionFilter").checked = false;

        //Is Vip
        document.getElementById("isVipYesFilter").checked = false;
        document.getElementById("isVipNoFilter").checked = false;
        document.getElementById("isVipAllFilter").checked = false;

        //Status

        document.getElementById("registeredFilter").checked = false;
        document.getElementById("unregisteredFilter").checked = false;
        document.getElementById("statusAllFilter").checked = false;

        corporateFilter = null;
        companyNameFilter = null;
        genderFilter = null;
        positionFilter = null;
        isVipFilter = null;
        statusFilter = null;
        spanval = 0;
    });
    $('#corpcancelFilterbtn').click(function () {
        //filtermodal.style.display = "none";


        //Gender
        document.getElementById("femaleRadioFilter").checked = false;
        document.getElementById("maleRadioFilter").checked = false;
        document.getElementById("allGenderFilter").checked = false;

        //Position
        document.getElementById("positionFilter").value = "";
        document.getElementById("allPositionFilter").checked = false;

        //Is Vip
        document.getElementById("isVipYesFilter").checked = false;
        document.getElementById("isVipNoFilter").checked = false;
        document.getElementById("isVipAllFilter").checked = false;

        //Status

        document.getElementById("registeredFilter").checked = false;
        document.getElementById("unregisteredFilter").checked = false;
        document.getElementById("statusAllFilter").checked = false;

        corporateFilter = null;
        companyNameFilter = null;
        genderFilter = null;
        positionFilter = null;
        isVipFilter = null;
        statusFilter = null;
        spanval = 0;
    });

    

    //CompanyNameDOM
    $('#corporateFilter').change(function () {
        corporateFilter = document.getElementById("corporateFilter").value;
        if (corporateFilter == "") {
            corporateFilter = null;
        }
        //console.log(corporateFilter);
    });

    //GenderFilterDOM
    $('#maleRadioFilter').click(function () {
        document.getElementById("femaleRadioFilter").checked = false;
        document.getElementById("allGenderFilter").checked = false;

        genderFilter = document.getElementById("maleRadioFilter").value;
    });
    $('#femaleRadioFilter').click(function () {
        document.getElementById("maleRadioFilter").checked = false;
        document.getElementById("allGenderFilter").checked = false;

        genderFilter = document.getElementById("femaleRadioFilter").value;
    });
    $('#allGenderFilter').change(function () {
        document.getElementById("maleRadioFilter").checked = false;
        document.getElementById("femaleRadioFilter").checked = false;

        genderFilter = null;
    });

    //Position Filter
    $('#allPositionFilter').change(function () {
        if (document.getElementById("allPositionFilter").checked == true) {

            UserShowPositionNameFilter();
            positionFilter = null;
        }
    });
    $('#positionFilter').change(function () {
        document.getElementById("allPositionFilter").checked = false;
        positionFilter = document.getElementById("positionFilter").value;
        
    });
    //IsVipFilterDOM
    $('#isVipYesFilter').change(function () {
        document.getElementById("isVipNoFilter").checked = false;
        document.getElementById("isVipAllFilter").checked = false;

        isVipFilter = document.getElementById("isVipYesFilter").value;
    });
    $('#isVipNoFilter').change(function () {
        document.getElementById("isVipYesFilter").checked = false;
        document.getElementById("isVipAllFilter").checked = false;

        isVipFilter = document.getElementById("isVipNoFilter").value;
    });
    $('#isVipAllFilter').change(function () {
        document.getElementById("isVipYesFilter").checked = false;
        document.getElementById("isVipNoFilter").checked = false;

        isVipFilter = null;
    });
    //statusFilterDOM
    $('#registeredFilter').change(function () {
        document.getElementById("unregisteredFilter").checked = false;
        document.getElementById("statusAllFilter").checked = false;

        statusFilter = document.getElementById("registeredFilter").value;
    });
    $('#unregisteredFilter').change(function () {
        document.getElementById("registeredFilter").checked = false;
        document.getElementById("statusAllFilter").checked = false;

        statusFilter = document.getElementById("registeredFilter").value;
    });
    $('#statusAllFilter').change(function () {
        document.getElementById("unregisteredFilter").checked = false;
        document.getElementById("registeredFilter").checked = false;

        statusFilter = null;
    });

    //Apply Filter
    $('#apply-filter-user').click(function () {
        spanval = "";

        userRegistrationListTable.destroy();
        getUserRegistration();

        document.getElementById("filtermodal").style.display = "none";
    });
    $('#apply-filter-corporate').click(function () {
        spanval = "";
        corporateAdminListTable.destroy();
        getCorporateRegistration();
        document.getElementById("filtermodal").style.display = "none";
    });
    $('#corp-apply-filter-user').click(function () {
        spanval = "";
        corpuserRegistrationListTable.destroy();
        getCorpUserRegistration();

        document.getElementById("filtermodal").style.display = "none";
    });

    //search user
    $('#user-registration-search').change(function () {
        
        var user = document.getElementById('user-registration-search').value;
        //console.log(user);
        spanval = "";
        companyNameFilter = user;
        getUserRegistration();
    });
    
}

async function getUnregisteredList() {
    var searchUnregisteredUser = document.getElementById('bulkEmailcorporateFilter').value;
    var data = {};
    if (searchUnregisteredUser == "") {
        searchUnregisteredUser = null;
    }
    data.name = searchUnregisteredUser;
    //console.log(data.name);
    //data.name = "France";
    //console.log(data.name);
    $.ajax({
        url: '/Register/UnregisteredList',
        data: {
            data: data,
        },
        type: "POST",
        datatype: "json",
        success: function (data) {
            console.log(data);
            //console.log(data.length);

            
            var form = document.getElementById('unregisteredEmails');
            form.innerHTML = "";
            for (var i = 0; i < data.length; i++) {
                var div = document.createElement("div");
                div.className = "formControl";
                div.innerHTML = `
                    <input class="unregisteredOptions" type="checkbox" id="unregistered" name="`+ data[i].name +`" value="`+ data[i].email +`" />
                    <label>`+data[i].name +`</label>`;
                form.appendChild(div); 
            }
            document.getElementById('bulkEmailUserCount').innerHTML = data.length;
            
        }

    });
    sendToAll();
}

async function sendToAll() {
    var options = document.getElementsByName('unregistered');
    $('#send-to-all').change(function () {
        if (document.getElementById("send-to-all").checked == true) {
            //$('.corporateOptionSendNotif').attr('checked', true);
            $('.unregisteredOptions').not(this).prop('checked', this.checked);
        }
        else {
            //$('form div input').attr('checked', false);

            $('.unregisteredOptions').not(this).prop('checked', false);
        }
    });
    //$('#send-to-all').change(function () {
    //    if (document.getElementById("send-to-all").checked == true) {
    //        $('div input').attr('checked', true); 
    //    }
    //    else {
    //        $('div input').attr('checked', false);
    //    }
    //});
    $('#sendEmail').click(function () {
        var checkedEmail = document.querySelectorAll('input[id="unregistered"]:checked');
       
        selectedEmail = Array.from(checkedEmail).map(x => x.value);
        selectedName = Array.from(checkedEmail).map(x => x.name);
        
        if (checkedEmail.length == 0) {
            //console.log("No Name Selected");
            document.getElementById('bulkEmailFormError').style.display = "block";
            setTimeout(function () {
                document.getElementById('bulkEmailFormError').style.display = "none";
            }, 3000);

        }
        else {

            var data = {};

            data.body = "Test Email";
            data.Email = selectedEmail;
            data.Name = selectedName;
            //console.log(data);
            $.ajax({
                url: '/Register/EmailUnregisterUsers',
                data: {
                    data: data,
                },
                type: "POST",
                datatype: "json",
                success: function (data) {
                    //console.log(data);
                    //console.log("Email Sent!");
                  
                }

            });
            
            document.getElementById('bulkEmailModal').style.display = "none";
            getUnregisteredList();
        }
    });

    
}

async function registerShowBulkEmailModal() {
    
    $('#registerBulkEmail').click(function () {
        document.getElementById('bulkEmailModal').style.display = "block";
    });
    $('#closebulkEmailBtn').click(function () {
        document.getElementById('bulkEmailModal').style.display = "none";
        getUnregisteredList();
    }); 
    
    $('#bulkEmailcorporateFilter').change(function () {
        getUnregisteredList();
    });
    
}

async function UserShowSelectFilter() {
    $.ajax(
        {
            url: "/Register/GetPosition",
            data: {},
            type: "GET",
            datatype: "json"
        }).done(function (data) {
            // 
            $("#positionFilter").empty();
            $("#positionFilter").append('<option value="">-Select Option-</option>');
            for (var i = 0; i < data.length; i++) {
                $("#positionFilter").append('<option value="' + data[i].id + '">' + data[i].positionName + "</option>");
            }
            //$.unblockUI();
        }).fail(function () {
            alert("There was an Error When Loading Data...");
        });

    $.ajax({
        url: "/Corporate/GetCompanyList",
        data: {},
        type: "GET",
        datatype: "json"
    }).done(function (data) {
        //console.log(data[0].corporateName);
        $("#corporateFilter").empty();
        $("#corporateFilter").append('<option value="">-Select Corporate-</option>');
        for (var i = 0; i < data.length; i++) {
            $("#corporateFilter").append('<option value="' + data[i].id + '">' + data[i].corporateName + "</option>");
        }
        $("#bulkEmailcorporateFilter").empty();
        $("#bulkEmailcorporateFilter").append('<option value="">-Select Corporate-</option>');
        for (var i = 0; i < data.length; i++) {
            $("#bulkEmailcorporateFilter").append('<option value="' + data[i].id + '">' + data[i].corporateName + "</option>");
        }
        //$.unblockUI();
    }).fail(function () {
        alert("There was an Error When Loading Data...");
    });
}

async function getUserRegistration() {
    
    var data = {};
    data.corpId = corporateFilter;
    data.filterName = companyNameFilter;
    data.posId = positionFilter;
    data.gender = genderFilter;
    data.isVIP = isVipFilter;
    data.status = statusFilter;
    data.page = spanval;
    //console.log(data);

    //$.ajax({
    //    url: '/Register/PostDisplayRegistrationList',
    //    //async: false,
    //    data: {
    //        data: data,
    //    },
    //    type: "POST",
    //    datatype: "json",
    //    success: function (data) {


    //        prev = data[0].prevPage;
    //        next = data[0].nextPage;
    //        currpage = data[0].currentPage;
    //        spanval = data[0].currentPage;

    //        regtable.clear().draw();

    //        for (var i = 0; i < data[0].items.length; i++) {
    //            var img = data[0].items[i].filePath;
    //            if (data[0].items[i].isVIP == 1) {
    //                data[0].items[i].isVIP = "Yes";
    //            }
    //            else {
    //                data[0].items[i].isVIP = "No";
    //            }
    //            if (img == "") {
    //                img = "https://www.alfardanoysterprivilegeclub.com/assets/img/defaultavatar.png";
    //            } else {
    //                img = data[0].items[i].filePath;
    //            }

                //var tdbuttons = '<div class="data-img">' +
                //    "<img src=" + img +
                //    " alt=" + data[0].items[i].fname +
                //    ' width="100%" />' +
                //    "</div>" +
                //    "<div>" +
                //    "<p>" + data[0].items[i].employeeID +
                //    "</p>" +
                //    "<p>" + data[0].items[i].fname +
                //    " " + data[0].items[i].lname +
                //    "</p>" +
                //    '<div class="actions"><a class="tbl-edit"  data-id="' + data[0].items[i].id +
                //    '" data-username="' + data[0].items[i].username +
                //    '" data-employeeid="' + data[0].items[i].employeeID +
                //    '" data-fname="' + data[0].items[i].fname +
                //    '" data-lname="' + data[0].items[i].lname +
                //    '" data-email="' + data[0].items[i].email +
                //    '" data-pos="' + data[0].items[i].positionID +
                //    '"  data-gender="' + data[0].items[i].gender +
                //    '" data-utype="' + data[0].items[i].userType +
                //    '" data-usercorpid="' + data[0].items[i].corporateID +
                //    '"  data-displayimg="' + data[0].items[i].filePath +
                //    '"  data-vipstats="' + data[0].items[i].isVIP +
                //    '"  data-emailstatus="' + data[0].items[i].status + '">' +

                //    '<svg width="11" height="11" viewBox="0 0 11 11" fill="none"xmlns="http://www.w3.org/2000/svg">' +
                //    '<path d="M5.02558 1.92456H1.89457C1.65732 1.92456 1.42978 2.0164 1.26201 2.17986C1.09425 2.34333 1 2.56504 1 2.79621V8.89779C1 9.12896 1.09425 9.35067 1.26201 9.51414C1.42978 9.6776 1.65732 9.76944 1.89457 9.76944H8.15659C8.39385 9.76944 8.62139 9.6776 8.78915 9.51414C8.95692 9.35067 9.05117 9.12896 9.05117 8.89779V5.847"' + 'stroke="black"' + 'stroke-linecap="round"' + 'stroke-linejoin="round"/>' + '<path d="M8.38023 1.27079C8.55817 1.09741 8.79951 1 9.05116 1C9.30281 1 9.54415 1.09741 9.72209 1.27079C9.90003 1.44417 10 1.67933 10 1.92453C10 2.16973 9.90003 2.40488 9.72209 2.57827L5.47286 6.71862L3.68372 7.15445L4.131 5.41114L8.38023 1.27079Z"' +
                //    'stroke="black"' + 'stroke-linecap="round"' + 'stroke-linejoin="round"/>' +
                //    "</svg>" +
                //    "<span >Edit</span>" + " </a>" +
                //    '<a class="tbl-delete" data-id="' + data[0].items[i].id +
                //    '"  data-username="' + data[0].items[i].username +
                //    '" data-employeeid="' + data[0].items[i].employeeID +
                //    '" data-fname="' + data[0].items[i].fname +
                //    '" data-lname="' + data[0].items[i].lname +
                //    '" data-email="' + data[0].items[i].email +
                //    '" data-pos="' + data[0].items[i].positionID +
                //    '"  data-vipstats="' + data[0].items[i].isVIP +
                //    '"  data-gender="' + data[0].items[i].gender +

                //    '" >' + '<svg width="11" height="10" viewBox="0 0 11 10" fill="none"  xmlns="http://www.w3.org/2000/svg">' +
                //    '<path d="M2.56574 1C2.56574 0.734784 2.67387 0.48043 2.86634 0.292893C3.0588 0.105357 3.31985 0 3.59204 0H6.67092C6.94311 0 7.20416 0.105357 7.39663 0.292893C7.58909 0.48043 7.69722 0.734784 7.69722 1V2H9.74981C9.88591 2 10.0164 2.05268 10.1127 2.14645C10.2089 2.24021 10.263 2.36739 10.263 2.5C10.263 2.63261 10.2089 2.75979 10.1127 2.85355C10.0164 2.94732 9.88591 3 9.74981 3H9.20126L8.75636 9.071C8.73793 9.32329 8.62207 9.55941 8.43211 9.73179C8.24215 9.90417 7.99221 10 7.73263 10H2.52982C2.27024 10 2.0203 9.90417 1.83034 9.73179C1.64038 9.55941 1.52452 9.32329 1.50609 9.071L1.06222 3H0.513148C0.377053 3 0.246531 2.94732 0.150298 2.85355C0.0540636 2.75979 0 2.63261 0 2.5C0 2.36739 0.0540636 2.24021 0.150298 2.14645C0.246531 2.05268 0.377053 2 0.513148 2H2.56574V1ZM3.59204 2H6.67092V1H3.59204V2ZM2.09056 3L2.53033 9H7.73314L8.17291 3H2.09056ZM4.10518 4C4.24128 4 4.3718 4.05268 4.46803 4.14645C4.56427 4.24021 4.61833 4.36739 4.61833 4.5V7.5C4.61833 7.63261 4.56427 7.75979 4.46803 7.85355C4.3718 7.94732 4.24128 8 4.10518 8C3.96909 8 3.83857 7.94732 3.74233 7.85355C3.6461 7.75979 3.59204 7.63261 3.59204 7.5V4.5C3.59204 4.36739 3.6461 4.24021 3.74233 4.14645C3.83857 4.05268 3.96909 4 4.10518 4ZM6.15778 4C6.29387 4 6.42439 4.05268 6.52063 4.14645C6.61686 4.24021 6.67092 4.36739 6.67092 4.5V7.5C6.67092 7.63261 6.61686 7.75979 6.52063 7.85355C6.42439 7.94732 6.29387 8 6.15778 8C6.02168 8 5.89116 7.94732 5.79493 7.85355C5.69869 7.75979 5.64463 7.63261 5.64463 7.5V4.5C5.64463 4.36739 5.69869 4.24021 5.79493 4.14645C5.89116 4.05268 6.02168 4 6.15778 4Z"' +
                //    'fill="black"/>' +
                //    "</svg>" +
                //    "<span>Delete</span></a>" +
                //    '<a class="tbl-sendemail" data-id="' + data[0].items[i].id +
                //    '"  data-username="' + data[0].items[i].username +
                //    '" data-employeeid="' + data[0].items[i].employeeID +
                //    '" data-fname="' + data[0].items[i].fname +
                //    '" data-lname="' + data[0].items[i].lname +
                //    '" data-sentemail="' + data[0].items[i].email +
                //    '" data-pos="' + data[0].items[i].positionID +
                //    '"  data-gender="' + data[0].items[i].gender +
                //    '"  data-vipstats="' + data[0].items[i].isVIP +
                //    '"  data-emailstatus="' + data[0].items[i].status + '" >' +

                //    '<svg width="11" height="10" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M0 12.3047V1.19576C0 1.1829 0.0192864 1.06075 0.0578592 0.829315L6.59595 6.42237L0.0771456 12.6905C0.0257152 12.5104 0 12.3819 0 12.3047V12.3047ZM0.867888 0.0578592C0.957891 0.0192864 1.06718 0 1.19576 0H18.8042C18.92 0 19.0357 0.0192864 19.1514 0.0578592L12.594 5.6702L11.7261 6.36451L10.0096 7.77242L8.29315 6.36451L7.42526 5.6702L0.867888 0.0578592ZM0.887174 13.4426L7.46384 7.13597L10.0096 9.19961L12.5554 7.13597L19.1321 13.4426C19.0293 13.4812 18.92 13.5005 18.8042 13.5005H1.19576C1.0929 13.5005 0.990035 13.4812 0.887174 13.4426V13.4426ZM13.4233 6.42237L19.9421 0.829315C19.9807 0.945034 20 1.06718 20 1.19576V12.3047C20 12.4204 19.9807 12.549 19.9421 12.6905L13.4233 6.42237Z" fill="black"/>' +
                //    "</svg>" + "<span>Send Email</span></a>" +
                //    "</div></div>";

    //            $('#register-table').dataTable().fnAddData([

    //                '<td>' + tdbuttons + '</td>',
    //                // '<td><p>' + data[i].promoReleaseText+'</p></td>',
    //                '<td><p>' + data[0].items[i].username + '</p></td>',
    //                '<td><p>' + data[0].items[i].email + '</p></td>',
    //                '<td><p>' + data[0].items[i].gender + '</p></td>',
    //                '<td><p>' + data[0].items[i].corporatename + '</p></td>',
    //                '<td><p>' + data[0].items[i].position + '</p></td>',
    //                '<td><p>' + data[0].items[i].status + '</p></td>',
    //                '<td><p>' + data[0].items[i].isVIP + '</p></td>',
    //                '<td><p>' + data[0].items[i].dateCreated + '</p></td>'
    //            ]);

    //        }

    //    }

    //});
    if (DataTable.isDataTable('#register-table')) {
        userRegistrationListTable.destroy();
    }
    userRegistrationListTable = new DataTable('#register-table', {
        ajax: {
            url: "/Register/PostDisplayRegistrationList",
            type: "POST",
            data: {
                data: data
            },
            dataType: "json",
            processing: true,
            serverSide: true,
            complete: function (xhr) {
                //console.log(xhr);
            },
            error: function (err) {
                //alert(err.responseText);
                alert("There was an Error When Loading Data...");
            }
        },
        columnDefs: [
            { "width": "150px", "targets": 2 },
            { "width": "150px", "targets": 4 }
        ],
        columns: [
            {
                data: 'fname',
                render: function (data, type, row) {
                    var img = row.filePath;
                    if (img == "") {
                        img = "https://www.alfardanoysterprivilegeclub.com/assets/img/defaultavatar.png";
                    } else {
                        img = row.filePath;
                    }

                    var tdbuttons = '<div class="data-img">' +
                        '<img src="' + img + '" alt= "' + data + '" width="100%" />' +
                        '</div>' +
                        '<div>' +
                        '<p> ' + row.employeeID + '</p>' +
                        '<p> ' + data + ' ' + row.lname + '</p>' +
                        '<div class="actions">' +
                        '<a class="tbl-edit" ' +
                        'data-id="' + row.id + '"' +
                        'data-username="' + row.username + '"' +
                        'data-employeeid="' + row.employeeID + '"' +
                        'data-fname="' + data + '"' +
                        'data-lname="' + row.lname + '"' +
                        'data-email="' + row.email + '"' +
                        'data-pos="' + row.positionID + '"' +
                        'data-gender="' + row.gender + '"' +
                        'data-utype="' + row.userType + '"' +
                        'data-usercorpid="' + row.corporateID + '"' +
                        'data-displayimg="' + row.filePath + '"' +
                        'data-vipstats="' + row.isVIP + '"' +
                        'data-emailstatus="' + row.status + '> ' +
                        '<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                        '<path d="M5.02558 1.92456H1.89457C1.65732 1.92456 1.42978 2.0164 1.26201 2.17986C1.09425 2.34333 1 2.56504 1 2.79621V8.89779C1 9.12896 1.09425 9.35067 1.26201 9.51414C1.42978 9.6776 1.65732 9.76944 1.89457 9.76944H8.15659C8.39385 9.76944 8.62139 9.6776 8.78915 9.51414C8.95692 9.35067 9.05117 9.12896 9.05117 8.89779V5.847" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>' +
                        '<path d="M8.38023 1.27079C8.55817 1.09741 8.79951 1 9.05116 1C9.30281 1 9.54415 1.09741 9.72209 1.27079C9.90003 1.44417 10 1.67933 10 1.92453C10 2.16973 9.90003 2.40488 9.72209 2.57827L5.47286 6.71862L3.68372 7.15445L4.131 5.41114L8.38023 1.27079Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>' +
                        '</svg>' +
                        '<span >Edit</span>' +
                        '</a>' +
                        '<a class="tbl-delete" ' +
                        'data-id="' + row.id + '"' +
                        'data-username="' + row.username + '"' +
                        'data-employeeid="' + row.employeeID + '"' +
                        'data-fname="' + data + '"' +
                        'data-lname="' + row.lname + '"' +
                        'data-email="' + row.email + '"' +
                        'data-corporateposition="' + row.positionID + '"' +
                        'data-corporategender="' + row.gender + '"' +
                        'data-utype="' + row.userType + '"' +
                        'data-corporateid="' + row.corporateID + '"' +
                        'data-displayimg="' + row.filePath + '"' +
                        'data-vipstats="' + row.isVIP + '> ' +
                        '<svg width="11" height="10" viewBox="0 0 11 10" fill="none"  xmlns="http://www.w3.org/2000/svg">' +
                        '<path d="M2.56574 1C2.56574 0.734784 2.67387 0.48043 2.86634 0.292893C3.0588 0.105357 3.31985 0 3.59204 0H6.67092C6.94311 0 7.20416 0.105357 7.39663 0.292893C7.58909 0.48043 7.69722 0.734784 7.69722 1V2H9.74981C9.88591 2 10.0164 2.05268 10.1127 2.14645C10.2089 2.24021 10.263 2.36739 10.263 2.5C10.263 2.63261 10.2089 2.75979 10.1127 2.85355C10.0164 2.94732 9.88591 3 9.74981 3H9.20126L8.75636 9.071C8.73793 9.32329 8.62207 9.55941 8.43211 9.73179C8.24215 9.90417 7.99221 10 7.73263 10H2.52982C2.27024 10 2.0203 9.90417 1.83034 9.73179C1.64038 9.55941 1.52452 9.32329 1.50609 9.071L1.06222 3H0.513148C0.377053 3 0.246531 2.94732 0.150298 2.85355C0.0540636 2.75979 0 2.63261 0 2.5C0 2.36739 0.0540636 2.24021 0.150298 2.14645C0.246531 2.05268 0.377053 2 0.513148 2H2.56574V1ZM3.59204 2H6.67092V1H3.59204V2ZM2.09056 3L2.53033 9H7.73314L8.17291 3H2.09056ZM4.10518 4C4.24128 4 4.3718 4.05268 4.46803 4.14645C4.56427 4.24021 4.61833 4.36739 4.61833 4.5V7.5C4.61833 7.63261 4.56427 7.75979 4.46803 7.85355C4.3718 7.94732 4.24128 8 4.10518 8C3.96909 8 3.83857 7.94732 3.74233 7.85355C3.6461 7.75979 3.59204 7.63261 3.59204 7.5V4.5C3.59204 4.36739 3.6461 4.24021 3.74233 4.14645C3.83857 4.05268 3.96909 4 4.10518 4ZM6.15778 4C6.29387 4 6.42439 4.05268 6.52063 4.14645C6.61686 4.24021 6.67092 4.36739 6.67092 4.5V7.5C6.67092 7.63261 6.61686 7.75979 6.52063 7.85355C6.42439 7.94732 6.29387 8 6.15778 8C6.02168 8 5.89116 7.94732 5.79493 7.85355C5.69869 7.75979 5.64463 7.63261 5.64463 7.5V4.5C5.64463 4.36739 5.69869 4.24021 5.79493 4.14645C5.89116 4.05268 6.02168 4 6.15778 4Z" fill="black"/>' +
                        '</svg>' +
                        '<span>Delete</span>' +
                        '</a>' +
                        '<a class="tbl-sendemail" ' +
                        'data-id="' + row.id + '"' +
                        'data-username="' + row.username + '"' +
                        'data-employeeid="' + row.employeeID + '"' +
                        'data-fname="' + data + '"' +
                        'data-lname="' + row.lname + '"' +
                        'data-email="' + row.email + '"' +
                        'data-corporateposition="' + row.positionID + '"' +
                        'data-corporategender="' + row.gender + '"' +
                        'data-utype="' + row.userType + '"' +
                        'data-corporateid="' + row.corporateID + '"' +
                        'data-displayimg="' + row.filePath + '"' +
                        'data-vipstats="' + row.isVIP + '> ' +
                        '<svg width="11" height="10" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                        '<path d="M0 12.3047V1.19576C0 1.1829 0.0192864 1.06075 0.0578592 0.829315L6.59595 6.42237L0.0771456 12.6905C0.0257152 12.5104 0 12.3819 0 12.3047V12.3047ZM0.867888 0.0578592C0.957891 0.0192864 1.06718 0 1.19576 0H18.8042C18.92 0 19.0357 0.0192864 19.1514 0.0578592L12.594 5.6702L11.7261 6.36451L10.0096 7.77242L8.29315 6.36451L7.42526 5.6702L0.867888 0.0578592ZM0.887174 13.4426L7.46384 7.13597L10.0096 9.19961L12.5554 7.13597L19.1321 13.4426C19.0293 13.4812 18.92 13.5005 18.8042 13.5005H1.19576C1.0929 13.5005 0.990035 13.4812 0.887174 13.4426V13.4426ZM13.4233 6.42237L19.9421 0.829315C19.9807 0.945034 20 1.06718 20 1.19576V12.3047C20 12.4204 19.9807 12.549 19.9421 12.6905L13.4233 6.42237Z" fill="black"/>' +
                        '</svg>' +
                        '<span>Send Email</span>' +
                        '</a>' +
                        '</div>' +
                        '</div>';


                    return tdbuttons;
                }
            },
            {
                data: 'username'
            },
            {
                data: 'email'
            },
            {
                data: 'gender'
            },
            {
                data: 'corporatename'
            },
            {
                data: 'position'
            },
            {
                data: 'status'
            },
            {
                data: 'isVIP',
                render: function (data, type, row) {
                    if (data == 1) {
                        return "Yes";
                    }
                    else {
                        return "No";
                    }
                }
            },
            {
                data: 'dateCreated'
            }
        ]
    });
}
var familyMemTable;
var corpfamilyMemTable;
async function displayFamilyMember() {
    
    var data = {};
    data.FamilyUserId = FamilyUserId;
    //data.page = spanval;
    //data.pageSize = spanval;

    //$.ajax({
    //    url: '/Register/PostDisplayVIPFamilyMember',
    //    //async: false,
    //    data: {
    //        data: data,
    //    },
    //    type: "POST",
    //    datatype: "json",
    //    success: function (data) {
    //        //console.log(data);
    //        familyMemberTable.clear().draw();
    //        corpfamilyMemberTable.clear().draw();
    //        for (var i = 0; i < data[0].data.length; i++) {
    //            //if (data[0].data.length == 0) {
    //            //    familyMemberTables.style.display = "none";
    //            //    corpfamilyMemberTables.style.display = "none";
    //            //}
    //            //else {
    //            //    familyMemberTables.style.display = "block";
    //            //    corpfamilyMemberTables.style.display = "block";

    //            //}
    //            var tdbuttons =
    //                '<div class="approve-btn">' +
    //                //"<input type='button' value='Approve' id='approveBtn' />" +

    //                '<a id="approveBtn"' +
    //                '  data-id="' + data[0].data[i].id +
    //                '" data-fullname="' + data[0].data[i].fullname +
    //                '" data-relationship="' + data[0].data[i].relationship +
    //                '" data-familyuserid="' + data[0].data[i].familyUserId +
    //                '" data-applicationstatus="' + data[0].data[i].applicationStatus +
    //                '" data-status="' + data[0].data[i].status +
    //                '" data-datecreated="' + data[0].data[i].dateCreated +
    //                '">' +
    //                "<span >Approve</span>" + " </a>" +

    //                '<a id="declineBtn"' +
    //                '  data-id="' + data[0].data[i].id +
    //                '" data-fullname="' + data[0].data[i].fullname +
    //                '" data-relationship="' + data[0].data[i].relationship +
    //                '" data-familyuserid="' + data[0].data[i].familyUserId +
    //                '" data-applicationstatus="' + data[0].data[i].applicationStatus +
    //                '" data-status="' + data[0].data[i].status +
    //                '" data-datecreated="' + data[0].data[i].dateCreated +
    //                '">' +
    //                "<span >Decline</span>" + " </a>" +
    //                "</div > ";
    //            if (data[0].data[i].applicationStatus == "Approved") {
    //                tdbuttons =
    //                    '<div class="approve-btn">' +
    //                    '<a id="declineBtn"' +
    //                    '  data-id="' + data[0].data[i].id +
    //                    '" data-fullname="' + data[0].data[i].fullname +
    //                    '" data-relationship="' + data[0].data[i].relationship +
    //                    '" data-familyuserid="' + data[0].data[i].familyUserId +
    //                    '" data-applicationstatus="' + data[0].data[i].applicationStatus +
    //                    '" data-status="' + data[0].data[i].status +
    //                    '" data-datecreated="' + data[0].data[i].dateCreated +
    //                    '">' +
    //                    "<span >Decline</span>" + " </a>" +
    //                    "</div > ";
    //            }
    //            $('#family-member-table').dataTable().fnAddData([
    //                '<td><p>' + data[0].data[i].fullname + '</p></td>',
    //                '<td><p>' + data[0].data[i].relationship + '</p></td>',
    //                '<td><p>' + data[0].data[i].applicationStatus + '</p></td>',
    //                '<td><p>' + data[0].data[i].dateCreated + '</p></td>',
    //                //'<td><p>' + data[0].data[i].status + '</p></td>',
    //                '<td><p>' + tdbuttons + '</p></td>'
    //            ]);
    //            $('#corporate-family-member-table').dataTable().fnAddData([
    //                '<td><p>' + data[0].data[i].fullname + '</p></td>',
    //                '<td><p>' + data[0].data[i].relationship + '</p></td>',
    //                '<td><p>' + data[0].data[i].applicationStatus + '</p></td>',
    //                '<td><p>' + data[0].data[i].dateCreated + '</p></td>',
    //                //'<td><p>' + data[0].data[i].status + '</p></td>',
    //                '<td><p>' + tdbuttons + '</p></td>'
    //            ]);

    //        }

    //    }

    //});
    if (DataTable.isDataTable('#family-member-table')) {
        familyMemTable.destroy();
    }
    if (DataTable.isDataTable('#corporate-family-member-table')) {
        corpfamilyMemTable.destroy();
    }
    familyMemTable = new DataTable('#family-member-table', {
        ajax: {
            url: "/Register/PostDisplayVIPFamilyMember",
            data: {
                data: data,
            },
            type: "POST",
            dataType: "json",
            processing: true,
            serverSide: true,
            complete: function (xhr) {
                //console.log(xhr);
            },
            error: function (err) {
                //alert(err.responseText);
                alert("There was an Error When Loading Data...");
            }
        },
        columnDefs: [
            { "width": "150px", "targets": 2 },
            { "width": "150px", "targets": 4 }
        ],
        columns: [
            
            {
                data: 'fullname'
            },
            {
                data: 'relationship'
            },
            {
                data: 'applicationStatus'
            },
            {
                data: 'dateCreated',
                render: function (data, type, row) {
                    return type;
                }
            },
            {
                data: 'id',
                render: function (data, type, row) {
                    var tdbuttons =
                        '<div class="approve-btn">' +
                        //"<input type='button' value='Approve' id='approveBtn' />" +

                        '<a id="approveBtn"' +
                        '  data-id="' + data +
                        '" data-fullname="' + row.fullname +
                        '" data-relationship="' + row.relationship +
                        '" data-familyuserid="' + row.familyUserId +
                        '" data-applicationstatus="' + row.applicationStatus +
                        '" data-status="' + row.status +
                        '" data-datecreated="' + row.dateCreated +
                        '">' +
                        "<span >Approve</span>" + " </a>" +

                        '<a id="declineBtn"' +
                        '  data-id="' + data +
                        '" data-fullname="' + row.fullname +
                        '" data-relationship="' + row.relationship +
                        '" data-familyuserid="' + row.familyUserId +
                        '" data-applicationstatus="' + row.applicationStatus +
                        '" data-status="' + row.status +
                        '" data-datecreated="' + row.dateCreated +
                        '">' +
                        "<span >Decline</span>" + " </a>" +
                        "</div > ";
                    if (row.applicationStatus == "Approved") {
                        tdbuttons =
                            '<div class="approve-btn">' +
                            '<a id="declineBtn"' +
                            '  data-id="' + data +
                            '" data-fullname="' + row.fullname +
                            '" data-relationship="' + row.relationship +
                            '" data-familyuserid="' + row.familyUserId +
                            '" data-applicationstatus="' + row.applicationStatus +
                            '" data-status="' + row.status +
                            '" data-datecreated="' + row.dateCreated +
                            '">' +
                            "<span >Decline</span>" + " </a>" +
                            "</div > ";
                    }

                    return tdbuttons;
                }
            },
        ]
    });
    corpfamilyMemTable = new DataTable('#corporate-family-member-table', {
        ajax: {
            url: "/Register/PostDisplayVIPFamilyMember",
            data: {
                data: data,
            },
            type: "POST",
            dataType: "json",
            processing: true,
            serverSide: true,
            complete: function (xhr) {
                //console.log(xhr);
            },
            error: function (err) {
                //alert(err.responseText);
                alert("There was an Error When Loading Data...");
            }
        },
        columnDefs: [
            {
                "className": "dt-left",
                "targets": "_all"
            }
        ],
        columns: [

            {
                data: 'fullname'
            },
            {
                data: 'relationship'
            },
            {
                data: 'applicationStatus'
            },
            {
                data: 'dateCreated',
                render: function (data, type, row) {
                    return data.substring(0, 10);
                }
            },
            {
                data: 'id',
                render: function (data, type, row) {
                    var tdbuttons =
                        '<div class="approve-btn">' +
                        //"<input type='button' value='Approve' id='approveBtn' />" +

                        '<a id="corpapproveBtn"' +
                        '  data-id="' + data +
                        '" data-fullname="' + row.fullname +
                        '" data-relationship="' + row.relationship +
                        '" data-familyuserid="' + row.familyUserId +
                        '" data-applicationstatus="' + row.applicationStatus +
                        '" data-status="' + row.status +
                        '" data-datecreated="' + row.dateCreated +
                        '">' +
                        "<span >Approve</span>" + " </a>" +

                        '<a id="corpdeclineBtn"' +
                        '  data-id="' + data +
                        '" data-fullname="' + row.fullname +
                        '" data-relationship="' + row.relationship +
                        '" data-familyuserid="' + row.familyUserId +
                        '" data-applicationstatus="' + row.applicationStatus +
                        '" data-status="' + row.status +
                        '" data-datecreated="' + row.dateCreated +
                        '">' +
                        "<span >Decline</span>" + " </a>" +
                        "</div > ";
                    if (row.applicationStatus == "APPROVED") {
                        tdbuttons =
                            '<div class="approve-btn">' +
                            '<a id="corpdeclineBtn"' +
                            '  data-id="' + data +
                            '" data-fullname="' + row.fullname +
                            '" data-relationship="' + row.relationship +
                            '" data-familyuserid="' + row.familyUserId +
                            '" data-applicationstatus="' + row.applicationStatus +
                            '" data-status="' + row.status +
                            '" data-datecreated="' + row.dateCreated +
                            '">' +
                            "<span >Decline</span>" + " </a>" +
                            "</div > ";
                    }

                    return tdbuttons;
                }
            },
        ],
            processing: true,
    });


}
async function editUserRegistration() {
    var familyMemberTables = document.getElementById("family-member"); 
    var corpfamilyMemberTables = document.getElementById("corporate-family-member"); 
    $('#add-newuser').click(function () {
        familyMemberTables.style.display = "none";
    }); 
    $('#add-corporate-user').click(function () {
        corpfamilyMemberTables.style.display = "none";
    });
    $('#register-table').on('click', '.tbl-edit', function () {
        isFmilyUserVIP = $(this).data("vipstats");
        FamilyUserId = $(this).data("id");

        //console.log(isFmilyUserVIP);
        //console.log(isFmilyUserVIP);
        if (isFmilyUserVIP == 1) {
            familyMemberTables.style.display = "block";
            displayFamilyMember();
        }
        else {
            familyMemberTables.style.display = "none";
        }
    });
    
    $('#corporate-user-table').on('click', '.corp-tbl-edit', function () {
        isFmilyUserVIP = $(this).data("vipstats");
        FamilyUserId = $(this).data("id");
        //console.log(isFmilyUserVIP);
        if (isFmilyUserVIP == 1) {
            corpfamilyMemberTables.style.display = "block";
            displayFamilyMember();
        }
        else {
            corpfamilyMemberTables.style.display = "none";
        }
    });
}
var id;
var familyMemberStatus;
async function changeFamilyMemberStatus() {
    $('#family-member-table').on('click', '#approveBtn', function () {
        message = 'Are you sure you want to Approve?';
        id = $(this).data("id");
        familyMemberStatus = "APPROVED";

        updateFamilyMemberStatus();
    });
    $('#family-member-table').on('click', '#declineBtn', function () {
        message = 'Are you sure you want to Decline?';
        id = $(this).data("id");
        familyMemberStatus = "PENDING";
        updateFamilyMemberStatus();
        
    });
    $('#corporate-family-member-table').on('click', '#corpapproveBtn', function () {
        message = 'Are you sure you want to Approve?';
        id = $(this).data("id");
        familyMemberStatus = "APPROVED";
        
        updateFamilyMemberStatus();

    });
    $('#corporate-family-member-table').on('click', '#corpdeclineBtn', function () {
        message = 'Are you sure you want to Decline?';
        id = $(this).data("id");
        familyMemberStatus = "PENDING";

        updateFamilyMemberStatus();

    });
}
async function updateFamilyMemberStatus() {

    iziToast.question({
        timeout: 20000,
        close: false,
        overlay: true,
        id: 'question',
        zindex: 999,
        title: 'Confirmation',
        message: message,
        position: 'center',

        buttons: [
            ['<button><b>YES</b></button>', function (instance, toast) {
                var data = {};
                data.id = id;
                data.status = familyMemberStatus;
               
                $.ajax({
                    url: '/Register/UpdateFamilyMember',
                    //async: false,
                    data: {
                        data: data,
                    },
                    type: "POST",
                    datatype: "json",
                    success: function () {
                        displayFamilyMember();

                    }

                });
                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

            }, true],
            ['<button>NO</button>', function (instance, toast) {

                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

            }],
        ]
    });
}
async function getCorporateRegistration() {
    var data = {};

    data.corpId = corporateFilter;
    data.filterName = companyNameFilter;
    data.posId = positionFilter;
    data.gender = genderFilter;
    data.isVIP = isVipFilter;
    data.status = statusFilter;
    data.page = 1;
    //console.log(data);
    {//data.page = spanval;
    //console.log(data);
    //$.ajax({
    //    url: '/Register/PostDisplayCorporateList',
    //    //async: false,
    //    data: {
    //        data: data,
    //    },
    //    type: "POST",
    //    datatype: "json",
    //    success: function (data) {
    //        //console.log(data);
    //
    //        //prev = data[0].prevPage;
    //        //next = data[0].nextPage;
    //        //currpage = data[0].currentPage;
    //        //spanval = data[0].currentPage;
    //
    //
    //        //console.log(data[0].items.length);
    //        //console.log(data[0]);
    //        corusertable.clear().draw();
    //        for (var i = 0; i < data.length; i++) {
    //
    //            if (data[i].isVIP == 1) {
    //                data[i].isVIP = "Yes";
    //            }
    //            else {
    //                data[i].isVIP = "No";
    //            }
    //            var img = data[i].filePath;
    //            if (img == "") {
    //                img = "https://www.alfardanoysterprivilegeclub.com/assets/img/defaultavatar.png";
    //            } else {
    //                img = data[i].filePath;
    //            }
    //
    //            var tdbuttons = '<div class="data-img">' +
    //                "<img src=" + img +
    //                " alt=" + data[i].fname +
    //                ' width="100%" />' +
    //                "</div>" +
    //                "<div>" +
    //                "<p>" + data[i].employeeID +
    //                "</p>" +
    //                "<p>" + data[i].fname +
    //                " " + data[i].lname +
    //                "</p>" +
    //                '<div class="actions"><a class="corp-tbl-edit" data-id="' + data[i].id +
    //                '" data-username="' + data[i].username +
    //                '" data-employeeid="' + data[i].employeeID +
    //                '" data-fname="' + data[i].fname +
    //                '" data-lname="' + data[i].lname +
    //                '" data-email="' + data[i].email +
    //                '" data-corporateposition="' + data[i].positionID +
    //                '"  data-corporategender="' + data[i].gender +
    //                '" data-utype="' + data[i].userType +
    //                '" data-corporateid="' + data[i].corporateID +
    //                '"  data-displayimg="' + data[i].filePath +
    //                '"  data-vipstats="' + data[i].isVIP + '">' +
    //
    //                '<svg width="11" height="11" viewBox="0 0 11 11" fill="none"xmlns="http://www.w3.org/2000/svg">' +
    //                '<path d="M5.02558 1.92456H1.89457C1.65732 1.92456 1.42978 2.0164 1.26201 2.17986C1.09425 2.34333 1 2.56504 1 2.79621V8.89779C1 9.12896 1.09425 9.35067 1.26201 9.51414C1.42978 9.6776 1.65732 9.76944 1.89457 9.76944H8.15659C8.39385 9.76944 8.62139 9.6776 8.78915 9.51414C8.95692 9.35067 9.05117 9.12896 9.05117 8.89779V5.847"' + 'stroke="black"' + 'stroke-linecap="round"' + 'stroke-linejoin="round"/>' + '<path d="M8.38023 1.27079C8.55817 1.09741 8.79951 1 9.05116 1C9.30281 1 9.54415 1.09741 9.72209 1.27079C9.90003 1.44417 10 1.67933 10 1.92453C10 2.16973 9.90003 2.40488 9.72209 2.57827L5.47286 6.71862L3.68372 7.15445L4.131 5.41114L8.38023 1.27079Z"' +
    //                'stroke="black"' + 'stroke-linecap="round"' + 'stroke-linejoin="round"/>' +
    //                "</svg>" +
    //                "<span >Edit</span>" + " </a>" +
    //                '<a class="corp-tbl-delete" data-id="' + data[i].id +
    //                '"  data-username="' + data[i].username +
    //                '" data-employeeid="' + data[i].employeeID +
    //                '" data-fname="' + data[i].fname +
    //                '" data-lname="' + data[i].lname +
    //                '" data-email="' + data[i].email +
    //                '" data-corporateposition="' + data[i].positionID +
    //                '"  data-corporategender="' + data[i].gender +
    //
    //                '" >' + '<svg width="11" height="10" viewBox="0 0 11 10" fill="none"  xmlns="http://www.w3.org/2000/svg">' +
    //                '<path d="M2.56574 1C2.56574 0.734784 2.67387 0.48043 2.86634 0.292893C3.0588 0.105357 3.31985 0 3.59204 0H6.67092C6.94311 0 7.20416 0.105357 7.39663 0.292893C7.58909 0.48043 7.69722 0.734784 7.69722 1V2H9.74981C9.88591 2 10.0164 2.05268 10.1127 2.14645C10.2089 2.24021 10.263 2.36739 10.263 2.5C10.263 2.63261 10.2089 2.75979 10.1127 2.85355C10.0164 2.94732 9.88591 3 9.74981 3H9.20126L8.75636 9.071C8.73793 9.32329 8.62207 9.55941 8.43211 9.73179C8.24215 9.90417 7.99221 10 7.73263 10H2.52982C2.27024 10 2.0203 9.90417 1.83034 9.73179C1.64038 9.55941 1.52452 9.32329 1.50609 9.071L1.06222 3H0.513148C0.377053 3 0.246531 2.94732 0.150298 2.85355C0.0540636 2.75979 0 2.63261 0 2.5C0 2.36739 0.0540636 2.24021 0.150298 2.14645C0.246531 2.05268 0.377053 2 0.513148 2H2.56574V1ZM3.59204 2H6.67092V1H3.59204V2ZM2.09056 3L2.53033 9H7.73314L8.17291 3H2.09056ZM4.10518 4C4.24128 4 4.3718 4.05268 4.46803 4.14645C4.56427 4.24021 4.61833 4.36739 4.61833 4.5V7.5C4.61833 7.63261 4.56427 7.75979 4.46803 7.85355C4.3718 7.94732 4.24128 8 4.10518 8C3.96909 8 3.83857 7.94732 3.74233 7.85355C3.6461 7.75979 3.59204 7.63261 3.59204 7.5V4.5C3.59204 4.36739 3.6461 4.24021 3.74233 4.14645C3.83857 4.05268 3.96909 4 4.10518 4ZM6.15778 4C6.29387 4 6.42439 4.05268 6.52063 4.14645C6.61686 4.24021 6.67092 4.36739 6.67092 4.5V7.5C6.67092 7.63261 6.61686 7.75979 6.52063 7.85355C6.42439 7.94732 6.29387 8 6.15778 8C6.02168 8 5.89116 7.94732 5.79493 7.85355C5.69869 7.75979 5.64463 7.63261 5.64463 7.5V4.5C5.64463 4.36739 5.69869 4.24021 5.79493 4.14645C5.89116 4.05268 6.02168 4 6.15778 4Z"' +
    //                'fill="black"/>' +
    //                "</svg>" +
    //                "<span>Delete</span></a>" +
    //                '<a class="corp-tbl-sendemail" data-id="' + data[i].id +
    //                '"  data-username="' + data[i].username +
    //                '" data-employeeid="' + data[i].employeeID +
    //                '" data-fname="' + data[i].fname +
    //                '" data-lname="' + data[i].lname +
    //                '" data-corpemail="' + data[i].email +
    //                '" data-corporateposition="' + data[i].positionID +
    //                '"  data-corporategender="' + data[i].gender +
    //                '"  data-emailstatus="' + data[i].status + '" >' +
    //
    //                '<svg width="11" height="10" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M0 12.3047V1.19576C0 1.1829 0.0192864 1.06075 0.0578592 0.829315L6.59595 6.42237L0.0771456 12.6905C0.0257152 12.5104 0 12.3819 0 12.3047V12.3047ZM0.867888 0.0578592C0.957891 0.0192864 1.06718 0 1.19576 0H18.8042C18.92 0 19.0357 0.0192864 19.1514 0.0578592L12.594 5.6702L11.7261 6.36451L10.0096 7.77242L8.29315 6.36451L7.42526 5.6702L0.867888 0.0578592ZM0.887174 13.4426L7.46384 7.13597L10.0096 9.19961L12.5554 7.13597L19.1321 13.4426C19.0293 13.4812 18.92 13.5005 18.8042 13.5005H1.19576C1.0929 13.5005 0.990035 13.4812 0.887174 13.4426V13.4426ZM13.4233 6.42237L19.9421 0.829315C19.9807 0.945034 20 1.06718 20 1.19576V12.3047C20 12.4204 19.9807 12.549 19.9421 12.6905L13.4233 6.42237Z" fill="black"/>' +
    //                "</svg>" + "<span>Send Email</span></a>" +
    //                "</div></div>";
    //            $('#corporate-user-table').dataTable().fnAddData([
    //
    //                '<td>' + tdbuttons + '</td>',
    //                // '<td><p>' + data[i].promoReleaseText+'</p></td>',
    //                '<td><p>' + data[i].username + '</p></td>',
    //                '<td><p>' + data[i].email + '</p></td>',
    //                '<td><p>' + data[i].gender + '</p></td>',
    //                '<td><p>' + data[i].corporatename + '</p></td>',
    //                '<td><p>' + data[i].position + '</p></td>',
    //                '<td><p>' + data[i].status + '</p></td>',
    //                '<td><p>' + data[i].isVIP + '</p></td>',
    //                '<td><p>' + data[i].dateCreated + '</p></td>'
    //            ]);
    //
    //        }
    //
    //    }
    //
        //});
    }
    if (DataTable.isDataTable('#corporate-user-table')) {
        corporateAdminListTable.destroy();
    }
    corporateAdminListTable = new DataTable('#corporate-user-table', {
        ajax: {
            url: "/Register/PostDisplayCorporateList",
            type: "POST",
            data: {
                data: data
            },
            dataType: "json",
            processing: true,
            serverSide: true,
            complete: function (xhr) {
                //console.log(xhr);
            },
            error: function (err) {
                //alert(err.responseText);
                alert("There was an Error When Loading Data...");
            }
        },
        columnDefs: [
                { "width": "150px", "targets": 2 },
                { "width": "150px", "targets": 4 }
            ],
        columns: [
            {
                data: 'fname',
                render: function (data, type, row) {
                    var img = row.filePath;
                    if (img == "") {
                        img = "https://www.alfardanoysterprivilegeclub.com/assets/img/defaultavatar.png";
                    } else {
                        img = row.filePath;
                    }

                    var tdbuttons = '<div class="data-img">' +
                        '<img src="' + img + '" alt= "' + data + '" width="100%" />' +
                        '</div>' +
                        '<div>' +
                        '<p> ' + row.employeeID + '</p>' +
                        '<p> ' + data + ' ' + row.lname + '</p>' +
                        '<div class="actions">' +
                        '<a class="corp-tbl-edit" ' +
                        'data-id="' + row.id + '"' +
                        'data-username="' + row.username + '"' +
                        'data-employeeid="' + row.employeeID + '"' +
                        'data-fname="' + data + '"' +
                        'data-lname="' + row.lname + '"' +
                        'data-email="' + row.email + '"' +
                        'data-corporateposition="' + row.positionID + '"' +
                        'data-corporategender="' + row.gender + '"' +
                        'data-utype="' + row.userType + '"' +
                        'data-corporateid="' + row.corporateID + '"' +
                        'data-corpdisplayimg="' + row.filePath + '"' +
                        'data-membershipid="' + row.membershipID + '"' +
                        'data-vipstats="' + row.isVIP + '"> ' +
                        '<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                        '<path d="M5.02558 1.92456H1.89457C1.65732 1.92456 1.42978 2.0164 1.26201 2.17986C1.09425 2.34333 1 2.56504 1 2.79621V8.89779C1 9.12896 1.09425 9.35067 1.26201 9.51414C1.42978 9.6776 1.65732 9.76944 1.89457 9.76944H8.15659C8.39385 9.76944 8.62139 9.6776 8.78915 9.51414C8.95692 9.35067 9.05117 9.12896 9.05117 8.89779V5.847" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>' +
                        '<path d="M8.38023 1.27079C8.55817 1.09741 8.79951 1 9.05116 1C9.30281 1 9.54415 1.09741 9.72209 1.27079C9.90003 1.44417 10 1.67933 10 1.92453C10 2.16973 9.90003 2.40488 9.72209 2.57827L5.47286 6.71862L3.68372 7.15445L4.131 5.41114L8.38023 1.27079Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>' +
                        '</svg>' +
                        '<span >Edit</span>' +
                        '</a>' +
                        '<a class="corp-tbl-delete" ' +
                        'data-id="' + row.id + '"' +
                        'data-username="' + row.username + '"' +
                        'data-employeeid="' + row.employeeID + '"' +
                        'data-fname="' + data + '"' +
                        'data-lname="' + row.lname + '"' +
                        'data-email="' + row.email + '"' +
                        'data-corporateposition="' + row.positionID + '"' +
                        'data-corporategender="' + row.gender + '"' +
                        'data-utype="' + row.userType + '"' +
                        'data-corporateid="' + row.corporateID + '"' +
                        'data-displayimg="' + row.filePath + '"' +
                        'data-vipstats="' + row.isVIP + '> ' +
                        '<svg width="11" height="10" viewBox="0 0 11 10" fill="none"  xmlns="http://www.w3.org/2000/svg">' +
                        '<path d="M2.56574 1C2.56574 0.734784 2.67387 0.48043 2.86634 0.292893C3.0588 0.105357 3.31985 0 3.59204 0H6.67092C6.94311 0 7.20416 0.105357 7.39663 0.292893C7.58909 0.48043 7.69722 0.734784 7.69722 1V2H9.74981C9.88591 2 10.0164 2.05268 10.1127 2.14645C10.2089 2.24021 10.263 2.36739 10.263 2.5C10.263 2.63261 10.2089 2.75979 10.1127 2.85355C10.0164 2.94732 9.88591 3 9.74981 3H9.20126L8.75636 9.071C8.73793 9.32329 8.62207 9.55941 8.43211 9.73179C8.24215 9.90417 7.99221 10 7.73263 10H2.52982C2.27024 10 2.0203 9.90417 1.83034 9.73179C1.64038 9.55941 1.52452 9.32329 1.50609 9.071L1.06222 3H0.513148C0.377053 3 0.246531 2.94732 0.150298 2.85355C0.0540636 2.75979 0 2.63261 0 2.5C0 2.36739 0.0540636 2.24021 0.150298 2.14645C0.246531 2.05268 0.377053 2 0.513148 2H2.56574V1ZM3.59204 2H6.67092V1H3.59204V2ZM2.09056 3L2.53033 9H7.73314L8.17291 3H2.09056ZM4.10518 4C4.24128 4 4.3718 4.05268 4.46803 4.14645C4.56427 4.24021 4.61833 4.36739 4.61833 4.5V7.5C4.61833 7.63261 4.56427 7.75979 4.46803 7.85355C4.3718 7.94732 4.24128 8 4.10518 8C3.96909 8 3.83857 7.94732 3.74233 7.85355C3.6461 7.75979 3.59204 7.63261 3.59204 7.5V4.5C3.59204 4.36739 3.6461 4.24021 3.74233 4.14645C3.83857 4.05268 3.96909 4 4.10518 4ZM6.15778 4C6.29387 4 6.42439 4.05268 6.52063 4.14645C6.61686 4.24021 6.67092 4.36739 6.67092 4.5V7.5C6.67092 7.63261 6.61686 7.75979 6.52063 7.85355C6.42439 7.94732 6.29387 8 6.15778 8C6.02168 8 5.89116 7.94732 5.79493 7.85355C5.69869 7.75979 5.64463 7.63261 5.64463 7.5V4.5C5.64463 4.36739 5.69869 4.24021 5.79493 4.14645C5.89116 4.05268 6.02168 4 6.15778 4Z" fill="black"/>' +
                        '</svg>' +
                        '<span>Delete</span>' +
                        '</a>' +
                        '<a class="corp-tbl-sendemail" ' +
                        'data-id="' + row.id + '"' +
                        'data-username="' + row.username + '"' +
                        'data-employeeid="' + row.employeeID + '"' +
                        'data-fname="' + data + '"' +
                        'data-lname="' + row.lname + '"' +
                        'data-email="' + row.email + '"' +
                        'data-corporateposition="' + row.positionID + '"' +
                        'data-corporategender="' + row.gender + '"' +
                        'data-utype="' + row.userType + '"' +
                        'data-corporateid="' + row.corporateID + '"' +
                        'data-displayimg="' + row.filePath + '"' +
                        'data-vipstats="' + row.isVIP + '> ' +
                        '<svg width="11" height="10" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                        '<path d="M0 12.3047V1.19576C0 1.1829 0.0192864 1.06075 0.0578592 0.829315L6.59595 6.42237L0.0771456 12.6905C0.0257152 12.5104 0 12.3819 0 12.3047V12.3047ZM0.867888 0.0578592C0.957891 0.0192864 1.06718 0 1.19576 0H18.8042C18.92 0 19.0357 0.0192864 19.1514 0.0578592L12.594 5.6702L11.7261 6.36451L10.0096 7.77242L8.29315 6.36451L7.42526 5.6702L0.867888 0.0578592ZM0.887174 13.4426L7.46384 7.13597L10.0096 9.19961L12.5554 7.13597L19.1321 13.4426C19.0293 13.4812 18.92 13.5005 18.8042 13.5005H1.19576C1.0929 13.5005 0.990035 13.4812 0.887174 13.4426V13.4426ZM13.4233 6.42237L19.9421 0.829315C19.9807 0.945034 20 1.06718 20 1.19576V12.3047C20 12.4204 19.9807 12.549 19.9421 12.6905L13.4233 6.42237Z" fill="black"/>' +
                        '</svg>' +
                        '<span>Send Email</span>' +
                        '</a>' +
                        '</div>' +
                        '</div>';


                    return tdbuttons;
                }
            },
            {
                data: 'username'
            },
            {
                data: 'email'
            },
            {
                data: 'gender'
            },
            {
                data: 'corporatename'
            },
            {
                data: 'position'
            },
            {
                data: 'status'
            },
            {
                data: 'isVIP',
                render: function (data, type, row) {
                    if (data == 1) {
                        return "Yes";
                    }
                    else {
                        return "No";
                    }
                }
            },
            {
                data: 'dateCreated'
            }
        ]
    });
}

async function getOysterAdmin() {
    if (DataTable.isDataTable('#adminuser-table')) {
        oysterAdminListTable.destroy();
    }
    oysterAdminListTable = new DataTable('#adminuser-table', {
        ajax: {
            url: "/Register/GetAdminUserList",
            data: {
               
            },
            dataType: "json",
            processing: true,
            serverSide: true,
            complete: function (xhr) {
                //console.log(xhr);
            },
            error: function (err) {
                //alert(err.responseText);
                alert("There was an Error When Loading Data...");
            }
        },
        columnDefs: [
            { "width": "150px", "targets": 2 },
            { "width": "150px", "targets": 4 }
        ],
        columns: [
            {
                data: 'fname',
                render: function (data, type, row) {
                    var img = row.filePath;
                    if (img == "") {
                        img = "https://www.alfardanoysterprivilegeclub.com/assets/img/defaultavatar.png";
                    } else {
                        img = row.filePath;
                    }

                    var tdbuttons = '<div class="data-img">' +
                        "<img src=" + img + " alt=" + data + ' width="100%" />' +
                        "</div>" + "<div>" + "<p>" + row.employeeID + "</p>" +
                        "<p>" + data + " " + row.lname + "</p>" +
                        '<div class="actions"><a class="admin-tbl-edit" data-adminid="' + row.id +
                        '" data-adminusername="' + row.username +
                        '" data-adminemployeeid="' + row.employeeID +
                        '" data-adminfname="' + data +
                        '" data-adminlname="' + row.lname +
                        '" data-adminemail="' + row.email +
                        '" data-adminpos="' + row.positionID +
                        '"  data-admingender="' + row.gender +
                        '"  data-admindisplayimg="' + row.filePath + '">' +
                        '<svg width="11" height="11" viewBox="0 0 11 11" fill="none"xmlns="http://www.w3.org/2000/svg">' +
                        '<path d="M5.02558 1.92456H1.89457C1.65732 1.92456 1.42978 2.0164 1.26201 2.17986C1.09425 2.34333 1 2.56504 1 2.79621V8.89779C1 9.12896 1.09425 9.35067 1.26201 9.51414C1.42978 9.6776 1.65732 9.76944 1.89457 9.76944H8.15659C8.39385 9.76944 8.62139 9.6776 8.78915 9.51414C8.95692 9.35067 9.05117 9.12896 9.05117 8.89779V5.847"' + 'stroke="black"' + 'stroke-linecap="round"' + 'stroke-linejoin="round"/>' + '<path d="M8.38023 1.27079C8.55817 1.09741 8.79951 1 9.05116 1C9.30281 1 9.54415 1.09741 9.72209 1.27079C9.90003 1.44417 10 1.67933 10 1.92453C10 2.16973 9.90003 2.40488 9.72209 2.57827L5.47286 6.71862L3.68372 7.15445L4.131 5.41114L8.38023 1.27079Z"' + 'stroke="black"' + 'stroke-linecap="round"' + 'stroke-linejoin="round"/>' +
                        "</svg>" +
                        "<span >Edit</span>" +
                        " </a>" +
                        '<a class="admin-tbl-delete" data-id="' + row.id +
                        '"  data-username="' + row.username +
                        '" data-employeeid="' + row.employeeID +
                        '" data-fname="' + row.fname +
                        '" data-lname="' + row.lname +
                        '" data-email="' + row.email +
                        '" data-pos="' + row.positionID +
                        '"  data-gender="' + row.gender + '" >' +
                        '<svg width="11" height="10" viewBox="0 0 11 10" fill="none"  xmlns="http://www.w3.org/2000/svg">' +
                        '<path d="M2.56574 1C2.56574 0.734784 2.67387 0.48043 2.86634 0.292893C3.0588 0.105357 3.31985 0 3.59204 0H6.67092C6.94311 0 7.20416 0.105357 7.39663 0.292893C7.58909 0.48043 7.69722 0.734784 7.69722 1V2H9.74981C9.88591 2 10.0164 2.05268 10.1127 2.14645C10.2089 2.24021 10.263 2.36739 10.263 2.5C10.263 2.63261 10.2089 2.75979 10.1127 2.85355C10.0164 2.94732 9.88591 3 9.74981 3H9.20126L8.75636 9.071C8.73793 9.32329 8.62207 9.55941 8.43211 9.73179C8.24215 9.90417 7.99221 10 7.73263 10H2.52982C2.27024 10 2.0203 9.90417 1.83034 9.73179C1.64038 9.55941 1.52452 9.32329 1.50609 9.071L1.06222 3H0.513148C0.377053 3 0.246531 2.94732 0.150298 2.85355C0.0540636 2.75979 0 2.63261 0 2.5C0 2.36739 0.0540636 2.24021 0.150298 2.14645C0.246531 2.05268 0.377053 2 0.513148 2H2.56574V1ZM3.59204 2H6.67092V1H3.59204V2ZM2.09056 3L2.53033 9H7.73314L8.17291 3H2.09056ZM4.10518 4C4.24128 4 4.3718 4.05268 4.46803 4.14645C4.56427 4.24021 4.61833 4.36739 4.61833 4.5V7.5C4.61833 7.63261 4.56427 7.75979 4.46803 7.85355C4.3718 7.94732 4.24128 8 4.10518 8C3.96909 8 3.83857 7.94732 3.74233 7.85355C3.6461 7.75979 3.59204 7.63261 3.59204 7.5V4.5C3.59204 4.36739 3.6461 4.24021 3.74233 4.14645C3.83857 4.05268 3.96909 4 4.10518 4ZM6.15778 4C6.29387 4 6.42439 4.05268 6.52063 4.14645C6.61686 4.24021 6.67092 4.36739 6.67092 4.5V7.5C6.67092 7.63261 6.61686 7.75979 6.52063 7.85355C6.42439 7.94732 6.29387 8 6.15778 8C6.02168 8 5.89116 7.94732 5.79493 7.85355C5.69869 7.75979 5.64463 7.63261 5.64463 7.5V4.5C5.64463 4.36739 5.69869 4.24021 5.79493 4.14645C5.89116 4.05268 6.02168 4 6.15778 4Z"' +
                        'fill="black"/>' +
                        "</svg>" +
                        "<span>Delete</span></a>" +
                        "</div></div>";


                    return tdbuttons;
                }
            },
            {
                data: 'username'
            },
            {
                data: 'email'
            },
            {
                data: 'gender'
            },
            {
                data: 'corporatename'
            },
            {
                data: 'position'
            },
            {
                data: 'status'
            },
            {
                data: 'dateCreated'
            }
        ]
    });
}