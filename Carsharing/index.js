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
            let tableelement5 = document.createElement("td");
            let tableelement6 = document.createElement("td");
            let tableelement7 = document.createElement("td");
            let tableelement8 = document.createElement("td");
            let betriebsart = "";
            if (responseTextJson[i].electronic == true && responseTextJson[i].conventionell == false) {
                console.log("elektonik");
                betriebsart = "E-Auto";
            }
            else if (responseTextJson[i].conventionell == true && responseTextJson[i].electronic == false) {
                betriebsart = "Konventionell";
            }
            else {
                betriebsart = "Hybrid";
            }
            tableelement1.innerHTML = responseTextJson[i].id;
            tableelement2.innerHTML = responseTextJson[i].name;
            tableelement3.innerHTML = betriebsart;
            tableelement4.innerHTML = responseTextJson[i].fnut;
            tableelement5.innerHTML = responseTextJson[i].lnut;
            tableelement6.innerHTML = responseTextJson[i].max;
            tableelement7.innerHTML = responseTextJson[i].pnd;
            tableelement8.innerHTML = responseTextJson[i].ppmin;
            tablerow.appendChild(tableelement1);
            tablerow.appendChild(tableelement2);
            tablerow.appendChild(tableelement3);
            tablerow.appendChild(tableelement4);
            tablerow.appendChild(tableelement5);
            tablerow.appendChild(tableelement6);
            tablerow.appendChild(tableelement7);
            tablerow.appendChild(tableelement8);
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