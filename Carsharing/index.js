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
        let tabledescription = ["Auto Id", "Auto Bezeichnung", "Antriebsart", "frühste Nutzungsuhrzeit", "späteste Nutzungsuhrzeit", "maximale Nutzungdauer", "pauschale Nutzungspreis", "Preis pro Minute", "Buchen"];
        let tabl = document.createElement("table");
        document.getElementById("showData").appendChild(tabl);
        for (let i = 0; i <= 8; i++) {
            let tableheader = document.createElement("th");
            tableheader.innerHTML = tabledescription[i];
            tabl.appendChild(tableheader);
        }
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
            let tableelement9 = document.createElement("button");
            tableelement9.addEventListener("click", bookcar);
            tableelement9.id = responseTextJson[i].id;
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
            tableelement9.innerHTML = "buchen";
            tablerow.appendChild(tableelement1);
            tablerow.appendChild(tableelement2);
            tablerow.appendChild(tableelement3);
            tablerow.appendChild(tableelement4);
            tablerow.appendChild(tableelement5);
            tablerow.appendChild(tableelement6);
            tablerow.appendChild(tableelement7);
            tablerow.appendChild(tableelement8);
            tablerow.appendChild(tableelement9);
            tabl.appendChild(tablerow);
        }
    }
    async function bookcar(_event) {
        console.log("click");
        let dataId = _event.target.id;
        console.log(dataId);
        sessionStorage.removeItem("dataId");
        sessionStorage.setItem("dataId", dataId);
        window.location.replace("bookcar.html");
    }
})(Carsharing || (Carsharing = {}));
//# sourceMappingURL=index.js.map