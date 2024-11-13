async function corporateUserCount() {
    var data = {};
    data.userName = username;
    //console.log(data);
    //console.log(data);
    $.ajax({
        url: '/Dashboard/GetAllUserCount',
        data: data,
        type: "POST",
        datatype: "json",
        success: function (data) {
            //console.log(data);
            for (var i = 0; i < data.length; i++) {
                document.getElementById('registered_employee').innerHTML = data[i].registered;
                document.getElementById('unregistered_employee').innerHTML = data[i].unregistered;
                document.getElementById('total_vip').innerHTML = data[i].isVIP;
                document.getElementById('remaining_vip_slots').innerHTML = data[i].remainingVIP;
            }
        }
    });
}
async function topRestoFilter() {
    $('#mcr').change(function () {
        var data = {};
        data.day = $('#mcr').val();
        ////console.log(data); 

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
                //console.log(sum);
                for (var i = 0; i < response.length; i++) {
                    document.getElementById("mcr_top1").innerHTML = "Others";
                    document.getElementById("mcr_perc1").innerHTML = sum.toFixed(2) + " %";

                    document.getElementById("mcr_top2").innerHTML = response[0].business;
                    document.getElementById("mcr_perc2").innerHTML = response[0].total + " %";

                    document.getElementById("mcr_top3").innerHTML = response[1].business;
                    document.getElementById("mcr_perc3").innerHTML = response[1].total + " %";

                    document.getElementById("mcr_top4").innerHTML = response[2].business;
                    document.getElementById("mcr_perc4").innerHTML = response[2].total + " %";


                    topBusinesOutlet = [
                        {
                            name: "Others",
                            totalVisit: sum, //percentage
                        },
                        {
                            name: response[0].business,
                            totalVisit: response[0].total, //percentage
                        },
                        {
                            name: response[1].business,
                            totalVisit: response[1].total,  //percentage
                        },
                        {
                            name: response[2].business,
                            totalVisit: response[2].total,  //percentage
                        },
                    ];
                }

                const pieGraphMovement = (elementContainer, data) => {
                    let oldValue = 0;
                    let styleString = "";
                    let startingPoint = "";
                    const color = {
                        0: " var(--accent)",
                        1: "#132D28",
                        2: "#8F9092",
                        // 3: " var(--secondary-light)",
                        3: "#AB262A",
                        4: "Black"

                    };
                    data.map((value, key) => {
                        startingPoint = oldValue == 0 ? "" : `${oldValue}%`;
                        let newValue = value.totalVisit + oldValue;
                        styleString +=
                            oldValue == 0
                                ? `${color[key]} ${startingPoint} ${value.totalVisit}%,`
                                : `${color[key]} ${startingPoint} ${newValue}%,`;
                        oldValue += value.totalVisit;
                    });
                    //  console.log(styleString);
                    //document
                    //    .querySelector(`${elementContainer}`)
                        //.setAttribute("style", `background: conic-gradient(${styleString}#D3D3D3 0 0%)`);
                };

                const populateInfo = (elementContainer, data) => {
                    let element = document.querySelector(`${elementContainer}`);
                    data.map((value, key) => {
                        // console.log();
                        element.children[key].children[1].innerText = value.name;
                        element.children[key].children[2].innerText = `${value.totalVisit}%`;
                    });
                };

                const populateTable = (elementContainer, data) => {
                    let element = document
                        .querySelector(`${elementContainer}`)
                        .children[0].getElementsByTagName("tbody");
                    data.map((value, key) => {
                        if (value.name !== "Others") {
                            let newRow = element[0].insertRow();
                            let nameCell = newRow.insertCell();
                            let valueCell = newRow.insertCell();
                            var nameNode = document.createTextNode(value.name);
                            var valueNode = document.createTextNode(value.totalVisit);
                            nameCell.appendChild(nameNode);
                            valueCell.appendChild(valueNode);
                        }
                    });
                };
                pieGraphMovement("#to-pie-graph", topBusinesOutlet);

            }
        });

    });

    
}
function topResto() {
    var data = {};
    data.day = $('#mcr').val();
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
            //console.log(sum);
            for (var i = 0; i < response.length; i++) {
                document.getElementById("mcr_top1").innerHTML = "Others";
                document.getElementById("mcr_perc1").innerHTML = sum.toFixed(2) + " %";

                document.getElementById("mcr_top2").innerHTML = response[0].business;
                document.getElementById("mcr_perc2").innerHTML = response[0].total + " %";

                document.getElementById("mcr_top3").innerHTML = response[1].business;
                document.getElementById("mcr_perc3").innerHTML = response[1].total + " %";

                document.getElementById("mcr_top4").innerHTML = response[2].business;
                document.getElementById("mcr_perc4").innerHTML = response[2].total + " %";


                topBusinesOutlet = [
                    {
                        name: "Others",
                        totalVisit: sum, //percentage
                    },
                    {
                        name: response[0].business,
                        totalVisit: response[0].total, //percentage
                    },
                    {
                        name: response[1].business,
                        totalVisit: response[1].total,  //percentage
                    },
                    {
                        name: response[2].business,
                        totalVisit: response[2].total,  //percentage
                    },
                ];
            }

            const pieGraphMovement = (elementContainer, data) => {
                let oldValue = 0;
                let styleString = "";
                let startingPoint = "";
                const color = {
                    0: " var(--accent)",
                    1: "#132D28",
                    2: "#8F9092",
                    3: "#AB262A",

                };
                data.map((value, key) => {
                    startingPoint = oldValue == 0 ? "" : `${oldValue}%`;
                    let newValue = value.totalVisit + oldValue;
                    styleString +=
                        oldValue == 0
                            ? `${color[key]} ${startingPoint} ${value.totalVisit}%,`
                            : `${color[key]} ${startingPoint} ${newValue}%,`;
                    oldValue += value.totalVisit;
                });
                //  console.log(styleString);
                //document
                //    .querySelector(`${elementContainer}`)
                    //.setAttribute("style", `background: conic-gradient(${styleString}#D3D3D3 0 0%)`);
            };

            const populateInfo = (elementContainer, data) => {
                let element = document.querySelector(`${elementContainer}`);
                data.map((value, key) => {
                    // console.log();
                    element.children[key].children[1].innerText = value.name;
                    element.children[key].children[2].innerText = `${value.totalVisit}%`;
                });
            };

            const populateTable = (elementContainer, data) => {
                let element = document
                    .querySelector(`${elementContainer}`)
                    .children[0].getElementsByTagName("tbody");
                data.map((value, key) => {
                    if (value.name !== "Others") {
                        let newRow = element[0].insertRow();
                        let nameCell = newRow.insertCell();
                        let valueCell = newRow.insertCell();
                        var nameNode = document.createTextNode(value.name);
                        var valueNode = document.createTextNode(value.totalVisit);
                        nameCell.appendChild(nameNode);
                        valueCell.appendChild(valueNode);
                    }
                });
            };
            pieGraphMovement("#to-pie-graph", topBusinesOutlet);

        }
    });

}
async function topHotelFilter() {
    $('#mch').change(function () {
        var data = {};
        data.day = $('#mch').val();
        ////console.log(data);

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
                //console.log(sum);
                for (var i = 0; i < response.length; i++) {
                    document.getElementById("mch_top1").innerHTML = "Others";
                    document.getElementById("mch_perc1").innerHTML = sum.toFixed(2) + " %";

                    document.getElementById("mch_top2").innerHTML = response[0].business;
                    document.getElementById("mch_perc2").innerHTML = response[0].total + " %";

                    document.getElementById("mch_top3").innerHTML = response[1].business;
                    document.getElementById("mch_perc3").innerHTML = response[1].total + " %";

                    document.getElementById("mch_top4").innerHTML = response[2].business;
                    document.getElementById("mch_perc4").innerHTML = response[2].total + " %";

                    topBusinesOutlet = [
                        {
                            name: "Others",
                            totalVisit: sum, //percentage
                        },
                        {
                            name: response[0].business,
                            totalVisit: response[0].total, //percentage
                        },
                        {
                            name: response[1].business,
                            totalVisit: response[1].total,  //percentage
                        },
                        {
                            name: response[2].business,
                            totalVisit: response[2].total,  //percentage
                        },
                    ];
                }
                const pieGraphMovement = (elementContainer, data) => {
                    let oldValue = 0;
                    let styleString = "";
                    let startingPoint = "";
                    const color = {
                        0: " var(--accent)",
                        1: "#132D28",
                        2: "#8F9092",
                        3: "#AB262A",
                    };
                    data.map((value, key) => {
                        startingPoint = oldValue == 0 ? "" : `${oldValue}%`;
                        let newValue = value.totalVisit + oldValue;
                        styleString +=
                            oldValue == 0
                                ? `${color[key]} ${startingPoint} ${value.totalVisit}%,`
                                : `${color[key]} ${startingPoint} ${newValue}%,`;
                        oldValue += value.totalVisit;
                    });
                    //console.log(styleString);
                    //document
                    //    .querySelector(`${elementContainer}`)
                    //    .setAttribute("style", `background: conic-gradient(${styleString}#D3D3D3 0 0%)`);
                };

                const populateInfo = (elementContainer, data) => {
                    let element = document.querySelector(`${elementContainer}`);
                    data.map((value, key) => {
                        // console.log();
                        element.children[key].children[1].innerText = value.name;
                        element.children[key].children[2].innerText = `${value.totalVisit}%`;
                    });
                };

                const populateTable = (elementContainer, data) => {
                    let element = document
                        .querySelector(`${elementContainer}`)
                        .children[0].getElementsByTagName("tbody");
                    data.map((value, key) => {
                        if (value.name !== "Others") {
                            let newRow = element[0].insertRow();
                            let nameCell = newRow.insertCell();
                            let valueCell = newRow.insertCell();
                            var nameNode = document.createTextNode(value.name);
                            var valueNode = document.createTextNode(value.totalVisit);
                            nameCell.appendChild(nameNode);
                            valueCell.appendChild(valueNode);
                        }
                    });
                };

                pieGraphMovement("#th-pie-graph", topBusinesOutlet);

            }
        });

    });
}
async function topHotel() {
        var data = {};
        data.day = $('#mch').val();
        ////console.log(data);

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
                //console.log(sum);
                for (var i = 0; i < response.length; i++) {
                    document.getElementById("mch_top1").innerHTML = "Others";
                    document.getElementById("mch_perc1").innerHTML = sum.toFixed(2) + " %";

                    document.getElementById("mch_top2").innerHTML = response[0].business;
                    document.getElementById("mch_perc2").innerHTML = response[0].total + " %";

                    document.getElementById("mch_top3").innerHTML = response[1].business;
                    document.getElementById("mch_perc3").innerHTML = response[1].total + " %";

                    document.getElementById("mch_top4").innerHTML = response[2].business;
                    document.getElementById("mch_perc4").innerHTML = response[2].total + " %";

                    topBusinesOutlet = [
                        {
                            name: "Others",
                            totalVisit: sum, //percentage
                        },
                        {
                            name: response[0].business,
                            totalVisit: response[0].total, //percentage
                        },
                        {
                            name: response[1].business,
                            totalVisit: response[1].total,  //percentage
                        },
                        {
                            name: response[2].business,
                            totalVisit: response[2].total,  //percentage
                        },
                    ];
                }
                const pieGraphMovement = (elementContainer, data) => {
                    let oldValue = 0;
                    let styleString = "";
                    let startingPoint = "";
                    const color = {
                        0: " var(--accent)",
                        1: "#132D28",
                        2: "#8F9092",
                        3: "#AB262A",
                    };
                    data.map((value, key) => {
                        startingPoint = oldValue == 0 ? "" : `${oldValue}%`;
                        let newValue = value.totalVisit + oldValue;
                        styleString +=
                            oldValue == 0
                                ? `${color[key]} ${startingPoint} ${value.totalVisit}%,`
                                : `${color[key]} ${startingPoint} ${newValue}%,`;
                        oldValue += value.totalVisit;
                    });
                    //console.log(styleString);
                    //document
                    //    .querySelector(`${elementContainer}`)
                    //    .setAttribute("style", `background: conic-gradient(${styleString}#D3D3D3 0 0%)`);
                };

                const populateInfo = (elementContainer, data) => {
                    let element = document.querySelector(`${elementContainer}`);
                    data.map((value, key) => {
                        // console.log();
                        element.children[key].children[1].innerText = value.name;
                        element.children[key].children[2].innerText = `${value.totalVisit}%`;
                    });
                };

                const populateTable = (elementContainer, data) => {
                    let element = document
                        .querySelector(`${elementContainer}`)
                        .children[0].getElementsByTagName("tbody");
                    data.map((value, key) => {
                        if (value.name !== "Others") {
                            let newRow = element[0].insertRow();
                            let nameCell = newRow.insertCell();
                            let valueCell = newRow.insertCell();
                            var nameNode = document.createTextNode(value.name);
                            var valueNode = document.createTextNode(value.totalVisit);
                            nameCell.appendChild(nameNode);
                            valueCell.appendChild(valueNode);
                        }
                    });
                };

                //pieGraphMovement("#th-pie-graph", topBusinesOutlet);

            }
        });

}
async function topStoreFilter() {

    $('#mcs').change(function () {
        var data = {};
        data.day = $('#mcs').val();
        ////console.log(data);

        $.ajax({
            url: '/Dashboard/PostMostCickStore',
            data: {
                data: data,
            },
            type: "POST",
            datatype: "json",
            success: function (data) {
                ////console.log(data);
                var sum = 0;
                for (var x = 3; x < data.length; x++) {
                    sum += data[x].total;

                }
                //console.log(sum);
                for (var i = 0; i < data.length; i++) {
                    document.getElementById("mcs_top1").innerHTML = "Others";
                    document.getElementById("mcs_perc1").innerHTML = sum.toFixed(2) + " %";

                    document.getElementById("mcs_top2").innerHTML = data[0].business;
                    document.getElementById("mcs_perc2").innerHTML = data[0].total + " %";

                    document.getElementById("mcs_top3").innerHTML = data[1].business;
                    document.getElementById("mcs_perc3").innerHTML = data[1].total + " %";

                    document.getElementById("mcs_top4").innerHTML = data[2].business;
                    document.getElementById("mcs_perc4").innerHTML = data[2].total + " %";

                    topBusinesOutlet = [
                        {
                            name: "Others",
                            totalVisit: sum, //percentage
                        },
                        {
                            name: data[0].business,
                            totalVisit: data[0].total, //percentage
                        },
                        {
                            name: data[1].business,
                            totalVisit: data[1].total,  //percentage
                        },
                        {
                            name: data[2].business,
                            totalVisit: data[2].total,  //percentage
                        },
                    ];
                }

                const pieGraphMovement = (elementContainer, data) => {
                    let oldValue = 0;
                    let styleString = "";
                    let startingPoint = "";
                    const color = {
                        0: " var(--accent)",
                        1: "#132D28",
                        2: "#8F9092",
                        3: "#AB262A",
                    };
                    data.map((value, key) => {
                        startingPoint = oldValue == 0 ? "" : `${oldValue}%`;
                        let newValue = value.totalVisit + oldValue;
                        styleString +=
                            oldValue == 0
                                ? `${color[key]} ${startingPoint} ${value.totalVisit}%,`
                                : `${color[key]} ${startingPoint} ${newValue}%,`;
                        oldValue += value.totalVisit;
                    });
                    // console.log(styleString);
                    document
                        .querySelector(`${elementContainer}`)
                        .setAttribute("style", `background: conic-gradient(${styleString}#D3D3D3 0 0%)`);
                };

                const populateInfo = (elementContainer, data) => {
                    let element = document.querySelector(`${elementContainer}`);
                    data.map((value, key) => {
                        // console.log();
                        element.children[key].children[1].innerText = value.name;
                        element.children[key].children[2].innerText = `${value.totalVisit}%`;
                    });
                };

                const populateTable = (elementContainer, data) => {
                    let element = document
                        .querySelector(`${elementContainer}`)
                        .children[0].getElementsByTagName("tbody");
                    data.map((value, key) => {
                        if (value.name !== "Others") {
                            let newRow = element[0].insertRow();
                            let nameCell = newRow.insertCell();
                            let valueCell = newRow.insertCell();
                            var nameNode = document.createTextNode(value.name);
                            var valueNode = document.createTextNode(value.totalVisit);
                            nameCell.appendChild(nameNode);
                            valueCell.appendChild(valueNode);
                        }
                    });
                };
                console.log(topBusinesOutlet);
                pieGraphMovement("#ts-pie-graph", topBusinesOutlet);
            }
        });

    });
}
async function topStore() {

    var data = {};
    data.day = $('#mcs').val();
    ////console.log(data);

    $.ajax({
        url: '/Dashboard/PostMostCickStore',
        data: {
            data: data,
        },
        type: "POST",
        datatype: "json",
        success: function (data) {
            ////console.log(data);
            var sum = 0;
            for (var x = 3; x < data.length; x++) {
                sum += data[x].total;

            }
            //console.log(sum);
            for (var i = 0; i < data.length; i++) {
                document.getElementById("mcs_top1").innerHTML = "Others";
                document.getElementById("mcs_perc1").innerHTML = sum.toFixed(2) + " %";

                document.getElementById("mcs_top2").innerHTML = data[0].business;
                document.getElementById("mcs_perc2").innerHTML = data[0].total + " %";

                document.getElementById("mcs_top3").innerHTML = data[1].business;
                document.getElementById("mcs_perc3").innerHTML = data[1].total + " %";

                document.getElementById("mcs_top4").innerHTML = data[2].business;
                document.getElementById("mcs_perc4").innerHTML = data[2].total + " %";

                topBusinesOutlet = [
                    {
                        name: "Others",
                        totalVisit: sum, //percentage
                    },
                    {
                        name: data[0].business,
                        totalVisit: data[0].total, //percentage
                    },
                    {
                        name: data[1].business,
                        totalVisit: data[1].total,  //percentage
                    },
                    {
                        name: data[2].business,
                        totalVisit: data[2].total,  //percentage
                    },
                ];
            }

            const pieGraphMovement = (elementContainer, data) => {
                let oldValue = 0;
                let styleString = "";
                let startingPoint = "";
                const color = {
                    0: " var(--accent)",
                    1: "#132D28",
                    2: "#8F9092",
                    3: "#AB262A",
                };
                data.map((value, key) => {
                    startingPoint = oldValue == 0 ? "" : `${oldValue}%`;
                    let newValue = value.totalVisit + oldValue;
                    styleString +=
                        oldValue == 0
                            ? `${color[key]} ${startingPoint} ${value.totalVisit}%,`
                            : `${color[key]} ${startingPoint} ${newValue}%,`;
                    oldValue += value.totalVisit;
                });
                // console.log(styleString);
                document
                    .querySelector(`${elementContainer}`)
                    .setAttribute("style", `background: conic-gradient(${styleString}#D3D3D3 0 0%)`);
            };

            const populateInfo = (elementContainer, data) => {
                let element = document.querySelector(`${elementContainer}`);
                data.map((value, key) => {
                    // console.log();
                    element.children[key].children[1].innerText = value.name;
                    element.children[key].children[2].innerText = `${value.totalVisit}%`;
                });
            };

            const populateTable = (elementContainer, data) => {
                let element = document
                    .querySelector(`${elementContainer}`)
                    .children[0].getElementsByTagName("tbody");
                data.map((value, key) => {
                    if (value.name !== "Others") {
                        let newRow = element[0].insertRow();
                        let nameCell = newRow.insertCell();
                        let valueCell = newRow.insertCell();
                        var nameNode = document.createTextNode(value.name);
                        var valueNode = document.createTextNode(value.totalVisit);
                        nameCell.appendChild(nameNode);
                        valueCell.appendChild(valueNode);
                    }
                });
            };
            //console.log(topBusinesOutlet);
            pieGraphMovement("#ts-pie-graph", topBusinesOutlet);
        }
    });

}
async function topWellnessFilter() {
    $('#mcw').change(function () {
        var data = {};
        data.day = $('#mcw').val();
        ////console.log(data);

        $.ajax({
            url: '/Dashboard/PostMostCickWellness',
            data: {
                data: data,
            },
            type: "POST",
            datatype: "json",
            success: function (data) {
                ////console.log(data);
                var sum = 0;
                for (var x = 3; x < data.length; x++) {
                    sum += data[x].total;

                }
                //console.log(sum);
                for (var i = 0; i < data.length; i++) {
                    document.getElementById("mcw_top1").innerHTML = "Others";
                    document.getElementById("mcw_perc1").innerHTML = sum.toFixed(2) + " %";

                    document.getElementById("mcw_top2").innerHTML = data[0].business;
                    document.getElementById("mcw_perc2").innerHTML = data[0].total + " %";

                    document.getElementById("mcw_top3").innerHTML = data[1].business;
                    document.getElementById("mcw_perc3").innerHTML = data[1].total + " %";

                    document.getElementById("mcw_top4").innerHTML = data[2].business;
                    document.getElementById("mcw_perc4").innerHTML = data[2].total + " %";

                    topBusinesOutlet = [
                        {
                            name: "Others",
                            totalVisit: sum, //percentage
                        },
                        {
                            name: data[0].business,
                            totalVisit: data[0].total, //percentage
                        },
                        {
                            name: data[1].business,
                            totalVisit: data[1].total,  //percentage
                        },
                        {
                            name: data[2].business,
                            totalVisit: data[2].total,  //percentage
                        },
                    ];
                }

                const pieGraphMovement = (elementContainer, data) => {
                    let oldValue = 0;
                    let styleString = "";
                    let startingPoint = "";
                    const color = {
                        0: " var(--accent)",
                        1: "#132D28",
                        2: "#8F9092",
                        3: "#AB262A",
                    };
                    data.map((value, key) => {
                        startingPoint = oldValue == 0 ? 0 : `${oldValue}%`;
                        let newValue = value.totalVisit + oldValue;
                        styleString +=
                            oldValue == 0
                                ? `${color[key]} ${startingPoint} ${value.totalVisit}%,`
                                : `${color[key]} ${startingPoint} ${newValue}%,`;
                        oldValue += value.totalVisit;
                    });
                    // console.log(styleString);
                    document
                        .querySelector(`${elementContainer}`)
                        .setAttribute("style", `background: conic-gradient(${styleString} #D3D3D3 0 0%)`);
                };

                const populateInfo = (elementContainer, data) => {
                    let element = document.querySelector(`${elementContainer}`);
                    data.map((value, key) => {
                        // console.log();
                        element.children[key].children[1].innerText = value.name;
                        element.children[key].children[2].innerText = `${value.totalVisit}%`;
                    });
                };

                const populateTable = (elementContainer, data) => {
                    let element = document
                        .querySelector(`${elementContainer}`)
                        .children[0].getElementsByTagName("tbody");
                    data.map((value, key) => {
                        if (value.name !== "Others") {
                            let newRow = element[0].insertRow();
                            let nameCell = newRow.insertCell();
                            let valueCell = newRow.insertCell();
                            var nameNode = document.createTextNode(value.name);
                            var valueNode = document.createTextNode(value.totalVisit);
                            nameCell.appendChild(nameNode);
                            valueCell.appendChild(valueNode);
                        }
                    });
                };
                console.log(topBusinesOutlet);
                pieGraphMovement("#tw-pie-graph", topBusinesOutlet);
            }
        });
    });
}
async function topWellness() {
    
    var data = {};
    data.day = $('#mcw').val();
    ////console.log(data);

    $.ajax({
        url: '/Dashboard/PostMostCickWellness',
        data: {
            data: data,
        },
        type: "POST",
        datatype: "json",
        success: function (data) {
            ////console.log(data);
            var sum = 0;
            for (var x = 3; x < data.length; x++) {
                sum += data[x].total;

            }
            //console.log(sum);
            for (var i = 0; i < data.length; i++) {
                document.getElementById("mcw_top1").innerHTML = "Others";
                document.getElementById("mcw_perc1").innerHTML = sum.toFixed(2) + " %";

                document.getElementById("mcw_top2").innerHTML = data[0].business;
                document.getElementById("mcw_perc2").innerHTML = data[0].total + " %";

                document.getElementById("mcw_top3").innerHTML = data[1].business;
                document.getElementById("mcw_perc3").innerHTML = data[1].total + " %";

                document.getElementById("mcw_top4").innerHTML = data[2].business;
                document.getElementById("mcw_perc4").innerHTML = data[2].total + " %";

                topBusinesOutlet = [
                    {
                        name: "Others",
                        totalVisit: sum, //percentage
                    },
                    {
                        name: data[0].business,
                        totalVisit: data[0].total, //percentage
                    },
                    {
                        name: data[1].business,
                        totalVisit: data[1].total,  //percentage
                    },
                    {
                        name: data[2].business,
                        totalVisit: data[2].total,  //percentage
                    },
                ];
            }

            const pieGraphMovement = (elementContainer, data) => {
                let oldValue = 0;
                let styleString = "";
                let startingPoint = "";
                const color = {
                    0: " var(--accent)",
                    1: "#132D28",
                    2: "#8F9092",
                    3: "#AB262A",
                };
                data.map((value, key) => {
                    startingPoint = oldValue == 0 ? "" : `${oldValue}%`;
                    let newValue = value.totalVisit + oldValue;
                    styleString +=
                        oldValue == 0
                            ? `${color[key]} ${startingPoint} ${value.totalVisit}%,`
                            : `${color[key]} ${startingPoint} ${newValue}%,`;
                    oldValue += value.totalVisit;
                });
                // console.log(styleString);
                document
                    .querySelector(`${elementContainer}`)
                    .setAttribute("style", `background: conic-gradient(${styleString}#D3D3D3 0 0%)`);
            };

            const populateInfo = (elementContainer, data) => {
                let element = document.querySelector(`${elementContainer}`);
                data.map((value, key) => {
                    // console.log();
                    element.children[key].children[1].innerText = value.name;
                    element.children[key].children[2].innerText = `${value.totalVisit}%`;
                });
            };

            const populateTable = (elementContainer, data) => {
                let element = document
                    .querySelector(`${elementContainer}`)
                    .children[0].getElementsByTagName("tbody");
                data.map((value, key) => {
                    if (value.name !== "Others") {
                        let newRow = element[0].insertRow();
                        let nameCell = newRow.insertCell();
                        let valueCell = newRow.insertCell();
                        var nameNode = document.createTextNode(value.name);
                        var valueNode = document.createTextNode(value.totalVisit);
                        nameCell.appendChild(nameNode);
                        valueCell.appendChild(valueNode);
                    }
                });
            };
            //console.log(topBusinesOutlet);
            pieGraphMovement("#tw-pie-graph", topBusinesOutlet);
        }
    });

}
async function topOfferFilter() {
    $('#mcof').change(function () {
        var data = {};
        data.day = $('#mcof').val();
        ////console.log(data);

        $.ajax({
            url: '/Dashboard/PostMostCickOffer',
            data: {
                data: data,
            },
            type: "POST",
            datatype: "json",
            success: function (data) {
                ////console.log(data);
                var sum = 0;
                for (var x = 3; x < data.length; x++) {
                    sum += data[x].total;

                }
                //console.log(sum);
                for (var i = 0; i < data.length; i++) {
                    document.getElementById("mcof_top1").innerHTML = "Others";
                    document.getElementById("mcof_perc1").innerHTML = sum.toFixed(2) + " %";

                    document.getElementById("mcof_top2").innerHTML = data[0].business;
                    document.getElementById("mcof_perc2").innerHTML = data[0].total + " %";

                    document.getElementById("mcof_top3").innerHTML = data[1].business;
                    document.getElementById("mcof_perc3").innerHTML = data[1].total + " %";

                    document.getElementById("mcof_top4").innerHTML = data[2].business;
                    document.getElementById("mcof_perc4").innerHTML = data[2].total + " %";

                    topBusinesOutlet = [
                        {
                            name: "Others",
                            totalVisit: sum, //percentage
                        },
                        {
                            name: data[0].business,
                            totalVisit: data[0].total, //percentage
                        },
                        {
                            name: data[1].business,
                            totalVisit: data[1].total,  //percentage
                        },
                        {
                            name: data[2].business,
                            totalVisit: data[2].total,  //percentage
                        },
                    ];
                }

                const pieGraphMovement = (elementContainer, data) => {
                    let oldValue = 0;
                    let styleString = "";
                    let startingPoint = "";
                    const color = {
                        0: " var(--accent)",
                        1: " #132D28",
                        2: " #8F9092",
                        3: " #AB262A",
                    }; 
                    data.map((value, key) => {
                        startingPoint = oldValue == 0 ? 0 : `${oldValue}%`;
                        let newValue = value.totalVisit + oldValue;
                        styleString +=
                            oldValue == 0
                                ? `${color[key]} ${startingPoint} ${value.totalVisit}%,`
                                : `${color[key]} ${startingPoint} ${newValue}%,`;
                        oldValue += value.totalVisit;
                    });
                    // console.log(styleString);
                    document
                        .querySelector(`${elementContainer}`)
                        .setAttribute("style", `background: conic-gradient(${styleString} #D3D3D3 0 0%)`);
                };

                const populateInfo = (elementContainer, data) => {
                    let element = document.querySelector(`${elementContainer}`);
                    data.map((value, key) => {
                        // console.log();
                        element.children[key].children[1].innerText = value.name;
                        element.children[key].children[2].innerText = `${value.totalVisit}%`;
                    });
                };

                const populateTable = (elementContainer, data) => {
                    let element = document
                        .querySelector(`${elementContainer}`)
                        .children[0].getElementsByTagName("tbody");
                    data.map((value, key) => {
                        if (value.name !== "Others") {
                            let newRow = element[0].insertRow();
                            let nameCell = newRow.insertCell();
                            let valueCell = newRow.insertCell();
                            var nameNode = document.createTextNode(value.name);
                            var valueNode = document.createTextNode(value.totalVisit);
                            nameCell.appendChild(nameNode);
                            valueCell.appendChild(valueNode);
                        }
                    });
                };
                console.log(topBusinesOutlet);
                pieGraphMovement("#tof-pie-graph", topBusinesOutlet);
            }
        });
    });
}
async function topOffer() {

    var data = {};
    data.day = $('#mcof').val();
    ////console.log(data);

    $.ajax({
        url: '/Dashboard/PostMostCickOffer',
        data: {
            data: data,
        },
        type: "POST",
        datatype: "json",
        success: function (data) {
            ////console.log(data);
            var sum = 0;
            for (var x = 3; x < data.length; x++) {
                sum += data[x].total;

            }
            //console.log(sum);
            for (var i = 0; i < data.length; i++) {
                document.getElementById("mcof_top1").innerHTML = "Others";
                document.getElementById("mcof_perc1").innerHTML = sum.toFixed(2) + " %";

                document.getElementById("mcof_top2").innerHTML = data[0].business;
                document.getElementById("mcof_perc2").innerHTML = data[0].total + " %";

                document.getElementById("mcof_top3").innerHTML = data[1].business;
                document.getElementById("mcof_perc3").innerHTML = data[1].total + " %";

                document.getElementById("mcof_top4").innerHTML = data[2].business;
                document.getElementById("mcof_perc4").innerHTML = data[2].total + " %";

                topBusinesOutlet = [
                    {
                        name: "Others",
                        totalVisit: sum, //percentage
                    },
                    {
                        name: data[0].business,
                        totalVisit: data[0].total, //percentage
                    },
                    {
                        name: data[1].business,
                        totalVisit: data[1].total,  //percentage
                    },
                    {
                        name: data[2].business,
                        totalVisit: data[2].total,  //percentage
                    },
                ];
            }

            const pieGraphMovement = (elementContainer, data) => {
                let oldValue = 0;
                let styleString = "";
                let startingPoint = "";
                const color = {
                    0: " var(--accent)",
                    1: "#132D28",
                    2: "#8F9092",
                    3: "#AB262A",
                };
                data.map((value, key) => {
                    startingPoint = oldValue == 0 ? "" : `${oldValue}%`;
                    let newValue = value.totalVisit + oldValue;
                    styleString +=
                        oldValue == 0
                            ? `${color[key]} ${startingPoint} ${value.totalVisit}%,`
                            : `${color[key]} ${startingPoint} ${newValue}%,`;
                    oldValue += value.totalVisit;
                });
                // console.log(styleString);
                document
                    .querySelector(`${elementContainer}`)
                    .setAttribute("style", `background: conic-gradient(${styleString} #D3D3D3 0 0%)`);
            };

            const populateInfo = (elementContainer, data) => {
                let element = document.querySelector(`${elementContainer}`);
                data.map((value, key) => {
                    // console.log();
                    element.children[key].children[1].innerText = value.name;
                    element.children[key].children[2].innerText = `${value.totalVisit}%`;
                });
            };

            const populateTable = (elementContainer, data) => {
                let element = document
                    .querySelector(`${elementContainer}`)
                    .children[0].getElementsByTagName("tbody");
                data.map((value, key) => {
                    if (value.name !== "Others") {
                        let newRow = element[0].insertRow();
                        let nameCell = newRow.insertCell();
                        let valueCell = newRow.insertCell();
                        var nameNode = document.createTextNode(value.name);
                        var valueNode = document.createTextNode(value.totalVisit);
                        nameCell.appendChild(nameNode);
                        valueCell.appendChild(valueNode);
                    }
                });
            };
            //console.log(topBusinesOutlet);
            pieGraphMovement("#tof-pie-graph", topBusinesOutlet);
        }
    });

}

//JS for Modal
async function showRestaurantDetails() {
    $('#mcr_vm').click(function () {
        document.getElementById("btn-mcs").style.display = "none";
        document.getElementById("btn-mch").style.display = "none";
        document.getElementById("btn-mcr").style.display = "block";
        document.getElementById("modalTitle").innerHTML = "Restaurant";
        document.getElementById("modalTHTitle").innerHTML = "Restaurant";
        var data = {};
        data.day = $('#mcr').val();
        // $.blockUI(reloadLoading);
        setTimeout(function () {
            $.ajax(
                {
                    url: "/Dashboard/PostMostClickRestaurant",
                    data: {
                        data: data,
                    },
                    type: "POST",
                    datatype: "json"
                }).done(function (data) {

                    mcrtable.clear().draw();
                    for (var i = 0; i < data.length; i++) {
                        $("#mcr_call").dataTable().fnAddData([
                            "<td><p></p><p>" + data[i].business + "</p></td>",
                            "<td><p>" + data[i].count + "</p></td>",
                            "<td><p>" + data[i].total + " %" + "</p></td>",

                        ]);
                    }
                    $.unblockUI();
                }).fail(function () {
                    alert("There was an Error When Loading Data...");
                });
        }, 100);
        $('#ShowMostClickModal').modal('show');
    });
}
async function showHotelDetails() {
    $('#mch_vm').click(function () {
        document.getElementById("btn-mcs").style.display = "none";
        document.getElementById("btn-mch").style.display = "block";
        document.getElementById("btn-mcr").style.display = "none";
        document.getElementById("modalTitle").innerHTML = "Hotel";
        document.getElementById("modalTHTitle").innerHTML = "Hotel";
        var data = {};
        data.day = $('#mch').val();
        // $.blockUI(reloadLoading);
        setTimeout(function () {
            $.ajax(
                {
                    url: "/Dashboard/PostMostClickedHospitality",
                    data: {
                        data: data,
                    },
                    type: "POST",
                    datatype: "json"
                }).done(function (data) {

                    mcrtable.clear().draw();
                    for (var i = 0; i < data.length; i++) {
                        $("#mcr_call").dataTable().fnAddData([
                            "<td><p></p><p>" + data[i].business + "</p></td>",
                            "<td><p>" + data[i].count + "</p></td>",
                            "<td><p>" + data[i].total + " %" + "</p></td>",

                        ]);
                    }
                    $.unblockUI();
                }).fail(function () {
                    alert("There was an Error When Loading Data...");
                });
        }, 100);
        $('#ShowMostClickModal').modal('show');
    });
}
async function showStoreDetails() {
    $('#mcs_vm').click(function () {
        document.getElementById("btn-mcs").style.display = "block";
        document.getElementById("btn-mch").style.display = "none";
        document.getElementById("btn-mcr").style.display = "none";
        document.getElementById("modalTitle").innerHTML = "Store";
        document.getElementById("modalTHTitle").innerHTML = "Store";
        var data = {};
        data.day = $('#mcs').val();
        // $.blockUI(reloadLoading);
        setTimeout(function () {
            $.ajax(
                {
                    url: "/Dashboard/PostMostCickStore",
                    data: {
                        data: data,
                    },
                    type: "POST",
                    datatype: "json"
                }).done(function (data) {

                    mcrtable.clear().draw();
                    for (var i = 0; i < data.length; i++) {
                        $("#mcr_call").dataTable().fnAddData([
                            "<td><p></p><p>" + data[i].business + "</p></td>",
                            "<td><p>" + data[i].count + "</p></td>",
                            "<td><p>" + data[i].total + " %" + "</p></td>",

                        ]);
                    }
                    $.unblockUI();
                }).fail(function () {
                    alert("There was an Error When Loading Data...");
                });
        }, 100);
        $('#ShowMostClickModal').modal('show');
    });
}
async function showWellnessDetails() {
    $('#mcw_vm').click(function () {
        document.getElementById("btn-mcs").style.display = "none";
        document.getElementById("btn-mch").style.display = "none";
        document.getElementById("btn-mcr").style.display = "block";
        document.getElementById("modalTitle").innerHTML = "Wellness";
        document.getElementById("modalTHTitle").innerHTML = "Wellness";
        var data = {};
        data.day = $('#mcw').val();
        // $.blockUI(reloadLoading);
        setTimeout(function () {
            $.ajax(
                {
                    url: "/Dashboard/PostMostCickWellness",
                    data: {
                        data: data,
                    },
                    type: "POST",
                    datatype: "json"
                }).done(function (data) {

                    mcrtable.clear().draw();
                    for (var i = 0; i < data.length; i++) {
                        $("#mcr_call").dataTable().fnAddData([
                            "<td><p></p><p>" + data[i].business + "</p></td>",
                            "<td><p>" + data[i].count + "</p></td>",
                            "<td><p>" + data[i].total + " %" + "</p></td>",

                        ]);
                    }
                    $.unblockUI();
                }).fail(function () {
                    alert("There was an Error When Loading Data...");
                });
        }, 100);
        $('#ShowMostClickModal').modal('show');
    });
}
async function showOfferDetails() {
    $('#mco_vm').click(function () {
        document.getElementById("btn-mcs").style.display = "none";
        document.getElementById("btn-mch").style.display = "none";
        document.getElementById("btn-mcr").style.display = "block";
        document.getElementById("modalTitle").innerHTML = "Offer";
        document.getElementById("modalTHTitle").innerHTML = "Offer";
        var data = {};
        data.day = $('#mcof').val();
        // $.blockUI(reloadLoading);
        setTimeout(function () {
            $.ajax(
                {
                    url: "/Dashboard/PostMostCickOffer",
                    data: {
                        data: data,
                    },
                    type: "POST",
                    datatype: "json"
                }).done(function (data) {

                    mcrtable.clear().draw();
                    for (var i = 0; i < data.length; i++) {
                        $("#mcr_call").dataTable().fnAddData([
                            "<td><p></p><p>" + data[i].business + "</p></td>",
                            "<td><p>" + data[i].count + "</p></td>",
                            "<td><p>" + data[i].total + " %" + "</p></td>",

                        ]);
                    }
                    $.unblockUI();
                }).fail(function () {
                    alert("There was an Error When Loading Data...");
                });
        }, 100);
        $('#ShowMostClickModal').modal('show');
    });
}


