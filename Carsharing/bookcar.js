"use strict";
var Carsharing;
(function (Carsharing) {
    showData();
    async function showData() {
        let url = "https://softwaredesign.herokuapp.com/bookcars.html";
        let response = await fetch(url);
        let responseText = await response.text();
        let responseTextJson = JSON.parse(responseText);
        //console.log(response);
        console.log(responseTextJson);
        let tabledescription = ["Auto Id", "Auto Bezeichnung", "Antriebsart", "frühste Nutzungsuhrzeit", "späteste Nutzungsuhrzeit", "maximale Nutzungdauer", "pauschale Nutzungspreis", "Preis pro Minute", "Buchen"];
        let tabl = document.createElement("table");
        document.getElementById("showData").appendChild(tabl);
        for (let i = 0; i <= 8; i++) {
            let tableheader = document.createElement("th");
            tableheader.innerHTML = tabledescription[i];
            tabl.appendChild(tableheader);
        }
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
        if (responseTextJson.electronic == true && responseTextJson.conventionell == false) {
            console.log("elektonik");
            betriebsart = "E-Auto";
        }
        else if (responseTextJson.conventionell == true && responseTextJson.electronic == false) {
            betriebsart = "Konventionell";
        }
        else {
            betriebsart = "Hybrid";
        }
        tableelement1.innerHTML = responseTextJson.id;
        tableelement2.innerHTML = responseTextJson.name;
        tableelement3.innerHTML = betriebsart;
        tableelement4.innerHTML = responseTextJson.fnut;
        tableelement5.innerHTML = responseTextJson.lnut;
        tableelement6.innerHTML = responseTextJson.max;
        tableelement7.innerHTML = responseTextJson.pnd;
        tableelement8.innerHTML = responseTextJson.ppmin;
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
})(Carsharing || (Carsharing = {}));
//# sourceMappingURL=bookcar.js.map