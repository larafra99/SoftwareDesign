"use strict";
var Carsharing;
(function (Carsharing) {
    showData();
    async function showData() {
        let url = "https://softwaredesign.herokuapp.com/index.html";
        let response = await fetch(url);
        let responseText = await response.text();
        let responseTextJson = JSON.parse(responseText);
        //console.log(response);
        console.log(responseTextJson);
        console.log(Object.keys(responseTextJson).length);
        let tabl = document.createElement("table");
        let tableheader1 = document.createElement("th");
        let tableheader2 = document.createElement("th");
        let tableheader3 = document.createElement("th");
        let tableheader4 = document.createElement("th");
        let tableheader5 = document.createElement("th");
        let tableheader6 = document.createElement("th");
        let tableheader7 = document.createElement("th");
        let tableheader8 = document.createElement("th");
        tableheader1.innerHTML = "Auto Id";
        tableheader2.innerHTML = "Auto Bezeichnung";
        tableheader3.innerHTML = "Antriebsart";
        tableheader4.innerHTML = "frühste Nutzungsuhrzeit";
        tableheader5.innerHTML = "späteste Nutzungsuhrzeit";
        tableheader6.innerHTML = "maximale Nutzungdauer";
        tableheader7.innerHTML = "pauschale Nutzungspreis";
        tableheader8.innerHTML = "Preis pro Minute";
        document.getElementById("showData").appendChild(tabl);
        tabl.appendChild(tableheader1);
        tabl.appendChild(tableheader2);
        tabl.appendChild(tableheader3);
        tabl.appendChild(tableheader4);
        tabl.appendChild(tableheader5);
        tabl.appendChild(tableheader6);
        tabl.appendChild(tableheader7);
        tabl.appendChild(tableheader8);
        for (let i = 0; i < Object.keys(responseTextJson).length; i++) {
            let tablerow = document.createElement("tr");
            let tableelement1 = document.createElement("td");
            let tableelement2 = document.createElement("td");
            let tableelement3 = document.createElement("td");
            let tableelement4 = document.createElement("td");
            let imag = document.createElement("img");
            imag.src = "picture/" + responseTextJson[i].url;
            tableelement2.innerHTML = responseTextJson[i].name;
            tableelement3.innerHTML = responseTextJson[i].geld;
            //console.log(responseTextJson[1].status);
            console.log(sessionStorage.getItem("userId"));
            console.log("respone" + responseTextJson[i].reserviert);
            if (responseTextJson[i].status == "frei") {
                let button = document.createElement("button");
                button.addEventListener("click", ausleihen);
                button.id = responseTextJson[i]._id;
                //console.log(responseTextJson[i]._id);
                tableelement4.appendChild(button);
                button.innerHTML = "ausleihen";
            }
            else {
                tableelement4.innerHTML = responseTextJson[i].status;
                if (responseTextJson[i].reserviert == sessionStorage.getItem("userId")) {
                    tablerow.style.backgroundColor = "#81F781";
                }
                else {
                    tablerow.style.backgroundColor = "#9B9696";
                }
            }
            tablerow.appendChild(tableelement1);
            tablerow.appendChild(tableelement2);
            tablerow.appendChild(tableelement3);
            tablerow.appendChild(tableelement4);
            tableelement1.appendChild(imag);
            tabl.appendChild(tablerow);
        }
    }
    async function ausleihen(_event) {
        let url = "https://gisws2021.herokuapp.com/ausleihen.html";
        let userId = sessionStorage.getItem("userId");
        let dataId = _event.target.id;
        console.log(dataId);
        url = url + "?" + "userID=" + userId + "&dataID=" + dataId;
        console.log(url);
        let response = await fetch(url);
        let responseText = await response.text();
        //console.log(response);
        console.log(responseText);
        window.location.replace("verleih.html");
    }
})(Carsharing || (Carsharing = {}));
//# sourceMappingURL=index.js.map