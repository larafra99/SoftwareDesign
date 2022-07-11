"use strict";
var Carsharing;
(function (Carsharing) {
    //localStorage.removeItem("filter");
    showData();
    async function showData() {
        document.getElementById("showData").innerHTML = "";
        document.getElementById("filteroptions").innerHTML = "";
        let filter = localStorage.getItem("filter");
        if (filter == "a" || filter == null) {
            let filterurl = "https://softwaredesign.herokuapp.com/index.html?filter=a";
            localStorage.setItem("url", filterurl);
        }
        else if (filter == "b") {
            console.log("Filter antriebsart");
            let filterformelement = document.createElement("form");
            filterformelement.id = "optionForm";
            document.getElementById("filteroptions").appendChild(filterformelement);
            let filterinformelement = document.createElement("p");
            filterinformelement.innerHTML = "falls ein Hybrid Auto gewünscht ist, klicken sie beide Boxen";
            document.getElementById("filteroptions").appendChild(filterinformelement);
            let filterelement = document.createElement("input");
            filterelement.type = "checkbox";
            filterelement.name = "conventionell";
            let filterelement2 = document.createElement("label");
            filterelement2.innerHTML = "Konventionell";
            let filterelement3 = document.createElement("input");
            filterelement3.type = "checkbox";
            filterelement3.name = "electro";
            let filterelement4 = document.createElement("label");
            filterelement4.innerHTML = "Elektro";
            let filtersubmitButton = document.createElement("button");
            filtersubmitButton.addEventListener("click", filtersubmitbutton);
            filtersubmitButton.innerHTML = "submit";
            filterformelement.appendChild(filterelement);
            filterformelement.appendChild(filterelement2);
            filterformelement.appendChild(filterelement3);
            filterformelement.appendChild(filterelement4);
            filterformelement.appendChild(filtersubmitButton);
        }
        else {
            let filterformelement = document.createElement("form");
            filterformelement.id = "optionForm";
            document.getElementById("filteroptions").appendChild(filterformelement);
            let filterdate = document.createElement("input");
            filterdate.type = "date";
            filterdate.name = "date";
            let filtertime = document.createElement("input");
            filtertime.type = "time";
            filtertime.name = "time";
            let filterduration = document.createElement("input");
            filterduration.type = "number";
            filterduration.min = "30";
            filterduration.step = "15";
            filterduration.name = "duration";
            let filterlabel = document.createElement("label");
            filterlabel.innerHTML = "Zeit Buchen";
            let filterlabel1 = document.createElement("label");
            filterlabel1.innerHTML = "von";
            let filterlabel2 = document.createElement("label");
            filterlabel2.innerHTML = "Dauer in Minuten";
            let filtersubmitButton = document.createElement("button");
            filtersubmitButton.addEventListener("click", filtertimebutton);
            filtersubmitButton.innerHTML = "submit";
            filterformelement.appendChild(filterlabel);
            filterlabel.appendChild(filterdate);
            filterformelement.appendChild(filterlabel1);
            filterlabel1.appendChild(filtertime);
            filterformelement.appendChild(filterlabel2);
            filterlabel2.appendChild(filterduration);
            filterformelement.appendChild(filtersubmitButton);
        }
        let url = localStorage.getItem("url");
        let response = await fetch(url);
        let responseText = await response.text();
        //console.log("Respons",responseText);
        if (responseText == "Bitte füllen sie mindestens eine Box") {
            console.log("no answer");
            let answer = document.createElement("p");
            document.getElementById("showData").appendChild(answer);
            answer.innerHTML = responseText;
        }
        else {
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
        //localStorage.removeItem("filter");
        localStorage.setItem("filter", (query.toString()).substring(7));
        localStorage.setItem("bookoption", "a");
        showData();
    }
    async function filtertimebutton(_event) {
        console.log("filtersubmit click");
        let optionForm = document.getElementById("optionForm");
        let formData = new FormData(optionForm);
        let query = new URLSearchParams(formData);
        console.log("Query", query.toString());
        let timeurl = "https://softwaredesign.herokuapp.com/index.html?filter=c";
        localStorage.setItem("url", timeurl);
        timeurl = timeurl + "&" + query.toString();
        console.log("Query", query.toString());
        localStorage.setItem("url", timeurl);
    }
    async function filtersubmitbutton(_event) {
        console.log("filtersubmit click");
        let optionForm = document.getElementById("optionForm");
        let formData = new FormData(optionForm);
        let query = new URLSearchParams(formData);
        let filterurl = "https://softwaredesign.herokuapp.com/index.html?filter=b";
        filterurl = filterurl + "&" + query.toString();
        console.log("Query", query.toString());
        localStorage.setItem("bookoption", "b");
        localStorage.setItem("url", filterurl);
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