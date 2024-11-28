var prev = 0;
var next = 0;
var spanval = 0;
var currpage = "";



let mytopRestoChartPie = new Chart();
var topResto = document.getElementById("topRestoChart").getContext("2d");

let mytopHotelChartPie = new Chart();
var topHotel = document.getElementById("topHotelChart").getContext("2d");

let mytopStoreChartPie = new Chart();
var topStore = document.getElementById("topStoreChart").getContext("2d");

let mytopWellnessChartPie = new Chart();
var topWellness = document.getElementById("topWellnessChart").getContext("2d");

let mytopOfferChartPie = new Chart();
var topOffer = document.getElementById("topOfferChart").getContext("2d");

//Date Filter Variables
var type = 0;
var startdate;
var enddate;
var day = 0;
var apiEndpoint;

const dateToday = new Date();
//Current Date
let currentDay = dateToday.getDate().toString().padStart(2, '0');;
let currentMonth = (dateToday.getMonth() + 1).toString().padStart(2, '0');;
let currentYear = dateToday.getFullYear();
let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
//Last Week Date
var x = 7; // go back 7 days!
dateToday.setDate(dateToday.getDate() - x);
let lastWeekDay = dateToday.getDate().toString().padStart(2, '0');
let lastWeekMonth = (dateToday.getMonth() + 1).toString().padStart(2, '0');
let lastWeekYear = dateToday.getFullYear();
let lastWeekDate = `${lastWeekYear}-${lastWeekMonth}-${lastWeekDay}`;

startdate = lastWeekDate;
enddate = currentDate;

//top3 Details variables
var restoday = 0;
var restostartdate = lastWeekDate;
var restoenddate = currentDate;
var hotelday = 0;
var hotelstartdate = lastWeekDate;
var hotelenddate = currentDate;
var storeday = 0;
var storestartdate = lastWeekDate;
var storeenddate = currentDate;
var wellnessday = 0;
var wellnessstartdate = lastWeekDate;
var wellnessenddate = currentDate;
var offerday = 0;
var offerstartdate = lastWeekDate;
var offerenddate = currentDate;

// news feed clicks variable
var nfcday = 0;
var nfcstartdate = null;
var nfcendtdate = null;

// call to action variable
var ctastartdate = null;
var ctaendtdate = null;
var cat = "0";

//Number of Days Filter
var days = 0;

//Table
var cntTable;
var ctaTable;
var mcrTable;
async function companyInformationTableLayout() {
   

    companyInfo = $('#cInformations').DataTable({
        "columnDefs": [

            { "width": "280px", "targets": 0 },
            { "width": "180px", "targets": 1 },
            { "width": "180px", "targets": 2 },
            { "width": "280px", "targets": 3 },
            { "width": "180px", "targets": 4 },
            // { "width": "70px", "targets": 9 }
        ],
        "deferRender": true,
        "bPaginate": false,
        "bFilter": false,
        "stripeClasses": [],
        "ordering": false,
        "ordering": false,
        "info": false,
        "bInfo": false,
        "bAutoWidth": false,
        "bLengthChange": false,
        "aLengthMenu": [10],
        "paging": true,
        "searching": false,
        "oLanguage": { "sZeroRecords": "", "sEmptyTable": "" }
    });

}

async function companyInformationShowFilter() {
    var exportFilter = document.getElementById("exportFilter");
    var exportFiltersuccess = document.getElementById("exportFiltersuccess");
    var errorMessage = document.getElementById("filterFormError");
    
    $('#compInfoBtn').click(function () {
        exportFilter.style.display = "block";

    });
    $('#closeFilterbtn').click(function () {
        exportFilter.style.display = "none";
        document.getElementById("registered").checked = false;
        document.getElementById("unregistered").checked = false;
        document.getElementById("vip").checked = false;
        document.getElementById("userCount").checked = false;
        document.getElementById("vipUserCount").checked = false;
        document.getElementById("totalUserCount").checked = false;
        document.getElementById("showAll").checked = false;
    });
    $('#cancelFilter').click(function () {
        exportFilter.style.display = "none";
        document.getElementById("registered").checked = false;
        document.getElementById("unregistered").checked = false;
        document.getElementById("vip").checked = false;
        document.getElementById("userCount").checked = false;
        document.getElementById("vipUserCount").checked = false;
        document.getElementById("totalUserCount").checked = false;
        document.getElementById("showAll").checked = false;
    });

    
    $('#ciExportDone').click(function () {

        exportFiltersuccess.style.display = "none";
    });
}

async function getComponyInformation() {
   
    new DataTable('#cInformation', {
        ajax: {
            url: '/Dashboard/GetCompanyInformation',
            type: "GET",
            dataType: "json",
            processing: true,
            serverSide: true,
            complete: function (xhr) {
                 //console.log(xhr);
            },
            error: function (err) {
                alert(err.responseText);
            }
        },
        columns: [
            {
                data: 'corporateName',
                render: function (data, type, row) {
                    return '<p style="text-align: left">' + data + '</p>';
                }
            },
            {
                data: 'registered'
            },
            {
                data: 'unregistered'
            },
            {
                data: 'registeredVIP',
                render: function (data, type, row) {
                    let vip = '<td><p>' + data + '</p>' +
                            '<p style="font-size: 10px"> Remaining VIP count: ' + row.remainingVip + '</p></td > ';

                    return vip;
                }
                
            },
            {
                data: 'totalVIP'
            },
            {
                data: 'userCount'
            },
            {
                data: 'totalUser'
            }
        ]
    });
}
async function SearchComponyInformation() {
  
    var pageCounter = document.querySelector("#cInformation_wrapper .current");
    pageCounter.innerHTML = currpage;
    
    if (prev == 0) {
        $("#cInformation_prev").attr("disabled", true);
        $("#cInformation_prev").css("color", "gray").css("pointer-event", "none");
    }
    else {
        $("#cInformation_prev").attr("enabled", true);
        $("#cInformation_prev").css("color", "#c89328");
    }
    if (next == 0) {
        //console.log(next);

        $("#cInformation_next").attr("disabled", true);
        $("#cInformation_next").css("color", "gray").css("pointer-event", "none");
    }
    else {
        $("#cInformation_next").attr("enabled", true);
        $("#cInformation_next").css("color", "#c89328");
    }


    $('#counter').on('click', '.tbl-pagenumber', function () {
        spanval = $(this).text();
        $(".tbl-pagenumber").removeClass("active-page");

        $(this).addClass("active-page");
        paginateAuditTrail(spanval);

    });
    $('#cInformation_next').click(function () {
        if (next != 0) {
            spanval++;
            //console.log("Next page " + (next));
            //console.log("Next is Pressed " + (spanval));
            getComponyInformation();
        }
        
        //next = parseInt(next);
        //$(".tbl-pagenumber").removeClass("active-page");
        //console.log(next);
        //$("#spanId" + (next)).addClass("active-page");
        //paginateAuditTrail(next);
        
    });
    $('#cInformation_previous').click(function () {
        if (prev != 0) {
            spanval--;
            //console.log("Next page " + (prev));
            //console.log("Next is Pressed " + (spanval));
            getComponyInformation();
        }
        //prev = parseInt(prev);
        //$(".tbl-pagenumber").removeClass("active-page");
        //console.log(prev);
        //$("#spanId" + (prev)).addClass("active-page");
        //paginateAuditTrail(prev);

    });

   
}

async function filterCheckBox() {
    
    $('#showAll').change(function () {
        if (document.getElementById("showAll").checked == true) {
            document.getElementById("registered").checked = true;
            document.getElementById("unregistered").checked = true;
            document.getElementById("vip").checked = true;
            document.getElementById("userCount").checked = true;
            document.getElementById("vipUserCount").checked = true;
            document.getElementById("totalUserCount").checked = true;
        }
        if (document.getElementById("showAll").checked == false) {
            document.getElementById("registered").checked = false;
            document.getElementById("unregistered").checked = false;
            document.getElementById("vip").checked = false;
            document.getElementById("userCount").checked = false;
            document.getElementById("vipUserCount").checked = false;
            document.getElementById("totalUserCount").checked = false;
        }
    });
    $('#registered').change(function () {
        if (document.getElementById("registered").checked == false) {

            document.getElementById("showAll").checked = false;
        }
        if (
            document.getElementById("registered").checked == true &&
            document.getElementById("unregistered").checked == true &&
            document.getElementById("vip").checked == true &&
            document.getElementById("userCount").checked == true &&
            document.getElementById("vipUserCount").checked == true &&
            document.getElementById("totalUserCount").checked == true
            )
        {
            
            document.getElementById("showAll").checked = true;
        }
    });
    $('#unregistered').change(function () {
        if (document.getElementById("unregistered").checked == false) {

            document.getElementById("showAll").checked = false;
        }
        if (
            document.getElementById("registered").checked == true &&
            document.getElementById("unregistered").checked == true &&
            document.getElementById("vip").checked == true &&
            document.getElementById("userCount").checked == true &&
            document.getElementById("vipUserCount").checked == true &&
            document.getElementById("totalUserCount").checked == true
        ) {

            document.getElementById("showAll").checked = true;
        }
    });
    $('#vip').change(function () {
        if (document.getElementById("vip").checked == false) {

            document.getElementById("showAll").checked = false;
        }
        if (
            document.getElementById("registered").checked == true &&
            document.getElementById("unregistered").checked == true &&
            document.getElementById("vip").checked == true &&
            document.getElementById("userCount").checked == true &&
            document.getElementById("vipUserCount").checked == true &&
            document.getElementById("totalUserCount").checked == true
        ) {

            document.getElementById("showAll").checked = true;
        }
    });
    $('#userCount').change(function () {
        if (document.getElementById("userCount").checked == false) {

            document.getElementById("showAll").checked = false;
        }
        if (
            document.getElementById("registered").checked == true &&
            document.getElementById("unregistered").checked == true &&
            document.getElementById("vip").checked == true &&
            document.getElementById("userCount").checked == true &&
            document.getElementById("vipUserCount").checked == true &&
            document.getElementById("totalUserCount").checked == true
        ) {

            document.getElementById("showAll").checked = true;
        }
    });
    $('#vipUserCount').change(function () {
        if (document.getElementById("vipUserCount").checked == false) {

            document.getElementById("showAll").checked = false;
        }
        if (
            document.getElementById("registered").checked == true &&
            document.getElementById("unregistered").checked == true &&
            document.getElementById("vip").checked == true &&
            document.getElementById("userCount").checked == true &&
            document.getElementById("vipUserCount").checked == true &&
            document.getElementById("totalUserCount").checked == true
        ) {

            document.getElementById("showAll").checked = true;
        }
    });
    $('#totalUserCount').change(function () {
        if (document.getElementById("totalUserCount").checked == false) {

            document.getElementById("showAll").checked = false;
        }
        if (
            document.getElementById("registered").checked == true &&
            document.getElementById("unregistered").checked == true &&
            document.getElementById("vip").checked == true &&
            document.getElementById("userCount").checked == true &&
            document.getElementById("vipUserCount").checked == true &&
            document.getElementById("totalUserCount").checked == true
        ) {

            document.getElementById("showAll").checked = true;
        }
    });
}

async function downloadCompanyInfortmation() {
    var exportFilter = document.getElementById("exportFilter");
    var exportFiltersuccess = document.getElementById("exportFiltersuccess");
    var errorMessage = document.getElementById("filterFormError");
    $('#ciExport').click(function () {
        if (document.getElementById("showAll").checked == false
            && document.getElementById("registered").checked == false
            && document.getElementById("unregistered").checked == false
            && document.getElementById("vip").checked == false
            && document.getElementById("userCount").checked == false
            && document.getElementById("userCount").checked == false
            && document.getElementById("vipUserCount").checked == false
            && document.getElementById("totalUserCount").checked == false
        ) {

            errorMessage.style.display = "block";
            exportFilter.style.height = "600px";

            setTimeout(function () {
                errorMessage.style.display = "none";
                exportFilter.style.height = "520px";
            }, 5000);

        }
        else {
            
            var data = {};
            var registered = "false";
            var unregistered = "false";
            var vip = "false";
            var userCount = "false";
            var vipUserCount = "false";
            var totalUserCount = "false";
            
            if (document.getElementById("registered").checked == true) {
                registered = true;
            }
            if (document.getElementById("unregistered").checked == true) {
                unregistered = true;
            }
            if (document.getElementById("vip").checked == true) {
                vip = true;
            }
            
            if (document.getElementById("userCount").checked == true) {
                userCount = true;
            }
            
            if (document.getElementById("vipUserCount").checked == true) {
                vipUserCount = true;
            }
            if (document.getElementById("totalUserCount").checked == true) {
                totalUserCount = true;
            }
            
            //console.log(data);
            //data.Registered = registered;
            //data.unregistered = unregistered;
            //data.registeredVIP = vip;
            //data.userCount = userCount;
            //data.totalVIP = vipUserCount;
            //data.totalUser = totalUserCount;

            //$.ajax({
            //    url: '/Dashboard/ExportExcelTest',
            //    data: {
            //        Registered: registered,
            //        Unregistered: unregistered,
            //        RegisteredVIP: vip,
            //        TotalVIP: vipUserCount,
            //        UserCount: userCount,
            //        TotalUser: totalUserCount,
            //    },
            //    //type: "POST",
            //    //datatype: "json",
            //    success: function (data) {
            //        //console.log("data is imported: " + data)
            //        location.replace("/Dashboard/ExportExcelTest");
            //    }
            //});
            window.location = "/Dashboard/ExportExcelTest?Registered=" + registered + "&Unregistered=" + unregistered + "&RegisteredVIP=" + vip + "&TotalVIP=" + vipUserCount + "&UserCount=" + userCount + "&TotalUser=" + totalUserCount;

            //location.replace("/Dashboard/ExportExcelTest");


            exportFilter.style.display = "none";
            exportFiltersuccess.style.display = "block";
            setTimeout(function () {
                exportFiltersuccess.style.display = "none";
            }, 5000);

        }
    });
}
async function postNewUser() {
    const ctx = document.getElementById("myChart").getContext("2d");
    const arrdate = new Array();
    const arrval = new Array();
    var data = {};
    data.day = day;
    data.startdate = startdate;
    data.enddate = enddate;
    //console.log(data);
    $.ajax({
        url: '/Dashboard/PostCountAllUser',
        data: {
            data: data,
        },
        type: "POST",
        datatype: "json",
        success: function (response) {
            //console.log(response);

            for (var i = 0; i < response.length; i++) {
                arrdate.push(response[i].date);
                arrval.push(response[i].graph_count);
                document.getElementById("new_user").innerHTML = response[0].count;
                document.getElementById("percent-registered").innerHTML = response[0].percentage.toFixed(2) + " %";
            }
            //console.log(arrval);
            var chartData = {
                labels: arrdate, // conditions to made
                datasets: [
                    {
                        label: "",
                        data: arrval,
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                ],
            };

            var chartOptions = {
                responsive: true,
                maintainAspectRatio: false,

                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }

            };
            // Create the chart instance
            myChart.destroy();
            myChart = new Chart(ctx, {
                type: "line",
                data: chartData,
                options: chartOptions,
            });

            // Update the chart data
            setInterval(function () {

                myChart.update();
            }, 5000);


            //$.unblockUI();
        }
    });
}
async function runTopRestoChart() {

    var data = {};
    data.day = restoday;
    data.startdate = startdate;
    data.enddate = enddate;
    //console.log(data);
    $.ajax({
        url: '/Dashboard/PostMostClickRestaurant',
        data: {
            data: data,
        },
        type: "POST",
        datatype: "json",
        success: function (response) {
            //console.log(response);
            var sum = 0;
            for (var x = 3; x < response.length; x++) {
                sum += response[x].total;
            }
            for (var i = 0; i < response.length; i++) {
                var businessDataTwo;
                var businessDataThree;
                var totalDataTwo;
                var totalDataThree;
                if (response.length == 1) {
                    businessDataTwo = "No Data";
                    totalDataTwo = 0;
                    businessDataThree = "No Data";
                    totalDataThree = 0;
                }
                if (response.length == 2) {
                    businessDataThree = "No Data";
                    totalDataThree = 0;
                    businessDataTwo = response[1].business;
                    totalDataTwo = response[1].total;
                }
                if (response.length >= 3) {
                    businessDataTwo = response[1].business;
                    totalDataTwo = response[1].total;
                    businessDataThree = response[2].business;
                    totalDataThree = response[2].total;
                }
                document.getElementById("mcr_top1").innerHTML = "Others";
                document.getElementById("mcr_perc1").innerHTML = sum.toFixed(2) + " %";

                document.getElementById("mcr_top2").innerHTML = response[0].business;
                document.getElementById("mcr_perc2").innerHTML = response[0].total + " %";

                document.getElementById("mcr_top3").innerHTML = businessDataTwo;
                document.getElementById("mcr_perc3").innerHTML = totalDataTwo + " %";

                document.getElementById("mcr_top4").innerHTML = businessDataThree;
                document.getElementById("mcr_perc4").innerHTML = totalDataThree + " %";


            }

            if (response[0].total == 0 && totalDataTwo == 0 && totalDataThree == 0 && sum == 0) {
                var xValues = ["No Data"];
                var yValues = [1];

                var barColors = [
                    "#D3D3D3"
                ];

                var chartOptions = {

                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false,
                        }

                    }

                };
            }
            else {

                var xValues = [response[0].business, businessDataTwo, businessDataThree, "Others"];
                var yValues = [response[0].total, totalDataTwo, totalDataThree, sum];

                var barColors = [
                    "#132D28",  //Green
                    "#8F9092",  //Gray
                    "#AB262A",  //maroon
                    "#c89328"   //gold
                ];

                var chartOptions = {

                    plugins: {
                        legend: {
                            display: false
                        }

                    }

                };
            }

            var chartData = {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            };
            mytopRestoChartPie.destroy();
            mytopRestoChartPie = new Chart(topResto, {
                type: "doughnut",
                data: chartData,
                options: chartOptions
            });

        }
    });
}
async function viewRestaurantDetails() {

    $('#mcr_vm').click(function () {
       
        // Check if DataTable is already initialized
        
        document.getElementById("btn-mcs").style.display = "none";
        document.getElementById("btn-mch").style.display = "none";
        document.getElementById("btn-mcr").style.display = "block";
        document.getElementById("btn-mco").style.display = "none";
        document.getElementById("btn-mcw").style.display = "none";
        document.getElementById("modalTitle").innerHTML = "Restaurant";
        document.getElementById("modalTHTitle").innerHTML = "Restaurant";

        mcrTable.destroy();
        viewRestoDetails();
        $('#ShowMostClickModal').modal('show');
    });
}
async function viewRestoDetails() {
    var data = {};
    data.day = restoday;
    data.startdate = restostartdate;
    data.enddate = restoenddate;
    mcrTable = new DataTable('#mcr_call', {
        ajax: {
            url: "/Dashboard/PostViewMostClickRestaurant",
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
        columns: [
            {
                data: 'business'
            },
            {
                data: 'count'
            },
            {
                data: 'total'
            }
        ]
    });
}
async function runTopHotelChart() {

    var data = {};
    data.day = hotelday;
    data.startdate = startdate;
    data.enddate = enddate;
    $.ajax({
        url: '/Dashboard/PostMostClickedHospitalityv2',
        data: {
            data: data,
        },
        type: "POST",
        datatype: "json",
        success: function (response) {

            var sum = 0;
            for (var x = 3; x < response.length; x++) {
                sum += response[x].total;
            }
            for (var i = 0; i < response.length; i++) {
                
                var businessDataTwo;
                var businessDataThree;
                var totalDataTwo;
                var totalDataThree;
                if (response.length == 1) {
                    businessDataTwo = "No Data";
                    totalDataTwo = 0;
                    businessDataThree = "No Data";
                    totalDataThree = 0;
                }
                if (response.length == 2) {
                    businessDataThree = "No Data";
                    totalDataThree = 0;
                    businessDataTwo = response[1].business;
                    totalDataTwo = response[1].total;
                }
                if (response.length >= 3) {
                    businessDataTwo = response[1].business;
                    totalDataTwo = response[1].total;
                    businessDataThree = response[2].business;
                    totalDataThree = response[2].total;
                }




                document.getElementById("mch_top1").innerHTML = "Others";
                document.getElementById("mch_perc1").innerHTML = sum.toFixed(2) + " %";
                
                document.getElementById("mch_top2").innerHTML = response[0].business;
                document.getElementById("mch_perc2").innerHTML = response[0].total + " %";
                
                document.getElementById("mch_top3").innerHTML = businessDataTwo;
                document.getElementById("mch_perc3").innerHTML = totalDataTwo + " %";

                document.getElementById("mch_top4").innerHTML = businessDataThree;
                document.getElementById("mch_perc4").innerHTML = totalDataThree + " %";
                
            }

            if (response[0].total == 0 && totalDataTwo == 0 && totalDataThree == 0 && sum == 0) {
                var xValues = ["No Data"];
                var yValues = [1];

                var barColors = [
                    "#D3D3D3"
                ];

                var chartOptions = {

                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false,
                        }

                    }
                }

            }
            else {

                var xValues = [response[0].business, businessDataTwo, businessDataThree, "Others"];
                var yValues = [response[0].total, totalDataTwo, totalDataThree, sum];

                var barColors = [
                    "#132D28",  //Green
                    "#8F9092",  //Gray
                    "#AB262A",  //maroon
                    "#c89328"   //gold
                ];
                var chartOptions = {

                    plugins: {
                        legend: {
                            display: false
                        }

                    }
                }
            }
            var chartData = {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            };
            mytopHotelChartPie.destroy();
            mytopHotelChartPie = new Chart(topHotel, {
                type: "doughnut",
                data: chartData,
                options: chartOptions
            });

        }
    });
}
async function viewHotelDetails() {
    $('#mch_vm').click(function () {
        document.getElementById("btn-mcs").style.display = "none";
        document.getElementById("btn-mch").style.display = "block";
        document.getElementById("btn-mcr").style.display = "none";
        document.getElementById("btn-mco").style.display = "none";
        document.getElementById("btn-mcw").style.display = "none";
        document.getElementById("modalTitle").innerHTML = "Hotel";
        document.getElementById("modalTHTitle").innerHTML = "Hotel";
        var data = {};
        data.day = hotelday;
        data.startdate = hotelstartdate;
        data.enddate = hotelenddate;

        mcrTable.destroy();
        mcrTable = new DataTable('#mcr_call', {
            ajax: {
                url: "/Dashboard/PostViewClickedHospitalityv2",
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
            columns: [
                {
                    data: 'business'
                },
                {
                    data: 'count'
                },
                {
                    data: 'total'
                }
            ]
        });
        $('#ShowMostClickModal').modal('show');
    });
}
async function runTopStoreChart() {

    var data = {};
    data.day = storeday;
    data.startdate = startdate;
    data.enddate = enddate;
    $.ajax({
        url: '/Dashboard/PostMostCickStorev2',
        data: {
            data: data,
        },
        type: "POST",
        datatype: "json",
        success: function (response) {
            //console.log(response);

            var sum = 0;
            for (var x = 3; x < response.length; x++) {
                sum += response[x].total;
            }
            for (var i = 0; i < response.length; i++) {
                var businessDataTwo;
                var businessDataThree;
                var totalDataTwo;
                var totalDataThree;
                if (response.length == 1) {
                    businessDataTwo = "No Data";
                    totalDataTwo = 0;
                    businessDataThree = "No Data";
                    totalDataThree = 0;
                }
                if (response.length == 2) {
                    businessDataThree = "No Data";
                    totalDataThree = 0;
                    businessDataTwo = response[1].business;
                    totalDataTwo = response[1].total;
                }
                if (response.length >= 3) {
                    businessDataTwo = response[1].business;
                    totalDataTwo = response[1].total;
                    businessDataThree = response[2].business;
                    totalDataThree = response[2].total;
                }
                document.getElementById("mcs_top1").innerHTML = "Others";
                document.getElementById("mcs_perc1").innerHTML = sum.toFixed(2) + " %";

                document.getElementById("mcs_top2").innerHTML = response[0].business;
                document.getElementById("mcs_perc2").innerHTML = response[0].total + " %";

                document.getElementById("mcs_top3").innerHTML = businessDataTwo;
                document.getElementById("mcs_perc3").innerHTML = totalDataTwo + " %";

                document.getElementById("mcs_top4").innerHTML = businessDataThree;
                document.getElementById("mcs_perc4").innerHTML = totalDataThree + " %";
            }

            if (response[0].total == 0 && totalDataTwo == 0 && totalDataThree == 0 && sum == 0) {
                var xValues = ["No Data"];
                var yValues = [1];

                var barColors = [
                    "#D3D3D3"
                ];

                var chartOptions = {

                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false,
                        }

                    }
                }

            }
            else {

                var xValues = [response[0].business, businessDataTwo, businessDataThree, "Others"];
                var yValues = [response[0].total, totalDataTwo, totalDataThree, sum];

                var barColors = [
                    "#132D28",  //Green
                    "#8F9092",  //Gray
                    "#AB262A",  //maroon
                    "#c89328"   //gold
                ];
                var chartOptions = {

                    plugins: {
                        legend: {
                            display: false
                        }

                    }
                }
            }
            var chartData = {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            };
            mytopStoreChartPie.destroy();
            mytopStoreChartPie = new Chart(topStore, {
                type: "doughnut",
                data: chartData,
                options: chartOptions
            });

        }
    });
}
async function viewStoreDetails() {
    $('#mcs_vm').click(function () {
        document.getElementById("btn-mcs").style.display = "block";
        document.getElementById("btn-mch").style.display = "none";
        document.getElementById("btn-mcr").style.display = "none";
        document.getElementById("btn-mco").style.display = "none";
        document.getElementById("btn-mcw").style.display = "none";
        document.getElementById("modalTitle").innerHTML = "Store";
        document.getElementById("modalTHTitle").innerHTML = "Store";
        var data = {};
        data.day = storeday;
        data.startdate = storestartdate;
        data.enddate = storeenddate;
        mcrTable.destroy();
        mcrTable = new DataTable('#mcr_call', {
            ajax: {
                url: "/Dashboard/PostViewMostCickStorev2",
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
            columns: [
                {
                    data: 'business'
                },
                {
                    data: 'count'
                },
                {
                    data: 'total'
                }
            ]
        });
        $('#ShowMostClickModal').modal('show');
    });
}
async function runTopWellnessChart() {

    var data = {};
    data.day = wellnessday;
    data.startdate = startdate;
    data.enddate = enddate;
    $.ajax({
        url: '/Dashboard/PostMostCickWellnessv2',
        data: {
            data: data,
        },
        type: "POST",
        datatype: "json",
        success: function (response) {
            //console.log(response);

            var sum = 0;
            for (var x = 3; x < response.length; x++) {
                sum += response[x].total;
            }
            for (var i = 0; i < response.length; i++) {
                var businessDataTwo;
                var businessDataThree;
                var totalDataTwo;
                var totalDataThree;
                if (response.length == 1) {
                    businessDataTwo = "No Data";
                    totalDataTwo = 0;
                    businessDataThree = "No Data";
                    totalDataThree = 0;
                }
                if (response.length == 2) {
                    businessDataThree = "No Data";
                    totalDataThree = 0;
                    businessDataTwo = response[1].business;
                    totalDataTwo = response[1].total;
                }
                if (response.length >= 3) {
                    businessDataTwo = response[1].business;
                    totalDataTwo = response[1].total;
                    businessDataThree = response[2].business;
                    totalDataThree = response[2].total;
                }
                document.getElementById("mcw_top1").innerHTML = "Others";
                document.getElementById("mcw_perc1").innerHTML = sum.toFixed(2) + " %";

                document.getElementById("mcw_top2").innerHTML = response[0].business;
                document.getElementById("mcw_perc2").innerHTML = response[0].total + " %";

                document.getElementById("mcw_top3").innerHTML = businessDataTwo;
                document.getElementById("mcw_perc3").innerHTML = totalDataTwo + " %";

                document.getElementById("mcw_top4").innerHTML = businessDataThree;
                document.getElementById("mcw_perc4").innerHTML = totalDataThree + " %";
            }

            if (response[0].total == 0 && totalDataTwo == 0 && totalDataThree == 0 && sum == 0) {
                var xValues = ["No Data"];
                var yValues = [1];

                var barColors = [
                    "#D3D3D3"
                ];

                var chartOptions = {

                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false,
                        }

                    }
                }

            }
            else {

                var xValues = [response[0].business, businessDataTwo, businessDataThree, "Others"];
                var yValues = [response[0].total, totalDataTwo, totalDataThree, sum];

                var barColors = [
                    "#132D28",  //Green
                    "#8F9092",  //Gray
                    "#AB262A",  //maroon
                    "#c89328"   //gold
                ];
                var chartOptions = {

                    plugins: {
                        legend: {
                            display: false
                        }

                    }
                }
            }
            var chartData = {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            };
            mytopWellnessChartPie.destroy();
            mytopWellnessChartPie = new Chart(topWellness, {
                type: "doughnut",
                data: chartData,
                options: chartOptions
            });

        }
    });
}
async function viewWellnessDetails() {
    $('#mcw_vm').click(function () {
        document.getElementById("btn-mcs").style.display = "none";
        document.getElementById("btn-mch").style.display = "none";
        document.getElementById("btn-mcr").style.display = "none";
        document.getElementById("btn-mco").style.display = "none";
        document.getElementById("btn-mcw").style.display = "block";
        document.getElementById("modalTitle").innerHTML = "Wellness";
        document.getElementById("modalTHTitle").innerHTML = "Wellness";
        var data = {};
        data.day = wellnessday;
        data.startdate = wellnessstartdate;
        data.enddate = wellnessenddate;
        mcrTable.destroy();
        mcrTable = new DataTable('#mcr_call', {
            ajax: {
                url: "/Dashboard/PostViewMostCickWellnessv2",
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
            columns: [
                {
                    data: 'business'
                },
                {
                    data: 'count'
                },
                {
                    data: 'total'
                }
            ]
        });
        $('#ShowMostClickModal').modal('show');
    });
}
async function runTopOfferChart() {

    var data = {};
    data.day = offerday;
    data.startdate = startdate;
    data.enddate = enddate;
    $.ajax({
        url: '/Dashboard/PostMostCickOfferv2',
        data: {
            data: data,
        },
        type: "POST",
        datatype: "json",
        success: function (response) {
            //console.log(response);

            var sum = 0;
            for (var x = 3; x < response.length; x++) {
                sum += response[x].total;
            }
            for (var i = 0; i < response.length; i++) {
                var businessDataTwo;
                var businessDataThree;
                var totalDataTwo;
                var totalDataThree;
                if (response.length == 1) {
                    businessDataTwo = "No Data";
                    totalDataTwo = 0;
                    businessDataThree = "No Data";
                    totalDataThree = 0;
                }
                if (response.length == 2) {
                    businessDataThree = "No Data";
                    totalDataThree = 0;
                    businessDataTwo = response[1].business;
                    totalDataTwo = response[1].total;
                }
                if (response.length >= 3) {
                    businessDataTwo = response[1].business;
                    totalDataTwo = response[1].total;
                    businessDataThree = response[2].business;
                    totalDataThree = response[2].total;
                }
                document.getElementById("mcof_top1").innerHTML = "Others";
                document.getElementById("mcof_perc1").innerHTML = sum.toFixed(2) + " %";

                document.getElementById("mcof_top2").innerHTML = response[0].business;
                document.getElementById("mcof_perc2").innerHTML = response[0].total + " %";

                document.getElementById("mcof_top3").innerHTML = businessDataTwo;
                document.getElementById("mcof_perc3").innerHTML = totalDataTwo + " %";

                document.getElementById("mcof_top4").innerHTML = businessDataThree;
                document.getElementById("mcof_perc4").innerHTML = totalDataThree + " %";
            }

            if (response[0].total == 0 && totalDataTwo == 0 && totalDataThree == 0 && sum == 0) {
                var xValues = ["No Data"];
                var yValues = [1];

                var barColors = [
                    "#D3D3D3"
                ];

                var chartOptions = {

                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false,
                        }

                    }
                }

            }
            else {

                var xValues = [response[0].business, businessDataTwo, businessDataThree, "Others"];
                var yValues = [response[0].total, totalDataTwo, totalDataThree, sum];

                var barColors = [
                    "#132D28",  //Green
                    "#8F9092",  //Gray
                    "#AB262A",  //maroon
                    "#c89328"   //gold
                ];
                var chartOptions = {

                    plugins: {
                        legend: {
                            display: false
                        }

                    }
                }
            }
            var chartData = {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            };
            mytopOfferChartPie.destroy();
            mytopOfferChartPie = new Chart(topOffer, {
                type: "doughnut",
                data: chartData,
                options: chartOptions
            });

        }
    });
}
async function viewOfferDetails() {
    $('#mco_vm').click(function () {
        document.getElementById("btn-mcs").style.display = "none";
        document.getElementById("btn-mch").style.display = "none";
        document.getElementById("btn-mcr").style.display = "none";
        document.getElementById("btn-mco").style.display = "block";
        document.getElementById("btn-mcw").style.display = "none";
        document.getElementById("modalTitle").innerHTML = "Offer";
        document.getElementById("modalTHTitle").innerHTML = "Offer";
        var data = {};
        data.day = offerday;
        data.startdate = offerstartdate;
        data.enddate = offerenddate;
        mcrTable.destroy();
        mcrTable = new DataTable('#mcr_call', {
            ajax: {
                url: "/Dashboard/PostViewMostCickOfferv2",
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
            columns: [
                {
                    data: 'business'
                },
                {
                    data: 'count'
                },
                {
                    data: 'total'
                }
            ]
        });
        $('#ShowMostClickModal').modal('show');
    });
}
async function PostClickCountTop2() {
    //$.blockUI(reloadLoading);
    var data = {};
    data.day = day;
    data.startdate = nfcstartdate;
    data.enddate = nfcendtdate;
    //setTimeout(function () {
    //    $.ajax(
    //        {
    //            url: "/Dashboard/PostMostClickCounts",
    //            data: {
    //                data: data,
    //            },
    //            type: "POST",
    //            datatype: "json"
    //        }).done(function (data) {
    //            //
    //            for (var i = 0; i < data.length; i++) {

    //                $("#tbl_cnt tbody").append([
    //                    "<tr>" +
    //                    "<td>" + data[i].module + "</td>" +
    //                    "<td>" + data[i].count + "</td>", + "</tr>"
    //                ]);

    //            }

    //            $.unblockUI();
    //        }).fail(function () {
    //            alert("There was an Error When Loading Data...");
    //        });
    //}, 100);
    //console.log(data);

   
    cntTable = new DataTable('#tbl_cnt', {
        ajax: {
            url: "/Dashboard/PostMostClickCounts",
            type: "POST",
            data: {
                data: data
            },
            dataType: "json",
            processing: true,
            serverSide: true,
            complete: function (xhr) {
                // console.log(xhr);
            },
            error: function (err) {
                //alert(err.responseText);
                alert("There was an Error When Loading Data...");
            }
        },
        columns: [
            {
                title: "Module",
                data: 'module'
            },
            {
                title: "Count",
                data: 'count'
            }
        ]
    });
}
async function PostCallToAction() {
    var data = {};
    //cat = $('#cta-opt').val();
    data.day = day;
    data.startdate = ctastartdate;
    data.enddate = ctaendtdate;
    data.category = cat;
    //console.log(data);
    //$.ajax({
    //    url: '/Dashboard/PostCallToActions',
    //    data: {
    //        data: data,
    //    },
    //    type: "POST",
    //    datatype: "json",
    //    success: function (data) {
    //        //console.log(data);
    //        //cAbtable.clear().draw();
    //        for (var i = 0; i < data.length; i++) {
    //            $("#cAction_table").dataTable().fnAddData([
    //                "<td><p></p><p>" + data[i].business + "</p></td>",
    //                "<td><p>" + data[i].category + "</p></td>",
    //                "<td><p>" + data[i].callCount + "</p></td>",
    //                "<td><p>" + data[i].emailCount + "</p></td>",
    //                "<td><p>" + data[i].bookCount + "</p></td>",

    //            ]);
    //        }
    //    }
    //});
    ctaTable = new DataTable('#cAction_table', {
        ajax: {
            url: "/Dashboard/PostCallToActions",
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
        columns: [
            {
                data: 'business'
            },
            {
                data: 'category'
            },
            {
                data: 'callCount'
            },
            {
                data: 'emailCount'
            },
            {
                data: 'bookCount'
            }
        ]
    });
}
async function dateFilterDefault() {
    document.getElementById("dateFilterModal").style.display = "flex";
    document.getElementById("dateFrom").value = lastWeekDate;
    document.getElementById("dateTo").value = currentDate;
}

async function dateFilter() {

    //Close Date Filter
    $('#closeDateFilter').click(function () {

        document.getElementById("dateFilterModal").style.display = "none";
        
    });
    //Show Date Filter for User Count
    $('#selectDateForUserCount').click(function () {

        dateFilterDefault();

        type = 1;
    });
    $('#selectDateForTopResto').click(function () {

        dateFilterDefault();
        type = 2;
    });
    $('#selectDateForTopHotel').click(function () {

        dateFilterDefault();


        type = 3;
    });
    $('#selectDateForTopStore').click(function () {

        dateFilterDefault();
        type = 4;
    });
    $('#selectDateForTopWellness').click(function () {

        dateFilterDefault();


        type = 5;
    });
    $('#selectDateForTopOffer').click(function () {

        dateFilterDefault();


        type = 6;
    });
    $('#selectDateForCTA').click(function () {

        dateFilterDefault();


        type = 7;
    });
    $('#selectDateForNFC').click(function () {

        dateFilterDefault();

        type = 8;
    });
    $('#applyDateFilter').click(function () {
        day = 0;
        startdate = document.getElementById("dateFrom").value;
        enddate = document.getElementById("dateTo").value;
        document.getElementById("dateFilterModal").style.display = "none";
        restoday = 0;
        hotelday = 0;
        storeday = 0;
        wellnessday = 0;
        offerday = 0;
        //console.log(type);
        if (type == 1) {
            postNewUser();
        }
        else if (type != 1 && type != 7 && type != 8) {
            switch (type) {
                case 2:
                    runTopRestoChart();
                    restostartdate = startdate;
                    restoenddate = enddate;
                    break;
                case 3:
                    runTopHotelChart();
                    hotelstartdate = startdate;
                    hotelenddate = enddate;
                    break;
                case 4:
                    runTopStoreChart();
                    storestartdate = startdate;
                    storeenddate = enddate;
                    break;
                case 5:
                    runTopWellnessChart();
                    wellnessstartdate = startdate;
                    wellnessenddate = enddate;
                    break;
                case 6:
                    runTopOfferChart();
                    offerstartdate = startdate;
                    offerenddate = enddate;
                    break;
            }
        }
        else if (type == 8) {
            day = 0;
            nfcstartdate = startdate;
            nfcendtdate = enddate;
            cntTable.destroy();
            PostClickCountTop2();
        }
        else {
            ctastartdate = startdate;
            ctaendtdate = enddate;
            PostCallToAction();
        }
    });
    $('#cta-opt').change(function () {
        PostCallToAction();
    });
    $('#nur').change(function () {
        day = document.getElementById('nur').value;
        startdate = null;
        enddate = null;
        postNewUser();
    });
    $('#cnt-opt').change(function () {
        day = document.getElementById('cnt-opt').value;
        nfcstartdate = null;
        nfcenddate = null;

        cntTable.destroy();
        PostClickCountTop2();
    });
    $('#mcr').change(function () {
        restoday = document.getElementById('mcr').value;
        startdate = null;
        enddate = null;
        runTopRestoChart();
    });
    $('#mch').change(function () {
        hotelday = document.getElementById('mch').value;
        startdate = null;
        enddate = null;
        runTopHotelChart();

     });
    $('#mcs').change(function () {
        storeday = document.getElementById('mcs').value;
        startdate = null;
        enddate = null;
        runTopStoreChart();

     });

    $('#mcw').change(function () {
        wellnessday = document.getElementById('mcw').value;
        startdate = null;
        enddate = null;
        runTopWellnessChart();

     });
    $('#mcof').change(function () {
        offerday = document.getElementById('mcof').value;
        startdate = null;
        enddate = null;

        runTopOfferChart();

     });

    
     
    
}



//async function GetAllUserCount() {
//    var data = {};
//    data.day = 0;
//    data.startdate = null;
//    data.enddate = null;
    
//    $.ajax(
//        {
//            url: "/Dashboard/PostCountAllUser",
//            data: {
//                data: data,
//            },
//            type: "POST",
//            datatype: "json"
//        }).done(function (data) {
//            console.log(data);
//            for (var i = 0; i < data.length; i++) {
//                document.getElementById("all-user").innerHTML = data[i].count;
//            }
//            $.unblockUI();
//        }).fail(function () {
//            alert("There was an Error When Loading Data...CountAllUser");
//        });
//}