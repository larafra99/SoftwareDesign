"use strict";
//import{Car}from "./interfaces/interface.js";
var Carsharing;
(function (Carsharing) {
    showData();
    async function showData() {
        let url = "https://softwaredesign.herokuapp.com/bookcars.html";
        let dataId = sessionStorage.getItem("dataId");
        url = url + "?" + "&dataID=" + dataId;
        //console.log(url);
        let response = await fetch(url);
        let responseText = await response.text();
        let responseTextJson = JSON.parse(responseText);
        //console.log(response);
        //console.log(responseTextJson);
        let tabledescription = ["Auto Id", "Auto Bezeichnung", "Antriebsart", "frühste Nutzungsuhrzeit", "späteste Nutzungsuhrzeit", "maximale Nutzungdauer", "pauschale Nutzungspreis", "Preis pro Minute"];
        let tabl = document.createElement("table");
        document.getElementById("showCar").appendChild(tabl);
        for (let i = 0; i <= 7; i++) {
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
            console.log("elektronik");
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
        tableelement4.innerHTML = responseTextJson.fnut + " Uhr";
        tableelement5.innerHTML = responseTextJson.lnut + " Uhr";
        tableelement6.innerHTML = responseTextJson.max + " Min";
        tableelement7.innerHTML = responseTextJson.pnd + " €";
        tableelement8.innerHTML = responseTextJson.ppmin + " €";
        tablerow.appendChild(tableelement1);
        tablerow.appendChild(tableelement2);
        tablerow.appendChild(tableelement3);
        tablerow.appendChild(tableelement4);
        tablerow.appendChild(tableelement5);
        tablerow.appendChild(tableelement6);
        tablerow.appendChild(tableelement7);
        tablerow.appendChild(tableelement8);
        tabl.appendChild(tablerow);
        let timeForm = document.getElementById("time");
        let timeButton = document.getElementById("timebutton");
        timeButton.addEventListener("click", booktime);
        async function booktime(_event) {
            let checklogin = "https://softwaredesign.herokuapp.com/logincheck.html";
            let loginresponse = await fetch(checklogin);
            let loginresponseText = await loginresponse.text();
            console.log(loginresponse);
            console.log(loginresponseText);
            // console.log("click");
            // let formData: FormData = new FormData(timeForm);
            // let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
            // console.log(query.toString());
            // let timeurl: string = "https://softwaredesign.herokuapp.com/checktime.html";
            // timeurl = timeurl + "?" + query.toString();
            // console.log(timeurl);
            // let response: Response = await fetch(timeurl);
            // let responseText: string = await response.text();
            // console.log(response);
            // console.log(responseText);
            // let booktext: HTMLElement = document.createElement("p");
            // document.getElementById("response").appendChild(booktext);
            // booktext.innerHTML = responseText; 
        }
    }
})(Carsharing || (Carsharing = {}));
//# sourceMappingURL=bookcar.js.map