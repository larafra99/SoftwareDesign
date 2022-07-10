"use strict";
var Carsharing;
(function (Carsharing) {
    showData();
    async function showData() {
        document.getElementById("showData").innerHTML = "";
        let filter = localStorage.getItem("filter");
        if (filter == "a" || filter == null) {
            let filterurl = "https://softwaredesign.herokuapp.com/index.html?filter=a";
            localStorage.setItem("url", filterurl);
        }
        else if (filter == "b") {
            let filterurl = "https://softwaredesign.herokuapp.com/index.html?filter=b";
            localStorage.setItem("url", filterurl);
        }
        else {
            let filterurl = "https://softwaredesign.herokuapp.com/index.html?filter=c";
            localStorage.setItem("url", filterurl);
        }
        let url = localStorage.getItem("url");
        let response = await fetch(url);
        let responseText = await response.text();
        let responseTextJson = JSON.parse(responseText);
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
        let caramount = localStorage.getItem("amount");
        let amount;
        if (caramount == null) {
            amount = 10;
        }
        else {
            amount = parseInt(caramount);
        }
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
        localStorage.setItem("amount", (query.toString()).substring(9));
        showData();
    }
    async function filterbutton(_event) {
        console.log("filter click");
        let filterForm = document.getElementById("filterForm");
        let formData = new FormData(filterForm);
        let query = new URLSearchParams(formData);
        console.log("Query", query.toString());
        console.log((query.toString()).substring(7));
        localStorage.removeItem("filter");
        //localStorage.setItem("filter",(query.toString()).substring(7));
        showData();
    }
    async function bookcar(_event) {
        console.log("click");
        let dataId = _event.target.id;
        console.log(dataId);
        localStorage.setItem("dataId", dataId);
        window.location.replace("bookcar.html");
    }
})(Carsharing || (Carsharing = {}));
//# sourceMappingURL=index.js.map