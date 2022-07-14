import { navibar } from "../function/flexnavi.js";
export class Statistic {
    static async showStatistic() {
        document.getElementById("fullstatistic").innerHTML = "";
        let url = "https://softwaredesign.herokuapp.com/getstatistc.html";
        let user = localStorage.getItem("user");
        url = url + "?" + "&" + user;
        // get statistics from server
        let response = await fetch(url);
        let responsetext = await response.text();
        let responsetextjson = JSON.parse(responsetext);
        // create table for all booking events
        let tabledescription = ["Auto Bezeichnung", "Datum", "Startnutzung", "Endnutzung", "Nutzungspreis"];
        let tabl = document.createElement("table");
        let overallprice = 0;
        document.getElementById("fullstatistic").appendChild(tabl);
        // create table header
        for (let i = 0; i < tabledescription.length; i++) {
            let tableheader = document.createElement("th");
            tableheader.innerHTML = tabledescription[i];
            tabl.appendChild(tableheader);
        }
        // create table elements with serverresponse
        for (let i = 0; i < Object.keys(responsetextjson).length; i++) {
            let starttime;
            let endtime;
            overallprice = overallprice + parseFloat(responsetextjson[i].price);
            if (responsetextjson[i].starttime.length == 3) {
                starttime = "0" + (responsetextjson[i].starttime).slice(0, 1) + ":" + (responsetextjson[i].starttime).slice(1);
            }
            else {
                starttime = (responsetextjson[i].starttime).slice(0, 2) + ":" + (responsetextjson[i].starttime).slice(2);
            }
            if (responsetextjson[i].endtime.length == 3) {
                endtime = "0" + (responsetextjson[i].endtime).slice(0, 1) + ":" + (responsetextjson[i].endtime).slice(1);
            }
            else {
                endtime = (responsetextjson[i].endtime).slice(0, 2) + ":" + (responsetextjson[i].endtime).slice(2);
            }
            let tablerow = document.createElement("tr");
            let tableelement1 = document.createElement("td");
            let tableelement2 = document.createElement("td");
            let tableelement3 = document.createElement("td");
            let tableelement4 = document.createElement("td");
            let tableelement5 = document.createElement("td");
            tableelement1.innerHTML = responsetextjson[i].carid;
            tableelement2.innerHTML = responsetextjson[i].date;
            tableelement3.innerHTML = starttime + " Uhr";
            tableelement4.innerHTML = endtime + " Uhr";
            tableelement5.innerHTML = responsetextjson[i].price + " €";
            tablerow.appendChild(tableelement1);
            tablerow.appendChild(tableelement2);
            tablerow.appendChild(tableelement3);
            tablerow.appendChild(tableelement4);
            tablerow.appendChild(tableelement5);
            tabl.appendChild(tablerow);
        }
        // create Text for average costs and overall costs
        let averageprice = overallprice / Object.keys(responsetextjson).length;
        let stats = document.createElement("p");
        let stats2 = document.createElement("p");
        let stats3 = document.createElement("p");
        document.getElementById("statistic").appendChild(stats);
        document.getElementById("statistic").appendChild(stats2);
        document.getElementById("statistic").appendChild(stats3);
        stats.innerHTML = "Gesamtkosten aller Fahrten:  " + overallprice + " €";
        stats2.innerHTML = "Anzahl an Fahrten:  " + Object.keys(responsetextjson).length;
        stats3.innerHTML = "Durchschnittskosten Ihrer Fahrten:  " + averageprice + " €";
    }
}
;
localStorage.setItem("lastmove", "statistic.html");
navibar();
Statistic.showStatistic();
//# sourceMappingURL=statstic.js.map