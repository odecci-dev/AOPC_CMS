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


async function companyInformationTableLayout() {
   

    companyInfo = $('#cInformation').DataTable({
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
    
    var data = {};
    var ciSearch = document.getElementById("ciSearch").value;
    if (ciSearch == "") {
        ciSearch = null;
    }
   
    data.corporatename = ciSearch;
    data.page = spanval;
    //console.log(data);
    //data.page = 0;
    //$.blockUI(reloadLoading);
    $.ajax({
        url: '/Dashboard/PostCompanyInformation',
        async: false,
        data: {
            data: data,
        },
        type: "POST",
        datatype: "json",
        success: function (data) {
            //console.log(data);
            companyInfo.clear().draw();
            //console.log(data[0]);
            prev = data[0].prevPage;
            next = data[0].nextPage;
            currpage = data[0].currentPage;
            spanval = data[0].currentPage;
            
            

            companyInfo.clear().draw();
            for (var i = 0; i < data[0].items.length; i++) {
                $("#cInformation").dataTable().fnAddData([
                    "<td><p></p><p style='text-align: left;'>" + data[0].items[i].corporateName + "</p></td>",
                    "<td><p>" + data[0].items[i].registered + "</p></td>",
                    "<td><p>" + data[0].items[i].unregistered + "</p></td>",
                    "<td><p>" + data[0].items[i].registeredVIP + "</p> <p style='font-size: 10px;'>Remaining VIP count: " + data[0].items[i].remainingVip+"</p></td>",
                    "<td><p>" + data[0].items[i].totalVIP + "</p></td>",
                    "<td><p>" + data[0].items[i].userCount + "</p></td>",
                    "<td><p>" + data[0].items[i].totalUser + "</p></td>",
                ]);
               
            }

        }
        
    });
    SearchComponyInformation();
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
            
            console.log(data);
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

async function runTopRestoChart() {

    var data = {};
    data.day = $('#mcr').val();
    //data.day = 1;
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
                document.getElementById("mcr_top1").innerHTML = "Others";
                document.getElementById("mcr_perc1").innerHTML = sum.toFixed(2) + " %";

                document.getElementById("mcr_top2").innerHTML = response[0].business;
                document.getElementById("mcr_perc2").innerHTML = response[0].total + " %";

                document.getElementById("mcr_top3").innerHTML = response[1].business;
                document.getElementById("mcr_perc3").innerHTML = response[1].total + " %";

                document.getElementById("mcr_top4").innerHTML = response[2].business;
                document.getElementById("mcr_perc4").innerHTML = response[2].total + " %";


            }

            if (response[0].total == 0 && response[1].total == 0 && response[2].total == 0 && sum == 0) {
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

                var xValues = [response[0].business, response[1].business, response[2].business, "Others"];
                var yValues = [response[0].total, response[1].total, response[2].total, sum];

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
async function runTopHotelChart() {

    var data = {};
    data.day = $('#mch').val();
    //data.day = 1;
    $.ajax({
        url: '/Dashboard/PostMostClickedHospitality',
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
                document.getElementById("mch_top1").innerHTML = "Others";
                document.getElementById("mch_perc1").innerHTML = sum.toFixed(2) + " %";

                document.getElementById("mch_top2").innerHTML = response[0].business;
                document.getElementById("mch_perc2").innerHTML = response[0].total + " %";

                document.getElementById("mch_top3").innerHTML = response[1].business;
                document.getElementById("mch_perc3").innerHTML = response[1].total + " %";

                document.getElementById("mch_top4").innerHTML = response[2].business;
                document.getElementById("mch_perc4").innerHTML = response[2].total + " %";
            }

            if (response[0].total == 0 && response[1].total == 0 && response[2].total == 0 && sum == 0) {
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

                var xValues = [response[0].business, response[1].business, response[2].business, "Others"];
                var yValues = [response[0].total, response[1].total, response[2].total, sum];

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
async function runTopStoreChart() {

    var data = {};
    data.day = $('#mcs').val();
    //data.day = 1;
    $.ajax({
        url: '/Dashboard/PostMostCickStore',
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
                document.getElementById("mcs_top1").innerHTML = "Others";
                document.getElementById("mcs_perc1").innerHTML = sum.toFixed(2) + " %";

                document.getElementById("mcs_top2").innerHTML = response[0].business;
                document.getElementById("mcs_perc2").innerHTML = response[0].total + " %";

                document.getElementById("mcs_top3").innerHTML = response[1].business;
                document.getElementById("mcs_perc3").innerHTML = response[1].total + " %";

                document.getElementById("mcs_top4").innerHTML = response[2].business;
                document.getElementById("mcs_perc4").innerHTML = response[2].total + " %";
            }

            if (response[0].total == 0 && response[1].total == 0 && response[2].total == 0 && sum == 0) {
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

                var xValues = [response[0].business, response[1].business, response[2].business, "Others"];
                var yValues = [response[0].total, response[1].total, response[2].total, sum];

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
async function runTopWellnessChart() {

    var data = {};
    data.day = $('#mcw').val();
    //data.day = 1;
    $.ajax({
        url: '/Dashboard/PostMostCickWellness',
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
                document.getElementById("mcw_top1").innerHTML = "Others";
                document.getElementById("mcw_perc1").innerHTML = sum.toFixed(2) + " %";

                document.getElementById("mcw_top2").innerHTML = response[0].business;
                document.getElementById("mcw_perc2").innerHTML = response[0].total + " %";

                document.getElementById("mcw_top3").innerHTML = response[1].business;
                document.getElementById("mcw_perc3").innerHTML = response[1].total + " %";

                document.getElementById("mcw_top4").innerHTML = response[2].business;
                document.getElementById("mcw_perc4").innerHTML = response[2].total + " %";
            }

            if (response[0].total == 0 && response[1].total == 0 && response[2].total == 0 && sum == 0) {
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

                var xValues = [response[0].business, response[1].business, response[2].business, "Others"];
                var yValues = [response[0].total, response[1].total, response[2].total, sum];

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
async function runTopOfferChart() {

    var data = {};
    data.day = $('#mcof').val();
    //data.day = 1;
    $.ajax({
        url: '/Dashboard/PostMostCickOffer',
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
                document.getElementById("mcof_top1").innerHTML = "Others";
                document.getElementById("mcof_perc1").innerHTML = sum.toFixed(2) + " %";

                document.getElementById("mcof_top2").innerHTML = response[0].business;
                document.getElementById("mcof_perc2").innerHTML = response[0].total + " %";

                document.getElementById("mcof_top3").innerHTML = response[1].business;
                document.getElementById("mcof_perc3").innerHTML = response[1].total + " %";

                document.getElementById("mcof_top4").innerHTML = response[2].business;
                document.getElementById("mcof_perc4").innerHTML = response[2].total + " %";
            }

            if (response[0].total == 0 && response[1].total == 0 && response[2].total == 0 && sum == 0) {
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

                var xValues = [response[0].business, response[1].business, response[2].business, "Others"];
                var yValues = [response[0].total, response[1].total, response[2].total, sum];

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

async function dateFilter() {

    //Close Date Filter
    $('#closeDateFilter').click(function () {

        document.getElementById("dateFilterModal").style.display = "none";
    });
    //Show Date Filter for User Count
    $('#selectDateForUserCount').click(function () {

        document.getElementById("dateFilterModal").style.display = "flex";
    });
    $('#selectDateForTopResto').click(function () {

        document.getElementById("dateFilterModal").style.display = "flex";
    });
    $('#selectDateForTopHotel').click(function () {

        document.getElementById("dateFilterModal").style.display = "flex";
    });
    $('#selectDateForTopStore').click(function () {

        document.getElementById("dateFilterModal").style.display = "flex";
    });
    $('#selectDateForTopWellness').click(function () {

        document.getElementById("dateFilterModal").style.display = "flex";
    });

    $('#selectDateForTopOffer').click(function () {

        document.getElementById("dateFilterModal").style.display = "flex";
    });
    $('#selectDateForCTA').click(function () {

        document.getElementById("dateFilterModal").style.display = "flex";
    });
    $('#selectDateForNFC').click(function () {

        document.getElementById("dateFilterModal").style.display = "flex";
    });
    
}