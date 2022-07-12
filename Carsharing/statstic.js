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
    console.log("statistic", responseTextJson);
    let tabledescription = ["Auto Bezeichnung", "Datum", "Startnutzung", "Endnutzung", "Nutzungspreis"];
    let tabl = document.createElement("table");
    document.getElementById("fullstatistic").appendChild(tabl);
    for (let i = 0; i <= 4; i++) {
        let tableheader = document.createElement("th");
        tableheader.innerHTML = tabledescription[i];
        tabl.appendChild(tableheader);
    }
    // for ( let i: number = 0; i < amount; i++) {
    //     let tablerow: HTMLElement = document.createElement("tr");
    //     let tableelement1: HTMLElement = document.createElement("td");
    //     let tableelement2: HTMLElement = document.createElement("td");
    //     let tableelement3: HTMLElement = document.createElement("td");
    //     let tableelement4: HTMLElement = document.createElement("td");
    //     let tableelement5: HTMLElement = document.createElement("td");
    //     let tableelement6: HTMLElement = document.createElement("td");
    //     let tableelement7: HTMLElement = document.createElement("td");
    //     let tableelement8: HTMLElement = document.createElement("button");
    //     tableelement8.addEventListener("click", bookonecar);
    //     tableelement8.id = responseTextJson[i].id;
    //     tableelement1.innerHTML = responseTextJson[i].name; 
    //     tableelement2.innerHTML = betriebsart; 
    //     tableelement3.innerHTML = responseTextJson[i].fnut + " Uhr"; 
    //     tableelement4.innerHTML = responseTextJson[i].lnut + " Uhr"; 
    //     tableelement5.innerHTML = responseTextJson[i].max + " Min";
    //     tableelement6.innerHTML = responseTextJson[i].pnd + " €"; 
    //     tableelement7.innerHTML = responseTextJson[i].ppmin + " €";
    //     tableelement8.innerHTML = "näher ansehen";
    //     tablerow.appendChild(tableelement1);
    //     tablerow.appendChild(tableelement2);
    //     tablerow.appendChild(tableelement3);
    //     tablerow.appendChild(tableelement4);
    //     tablerow.appendChild(tableelement5);
    //     tablerow.appendChild(tableelement6);
    //     tablerow.appendChild(tableelement7);
    //     tablerow.appendChild(tableelement8);
    //     tabl.appendChild(tablerow);
}
//# sourceMappingURL=statstic.js.map