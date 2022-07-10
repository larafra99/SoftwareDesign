"use strict";
var Carsharing;
(function (Carsharing) {
    showData("10");
    async function showData(caramount) {
        document.getElementById("showData").innerHTML = "";
        let url = "https://softwaredesign.herokuapp.com/index.html";
        let response = await fetch(url);
        let responseText = await response.text();
        let responseTextJson = JSON.parse(responseText);
        //console.log(response);
        console.log(responseTextJson);
        console.log(Object.keys(responseTextJson).length);
        let tabledescription = ["Auto Bezeichnung", "Antriebsart", "frühste Nutzungsuhrzeit", "späteste Nutzungsuhrzeit", "maximale Nutzungdauer", "pauschale Nutzungspreis", "Preis pro Minute", "Buchen"];
        let tabl = document.createElement("table");
        document.getElementById("showData").appendChild(tabl);
        for (let i = 0; i <= 7; i++) {
            let tableheader = document.createElement("th");
            tableheader.innerHTML = tabledescription[i];
            tabl.appendChild(tableheader);
        }
        let amount;
        if (caramount == "all") {
            amount = Object.keys(responseTextJson).length;
        }
        amount = parseInt(caramount);
        if (Object.keys(responseTextJson).length < amount || caramount == "all") {
            amount = Object.keys(responseTextJson).length;
        }
        for (let i = 0; i < amount; i++) {
            let tablerow = document.createElement("tr");
            let tableelement1 = document.createElement("td");
            let tableelement2 = document.createElement("td");
            let tableelement3 = document.createElement("td");
            let tableelement4 = document.createElement("td");
            let tableelement5 = document.createElement("td");
            let tableelement6 = document.createElement("td");
            let tableelement7 = document.createElement("td");
            let tableelement8 = document.createElement("button");
            tableelement8.addEventListener("click", bookcar);
            tableelement8.id = responseTextJson[i].id;
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
            tableelement1.innerHTML = responseTextJson[i].name;
            tableelement2.innerHTML = betriebsart;
            tableelement3.innerHTML = responseTextJson[i].fnut + " Uhr";
            tableelement4.innerHTML = responseTextJson[i].lnut + " Uhr";
            tableelement5.innerHTML = responseTextJson[i].max + " Min";
            tableelement6.innerHTML = responseTextJson[i].pnd + " €";
            tableelement7.innerHTML = responseTextJson[i].ppmin + " €";
            tableelement8.innerHTML = "näher ansehen";
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
        let amountButton = document.getElementById("submit");
        amountButton.addEventListener("click", amountbutton);
        let filterButton = document.getElementById("filterbutton");
        filterButton.addEventListener("click", filterbutton);
    }
    async function amountbutton(_event) {
        console.log("amount click");
        let amountForm = document.getElementById("amountForm");
        let formData = new FormData(amountForm);
        let query = new URLSearchParams(formData);
        console.log("Query", query.toString());
        console.log((query.toString()).substring(9));
        showData((query.toString()).substring(9));
    }
    async function filterbutton(_event) {
        let filterelement = document.createElement("p");
        filterelement.innerHTML = "hi";
        document.getElementById("filteroptions").appendChild(filterelement);
        console.log("filter click");
    }
    async function bookcar(_event) {
        console.log("click");
        let dataId = _event.target.id;
        console.log(dataId);
        localStorage.removeItem("dataId");
        localStorage.setItem("dataId", dataId);
        window.location.replace("bookcar.html");
    }
})(Carsharing || (Carsharing = {}));
//# sourceMappingURL=index.js.map