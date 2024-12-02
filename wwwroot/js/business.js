
var blocationtable;
var btypetable;
var btable;
async function ShowBusinessListv2() {
    if (DataTable.isDataTable('#b-table')) {
        btable.destroy();
    }
    //$.blockUI(reloadLoading);
    btable = new DataTable('#b-table', {
        ajax: {
            url: '/Business/GetBusinessList',
            //url: '/Dashboard/GetCompanyInformation', 
            type: "GET",
            dataType: "json",
            //processing: true,
            //serverSide: true,
            complete: function (xhr) {
                //console.log(xhr);
            },
            error: function (err) {
                alert(err.responseText);
            }
        },
        columns: [
            {
                data: 'blocid',
                render: function (data, type, row) {
                    var tdbuttons = '<div class="data-img">' +
                        '<img src=' + row.featureImg + ' alt=' + row.businessName + ' width="100%" />' +
                        '</div>' +
                        '<div>' +
                        '<p>' + row.businessID + '</p>' +
                        '<p>' + row.businessName + '</p>' +
                        '<div class="action"><a class="tbl-edit" data-id="' + row.id + '">' +
                        '<svg width="11" height="11" viewBox="0 0 11 11" fill="none"xmlns="http://www.w3.org/2000/svg">' +
                        '<path d="M5.02558 1.92456H1.89457C1.65732 1.92456 1.42978 2.0164 1.26201 2.17986C1.09425 2.34333 1 2.56504 1 2.79621V8.89779C1 9.12896 1.09425 9.35067 1.26201 9.51414C1.42978 9.6776 1.65732 9.76944 1.89457 9.76944H8.15659C8.39385 9.76944 8.62139 9.6776 8.78915 9.51414C8.95692 9.35067 9.05117 9.12896 9.05117 8.89779V5.847"' +
                        'stroke="black"' +
                        'stroke-linecap="round"' +
                        'stroke-linejoin="round"/>' +
                        '<path d="M8.38023 1.27079C8.55817 1.09741 8.79951 1 9.05116 1C9.30281 1 9.54415 1.09741 9.72209 1.27079C9.90003 1.44417 10 1.67933 10 1.92453C10 2.16973 9.90003 2.40488 9.72209 2.57827L5.47286 6.71862L3.68372 7.15445L4.131 5.41114L8.38023 1.27079Z"' +
                        'stroke="black"' +
                        'stroke-linecap="round"' +
                        'stroke-linejoin="round"/>' +
                        '</svg>' +

                        '<span >Edit</span>' +
                        ' </a>' +
                        '<a class="tbl-delete"  data-id="' + row.id + '" >' +
                        '<svg width="11" height="10" viewBox="0 0 11 10" fill="none"  xmlns="http://www.w3.org/2000/svg">' +
                        '<path d="M2.56574 1C2.56574 0.734784 2.67387 0.48043 2.86634 0.292893C3.0588 0.105357 3.31985 0 3.59204 0H6.67092C6.94311 0 7.20416 0.105357 7.39663 0.292893C7.58909 0.48043 7.69722 0.734784 7.69722 1V2H9.74981C9.88591 2 10.0164 2.05268 10.1127 2.14645C10.2089 2.24021 10.263 2.36739 10.263 2.5C10.263 2.63261 10.2089 2.75979 10.1127 2.85355C10.0164 2.94732 9.88591 3 9.74981 3H9.20126L8.75636 9.071C8.73793 9.32329 8.62207 9.55941 8.43211 9.73179C8.24215 9.90417 7.99221 10 7.73263 10H2.52982C2.27024 10 2.0203 9.90417 1.83034 9.73179C1.64038 9.55941 1.52452 9.32329 1.50609 9.071L1.06222 3H0.513148C0.377053 3 0.246531 2.94732 0.150298 2.85355C0.0540636 2.75979 0 2.63261 0 2.5C0 2.36739 0.0540636 2.24021 0.150298 2.14645C0.246531 2.05268 0.377053 2 0.513148 2H2.56574V1ZM3.59204 2H6.67092V1H3.59204V2ZM2.09056 3L2.53033 9H7.73314L8.17291 3H2.09056ZM4.10518 4C4.24128 4 4.3718 4.05268 4.46803 4.14645C4.56427 4.24021 4.61833 4.36739 4.61833 4.5V7.5C4.61833 7.63261 4.56427 7.75979 4.46803 7.85355C4.3718 7.94732 4.24128 8 4.10518 8C3.96909 8 3.83857 7.94732 3.74233 7.85355C3.6461 7.75979 3.59204 7.63261 3.59204 7.5V4.5C3.59204 4.36739 3.6461 4.24021 3.74233 4.14645C3.83857 4.05268 3.96909 4 4.10518 4ZM6.15778 4C6.29387 4 6.42439 4.05268 6.52063 4.14645C6.61686 4.24021 6.67092 4.36739 6.67092 4.5V7.5C6.67092 7.63261 6.61686 7.75979 6.52063 7.85355C6.42439 7.94732 6.29387 8 6.15778 8C6.02168 8 5.89116 7.94732 5.79493 7.85355C5.69869 7.75979 5.64463 7.63261 5.64463 7.5V4.5C5.64463 4.36739 5.69869 4.24021 5.79493 4.14645C5.89116 4.05268 6.02168 4 6.15778 4Z"' +
                        'fill="black"/>' +
                        '</svg>' +
                        '<span>Delete</span></a>' +
                        '</div></div>';

                    return tdbuttons;
                }
            },
            {
                data: 'city',
                render: function (data, type, row) {
                    var city = '<p>' + data + ', ' + row.country + ' </p>';

                    return city;
                }
            },
            {
                data: 'address'
            },
            {
                data: 'cno'
            },
            {
                data: 'email'
            },
            {
                data: 'url'
            },
            {
                data: 'dateCreated'
            }
        ]
    });
}