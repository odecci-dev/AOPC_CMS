var audio = new Audio("/sounds/notif-sound.wav");

const client = new signalR.HubConnectionBuilder()
    .withUrl('/notifications')
    .build();

client.on('NewNotificationReceived', data => {

    if (CheckUser(data[0].receiverid) == 0) {

        audio.play();

        var count = GetCount(data[0].receiverid);
        if (count > 0) {
            $(".countitem").html(count);
        }

        var link = "../../" + data[0].url;
        const dateTimeAgo = moment(data[0].dateCreated).fromNow().fontsize(1);
        var description = data[0].description;

        var subject = data[0].subject;

        var read = '';
        var unread = '';
        var img_path = '';
        
        if (data[0].isRead == 0) {
            read = '&nbsp;&nbsp;<div><i class="fas fa-circle notif-circle"></i><button type="button" class="btn btn-delete' + data[0].id + '" onclick="deleteNotif(' + data[0].id + ');"><i class="fas fa-times" style="color:gray"></i></button></div>';
            unread = 'notif-unread';
        }
        else {
            read = '<div><button type="button" class="btn btn-delete' + data[0].id + '" onclick="deleteNotif(' + data[0].id + ');"><i class="fas fa-times" style="color:gray"></i></button></div>';
        }

        if (data[0].imagePath == "" || data[0].imagePath == null) {
            img_path = '<div style="width:50;height:50px;border-radius:100px;border:1px solid gray;text-align:center;"><i class="fas fa-user-tie fa-3x" style="color:gray;margin-top:5px"></i>';
        }
        else {
            img_path = '<img style="width:60px;height:60px; " src="' + data[0].imagePath + '" class="notif-img">';
        }

        $("#notifList tbody").prepend('<tr class="trbody idselectt">'
            + '<td style="width:65px" class="notif-item ' + unread + '"><a class="notif-update" data-id="' + data[0].id + '"  href="' + link + '">' + img_path + '</a></td>'
            + '<td class="notif-item ' + unread + '"><a class="notif-update" data-id="' + data[0].id + '"  href="' + link + '">'
            + '<span style="font-size:16px!important;text-align:left!important;">' + subject + '</span><br>'
            + '<span class="notif-description">' + description + '</span><br><span class="time">' + dateTimeAgo
            + '</span></a></td>'
            + '<td style="width:20px" class="' + unread + '">' + read + '</td>'
            + '</tr>');

        if (count > 0) {
            $("#notif-foot").empty();
            $("#notif-foot").append('End Of Result...<br><div class="w-100 notif-seeall" style="text-align:center!important"><a href="../../D_Notification/list">See All Notifications...</a></div>');
        }
    }
});
    
function CheckUser(userId) {
    var status = 0;
    $.ajax({
        url: '/D_Notification/CheckUser',
        data: { userId: userId },
        type: "GET",
        datatype: "json",
        async: false
    }).done(function (data) {
        status = data;
    }).fail(function () {
        alert("There was an Error When Loading Data...");
    });
    return status;
}

function GetCount(userId) {
    var status = 0;
    $.ajax({
        url: '/D_Notification/GetCount',
        data: { userId: userId },           
        type: "GET",
        datatype: "json",
        async: false
    }).done(function (data) {
        status = data;
    }).fail(function () {
        alert("There was an Error When Loading Data...");
    });
    return status;
}



function SendNotification() {
    $.ajax({
        url: '/D_Notification/SendNotification',
        type: "GET",
        datatype: "json",
        async: false
    }).done(function (data) {
        console.log('Successfully Notified...');
    }).fail(function () {
        alert("There was an Error When Loading Data...");
    });
}


function notif() {
    $('#notifList tbody').empty();
    $("#notif-foot").empty();

    $.ajax({
        url: '/D_Notification/GetNotificationListReceiver',
        data: {
            flag: 1
        },
        type: "GET",
        datatype: "json",
        async: false
    }).done(function (data) {
        var img_path = "";
        for (var i = 0; i < data.length; i++) {

            var link = "../../" + data[i].url;
            const dateTimeAgo = moment(data[i].dateCreated).fromNow().fontsize(1);
            var description = data[i].description;
            var subject = data[i].subject;
            var read = '';
            var unread = '';
            if (data[i].isRead == 0) {
                read = '<div><i class="fas fa-circle notif-circle"></i><button type="button" class="btn btn-delete' + data[i].id + '" onclick="deleteNotif(' + data[i].id + ');"><i class="fas fa-times" style="color:gray"></i></button></div>';
                unread = 'notif-unread';
            }
            else {
                read = '<div><button type="button" class="btn btn-delete' + data[i].id + '" onclick="deleteNotif(' + data[i].id + ');"><i class="fas fa-times" style="color:gray"></i></button></div>';
            }

            if (data[i].imagePath == "" || data[i].imagePath == null) {
                img_path = '<div style="width:50;height:50px;border-radius:100px;border:1px solid gray;text-align:center;"><i class="fas fa-user-tie fa-3x" style="color:gray;margin-top:5px"></i>';
            }
            else {
                img_path = '<img style="width:60px;height:60px; " src="' + data[i].imagePath + '" class="notif-img">';
            }

            console.log(img_path);

            if (data[i].count > 0) {

                $(".countitem").html(data[i].count);
            }
            $("#notifList tbody").append('<tr class="trbody idselectt">'
                + '<td style="width:65px" class="notif-item ' + unread + '"><a class="notif-update" data-id="' + data[i].id + '" href="' + link + '">' + img_path + '</a></td>'
                + '<td class="notif-item ' + unread + '"><a class="notif-update" data-id="' + data[i].id + '" href="' + link + '">'
                + '<b style="font-size:16px!important;text-align:left!important;">' + subject + '</b><br>'
                + '<span class="notif-description">' + description + '</span><br><span class="time">' + dateTimeAgo
                + '</span></a></td>'
                + '<td style="width:20px" class="' + unread + ' text-center">' + read + '</td>'
                + '</tr>');
        }

        var rowCount = $("#notifList tbody .idselectt").length;
        if (rowCount == 0) {
            $("#notif-foot").append('No New Notification');
        } else {
            $("#notif-foot").append('End Of Result...<br><div class="w-100 notif-seeall" style="text-align:center!important"><a href="../../D_Notification/list">See All Notifications...</a></div>');
        }

    });
}

function deleteNotif(id) {
    $.ajax({
        url: '/D_Notification/Delete',
        data: {
            id: id
        },
        type: "POST",
        datatype: "json"
    }).done(function (data) {
        notif();
        var rowCount = $("#notifList tbody .idselectt").length;
        if (rowCount == 0) {
            $(".countitem").html('');
        }

    }).fail(function () {
        alert("There was an Error When Loading Data...");
    });
}

function displayComposeNotificationModal() {
    var composeNotification = document.getElementById('compose-notification-modal-holder');
    $('#compose-notification-btn').click(function () {
        
        GetCorporateList();
        document.getElementById("send-to-all").checked = false;
        var notificationSubject = document.getElementById('notoficationSubject').value = "";
        //var notificationBody = document.getElementById('notificationBody').value = "";
        composeNotification.style.display = "flex";

    });
    $('#closeComposeNotification').click(function () {
        composeNotification.style.display = "none";
    });
    $('#discardNotificatoin').click(function () {
        composeNotification.style.display = "none";
        var notificationBody = document.getElementById('notificationBody').value = "";
        document.getElementById("discount").checked = false;
        document.getElementById("foodBeverageAdded").checked = false;
        document.getElementById("jewelryBrands").checked = false;
        document.getElementById("foodBeverageAvailable").checked = false;
        document.getElementById("discount").disabled = false;
        document.getElementById("foodBeverageAdded").disabled = false;
        document.getElementById("jewelryBrands").disabled = false;
        document.getElementById("foodBeverageAvailable").disabled = false;
    });
    
}

function composeNotificationDOM() {

    var corporateModal = document.getElementById('corporateOptionsModal');
    var arrowSvg = document.getElementById('arrowSvg');
    var searchCorporateBtn = document.getElementById('compose-notification-search-corporate-btn');
    $('#discount').change(function () {
        if (document.getElementById("discount").checked == true) {
            var discountValue = document.getElementById("discount").value;
            document.getElementById("notificationBody").value += discountValue;

            document.getElementById("foodBeverageAdded").disabled = true;
            document.getElementById("jewelryBrands").disabled = true;
            document.getElementById("foodBeverageAvailable").disabled = true;
        }
        if (document.getElementById("discount").checked == false) {

            document.getElementById("notificationBody").value = "";

            document.getElementById("foodBeverageAdded").disabled = false;
            document.getElementById("jewelryBrands").disabled = false;
            document.getElementById("foodBeverageAvailable").disabled = false;
        }
    });
    $('#foodBeverageAdded').change(function () {
        if (document.getElementById("foodBeverageAdded").checked == true) {
            var foodBeverageAdded = document.getElementById("foodBeverageAdded").value;
            document.getElementById("notificationBody").value += foodBeverageAdded;

            document.getElementById("discount").disabled = true;
            document.getElementById("jewelryBrands").disabled = true;
            document.getElementById("foodBeverageAvailable").disabled = true;
        }
        if (document.getElementById("foodBeverageAdded").checked == false) {

            document.getElementById("notificationBody").value = "";

            document.getElementById("discount").disabled = false;
            document.getElementById("jewelryBrands").disabled = false;
            document.getElementById("foodBeverageAvailable").disabled = false;
        }
        
    });
    $('#jewelryBrands').change(function () {
        if (document.getElementById("jewelryBrands").checked == true) {
            var jewelryBrands = document.getElementById("jewelryBrands").value;
            document.getElementById("notificationBody").value += jewelryBrands;

            document.getElementById("discount").disabled = true;
            document.getElementById("foodBeverageAdded").disabled = true;
            document.getElementById("foodBeverageAvailable").disabled = true;
        }
        if (document.getElementById("jewelryBrands").checked == false) {

            document.getElementById("notificationBody").value = "";

            document.getElementById("discount").disabled = false;
            document.getElementById("foodBeverageAdded").disabled = false;
            document.getElementById("foodBeverageAvailable").disabled = false;
        }
    });
    $('#foodBeverageAvailable').change(function () {
        if (document.getElementById("foodBeverageAvailable").checked == true) {
            var foodBeverageAvailable = document.getElementById("foodBeverageAvailable").value;
            document.getElementById("notificationBody").value += foodBeverageAvailable;

            document.getElementById("discount").disabled = true;
            document.getElementById("foodBeverageAdded").disabled = true;
            document.getElementById("jewelryBrands").disabled = true;
        }
        if (document.getElementById("foodBeverageAvailable").checked == false) {

            document.getElementById("notificationBody").value = "";

            document.getElementById("discount").disabled = false;
            document.getElementById("foodBeverageAdded").disabled = false;
            document.getElementById("jewelryBrands").disabled = false;
        }
    });
    $('#send-to-all').change(function () {
        if (document.getElementById("send-to-all").checked == true) {
            //$('.corporateOptionSendNotif').attr('checked', true);
            $('.corporateOptionSendNotif').not(this).prop('checked', this.checked);
        }
        else {
            //$('form div input').attr('checked', false);

            $('.corporateOptionSendNotif').not(this).prop('checked', false);
        }
    });
    
    $('#compose-notification-search-corporate-btn').click(function () {
        arrowSvg.style.transform = "scaleY(-1)";
        corporateModal.style.display = "block";
        searchCorporateBtn.classList.remove("openmodal");
    });
    $('#closeSvg').click(function () {
        arrowSvg.style.transform = "scaleY(1)";
        corporateModal.style.display = "none";
    });
    $('#arrowSvg').click(function () {
        arrowSvg.style.transform = "scaleY(1)";
        corporateModal.style.display = "none";
    });
   
    $(document).keyup(function (e) {
        if (e.key === "Escape") { // escape key maps to keycode `27`
            arrowSvg.style.transform = "scaleY(1)";
            corporateModal.style.display = "none";
        }
    });
    GetCorporateList();
    
}

function GetCorporateList() {
    $.ajax({
        url: "/Corporate/GetCompanyList",
        data: {},
        type: "GET",
        datatype: "json"
    }).done(function (data) {

        var form = document.getElementById('corporateOptions');
        form.innerHTML = "";
        for (var i = 0; i < data.length; i++) {
            var div = document.createElement("div");
            div.className = "formControl";
            div.innerHTML = `
                    <input class="corporateOptionSendNotif" type="checkbox" id="corporateName" name="`+ data[i].corporateName + `" value="` + data[i].corporateName + `" />
                    <label>`+ data[i].corporateName + `</label>`;
            form.appendChild(div);

        }



        //$.unblockUI();
    }).fail(function () {
        alert("There was an Error When Loading Data...");
    });

    $('#sendNotificatoin').click(function () {
        var checkedEmail = document.querySelectorAll('input[id="corporateName"]:checked');
        var notificationSubject = document.getElementById('notoficationSubject').value;
        var notificationBody = document.getElementById('notificationBody').value;
        if (notificationSubject == "") {
            notificationSubject = "No Subject";
        }
        if (notificationBody == "") {
            notificationBody = "No Body";
        }

        
        selectedEmail = Array.from(checkedEmail).map(x => x.value);
        if (checkedEmail.length == 0) {
            document.getElementById('selectCorporateError').style.display = "block";
            setTimeout(function () {
                document.getElementById('selectCorporateError').style.display = "none";
            }, 3000);
        }
        else {
            //console.log(selectedEmail);
            //console.log(notificationSubject);
            //console.log(notificationBody);

            var data = {};

            data.Subject = notificationSubject;
            data.Body = notificationBody;
            data.CorporateList = selectedEmail;

            console.log(data);
            $.ajax({
                url: '/Dashboard/EmailCorporate',
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

            document.getElementById('compose-notification-modal-holder').style.display = "none";

        }
    });

}
