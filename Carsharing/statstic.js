import { navibar } from "./function/flexnavi.js";
localStorage.setItem("lastmove", "statistic.html");
navibar();
showstatistic();
async function showstatistic() {
    document.getElementById("fullstatistic").innerHTML = "";
    let url = "https://softwaredesign.herokuapp.com/getstatistc.html";
    let user = localStorage.getItem("user");
    url = url + "?" + "&" + user;
    let response = await fetch(url);
    let responseText = await response.text();
    let responseTextJson = JSON.parse(responseText);
    let tabledescription = ["Auto Bezeichnung", "Datum", "Startnutzung", "Endnutzung", "Nutzungspreis"];
    let tabl = document.createElement("table");
    let overallprice = 0;
    document.getElementById("fullstatistic").appendChild(tabl);
    for (let i = 0; i < tabledescription.length; i++) {
        let tableheader = document.createElement("th");
        tableheader.innerHTML = tabledescription[i];
        tabl.appendChild(tableheader);
    }
    for (let i = 0; i < Object.keys(responseTextJson).length; i++) {
        let starttime;
        let endtime;
        overallprice = overallprice + parseFloat(responseTextJson[i].price);
        if (responseTextJson[i].starttime.length == 3) {
            starttime = "0" + (responseTextJson[i].starttime).slice(0, 1) + ":" + (responseTextJson[i].starttime).slice(1);
        }
        else {
            starttime = (responseTextJson[i].starttime).slice(0, 2) + ":" + (responseTextJson[i].starttime).slice(2);
        }
        if (responseTextJson[i].endtime.length == 3) {
            endtime = "0" + (responseTextJson[i].endtime).slice(0, 1) + ":" + (responseTextJson[i].endtime).slice(1);
        }
        else {
            endtime = (responseTextJson[i].endtime).slice(0, 2) + ":" + (responseTextJson[i].endtime).slice(2);
        }
        let tablerow = document.createElement("tr");
        let tableelement1 = document.createElement("td");
        let tableelement2 = document.createElement("td");
        let tableelement3 = document.createElement("td");
        let tableelement4 = document.createElement("td");
        let tableelement5 = document.createElement("td");
        tableelement1.innerHTML = responseTextJson[i].carid;
        tableelement2.innerHTML = responseTextJson[i].date;
        tableelement3.innerHTML = starttime + " Uhr";
        tableelement4.innerHTML = endtime + " Uhr";
        tableelement5.innerHTML = responseTextJson[i].price + " €";
        tablerow.appendChild(tableelement1);
        tablerow.appendChild(tableelement2);
        tablerow.appendChild(tableelement3);
        tablerow.appendChild(tableelement4);
        tablerow.appendChild(tableelement5);
        tabl.appendChild(tablerow);
    }
    let averageprice = overallprice / Object.keys(responseTextJson).length;
    let stats = document.createElement("p");
    let stats2 = document.createElement("p");
    let stats3 = document.createElement("p");
    document.getElementById("statistic").appendChild(stats);
    document.getElementById("statistic").appendChild(stats2);
    document.getElementById("statistic").appendChild(stats3);
    stats.innerHTML = "Gesamtkosten aller Fahrten:  " + overallprice + " €";
    stats2.innerHTML = "Anzahl an Fahrten:  " + Object.keys(responseTextJson).length;
    stats3.innerHTML = "Durchschnitskosten Ihrer Fahrten:  " + averageprice + " €";
}
//# sourceMappingURL=statstic.js.map