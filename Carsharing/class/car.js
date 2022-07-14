import { checkformdata } from "../function/formdata.js";
export class Car {
    id;
    name;
    electronic;
    conventionell;
    fnut;
    lnut;
    max;
    pnd;
    ppmin;
    constructor(_id, _name, _electronic, _conventionell, _fnut, _lnut, _max, _pnd, _ppmin) {
        this.id = _id;
        this.name = _name;
        this.electronic = _electronic;
        this.conventionell = _conventionell;
        this.fnut = _fnut;
        this.lnut = _lnut;
        this.max = _max;
        this.pnd = _pnd;
        this.ppmin = _ppmin;
    }
    static async showCarData() {
        document.getElementById("showData").innerHTML = "";
        document.getElementById("filteroptions").innerHTML = "";
        let filter = localStorage.getItem("filter");
        if (filter == "a" || filter == null) {
            localStorage.removeItem("bookoption");
            let filterurl = "https://softwaredesign.herokuapp.com/index.html?filter=a";
            localStorage.setItem("url", filterurl);
        }
        else if (filter == "b") {
            localStorage.removeItem("bookoption");
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
            filtersubmitButton.addEventListener("click", async function () { Car.filterCarPower(event); });
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
            filtersubmitButton.addEventListener("click", async function () { Car.filterCarTime(event); });
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
            window.alert(responseText);
        }
        else {
            let responseTextJson = JSON.parse(responseText);
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
                tableelement8.addEventListener("click", async function () { Car.bookOneCar(event); });
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
        amountButton.addEventListener("click", async function () { Car.carAmount(event); });
        let filterButton = document.getElementById("filterbutton");
        filterButton.addEventListener("click", async function () { Car.carFilter(event); });
    }
    static async carAmount(_event) {
        console.log("amount click");
        let amountForm = document.getElementById("amountForm");
        let formData = new FormData(amountForm);
        let query = new URLSearchParams(formData);
        localStorage.setItem("amount", (query.toString()).substring(9));
        Car.showCarData();
    }
    static async carFilter(_event) {
        console.log("filter click");
        let filterForm = document.getElementById("filterForm");
        let formData = new FormData(filterForm);
        let query = new URLSearchParams(formData);
        console.log("Query", query.toString());
        console.log((query.toString()).substring(7));
        //localStorage.removeItem("filter");
        localStorage.setItem("filter", (query.toString()).substring(7));
        localStorage.setItem("bookoption", "a");
        Car.showCarData();
    }
    static async filterCarTime(_event) {
        console.log("filtersubmit click");
        let optionForm = document.getElementById("optionForm");
        let formData = new FormData(optionForm);
        let query = new URLSearchParams(formData);
        let timeurl = "https://softwaredesign.herokuapp.com/index.html?filter=c";
        localStorage.setItem("url", timeurl);
        timeurl = timeurl + "&" + query.toString();
        localStorage.setItem("bookoption", "b");
        localStorage.setItem("query", query.toString());
        localStorage.setItem("url", timeurl);
    }
    static async filterCarPower(_event) {
        console.log("filtersubmit click");
        let optionForm = document.getElementById("optionForm");
        let formData = new FormData(optionForm);
        let query = new URLSearchParams(formData);
        let filterurl = "https://softwaredesign.herokuapp.com/index.html?filter=b";
        filterurl = filterurl + "&" + query.toString();
        localStorage.setItem("url", filterurl);
    }
    static async bookOneCar(_event) {
        console.log("click");
        let dataId = _event.target.id;
        localStorage.setItem("dataId", dataId);
        window.location.replace("bookcar.html");
    }
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    static async showData() {
        document.getElementById("showCar").innerHTML = "";
        document.getElementById("book").innerHTML = "";
        let url = "https://softwaredesign.herokuapp.com/bookcars.html";
        let dataId = localStorage.getItem("dataId");
        url = url + "?" + "&dataID=" + dataId;
        let response = await fetch(url);
        let responseText = await response.text();
        let responseTextJson = JSON.parse(responseText);
        let filter = localStorage.getItem("bookoption");
        if (filter == "b") {
            let param = localStorage.getItem("query");
            let parts = param.split("&");
            console.log(parts);
            let date = parts[0].substring(5);
            let start = (parts[1].substring(5)).replace("%3A", ":");
            let starttime = parseInt((parts[1].substring(5)).replace("%3A", ""));
            let duration = parseInt(parts[2].substring(9));
            let end = Math.floor(duration / 60) * 100 + duration % 60 + starttime;
            let endtime = end.toString();
            if (endtime.length == 3) {
                endtime = "0" + endtime.slice(0, 1) + ":" + endtime.slice(1);
            }
            else {
                endtime = endtime.slice(0, 2) + ":" + endtime.slice(2);
            }
            let price = parseInt(responseTextJson.pnd) + duration * parseFloat(responseTextJson.ppmin);
            localStorage.setItem("price", price.toString());
            let tabledescription = ["Auto Bezeichnung", "Antriebsart", "Tag", "Startzeit", "Endzeit", "gewünschte Nutzdauer", "pauschale Nutzungspreis", "Preis pro Minute", "Preis insgesamt", "Buchen"];
            let tabl = document.createElement("table");
            document.getElementById("showCar").appendChild(tabl);
            for (let i = 0; i <= 9; i++) {
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
            let tableelement9 = document.createElement("td");
            let bookbutton = document.createElement("button");
            bookbutton.addEventListener("click", async function () { Car.bookCar(event); });
            bookbutton.innerHTML = "jetzt Buchen";
            document.getElementById("book").appendChild(bookbutton);
            let betriebsart = "";
            if (responseTextJson.electronic == true && responseTextJson.conventionell == false) {
                betriebsart = "E-Auto";
            }
            else if (responseTextJson.conventionell == true && responseTextJson.electronic == false) {
                betriebsart = "Konventionell";
            }
            else {
                betriebsart = "Hybrid";
            }
            tableelement1.innerHTML = responseTextJson.name;
            tableelement2.innerHTML = betriebsart;
            tableelement3.innerHTML = date;
            tableelement4.innerHTML = start + " Uhr";
            tableelement5.innerHTML = endtime + " Uhr";
            tableelement6.innerHTML = duration + " Min";
            tableelement7.innerHTML = responseTextJson.pnd + " €";
            tableelement8.innerHTML = responseTextJson.ppmin + " €";
            tableelement9.innerHTML = price + " €";
            tablerow.appendChild(tableelement1);
            tablerow.appendChild(tableelement2);
            tablerow.appendChild(tableelement3);
            tablerow.appendChild(tableelement4);
            tablerow.appendChild(tableelement5);
            tablerow.appendChild(tableelement6);
            tablerow.appendChild(tableelement7);
            tablerow.appendChild(tableelement8);
            tablerow.appendChild(tableelement9);
            tablerow.appendChild(bookbutton);
            tabl.appendChild(tablerow);
        }
        else {
            let tabledescription = ["Auto Bezeichnung", "Antriebsart", "frühste Nutzungsuhrzeit", "späteste Nutzungsuhrzeit", "maximale Nutzungdauer", "pauschale Nutzungspreis", "Preis pro Minute"];
            let tabl = document.createElement("table");
            document.getElementById("showCar").appendChild(tabl);
            for (let i = 0; i <= 6; i++) {
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
            let betriebsart = "";
            if (responseTextJson.electronic == true && responseTextJson.conventionell == false) {
                betriebsart = "E-Auto";
            }
            else if (responseTextJson.conventionell == true && responseTextJson.electronic == false) {
                betriebsart = "Konventionell";
            }
            else {
                betriebsart = "Hybrid";
            }
            tableelement1.innerHTML = responseTextJson.name;
            tableelement2.innerHTML = betriebsart;
            tableelement3.innerHTML = responseTextJson.fnut + " Uhr";
            tableelement4.innerHTML = responseTextJson.lnut + " Uhr";
            tableelement5.innerHTML = responseTextJson.max + " Min";
            tableelement6.innerHTML = responseTextJson.pnd + " €";
            tableelement7.innerHTML = responseTextJson.ppmin + " €";
            tablerow.appendChild(tableelement1);
            tablerow.appendChild(tableelement2);
            tablerow.appendChild(tableelement3);
            tablerow.appendChild(tableelement4);
            tablerow.appendChild(tableelement5);
            tablerow.appendChild(tableelement6);
            tablerow.appendChild(tableelement7);
            tabl.appendChild(tablerow);
            let timefilterformelement = document.createElement("form");
            timefilterformelement.onsubmit = function () {
                return false;
            };
            timefilterformelement.id = "time";
            document.getElementById("book").appendChild(timefilterformelement);
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
            let timeButton = document.createElement("button");
            timeButton.addEventListener("click", async function () { Car.bookCarTime(event); });
            timeButton.innerHTML = "näher ansehen";
            timefilterformelement.appendChild(filterlabel);
            filterlabel.appendChild(filterdate);
            timefilterformelement.appendChild(filterlabel1);
            filterlabel1.appendChild(filtertime);
            timefilterformelement.appendChild(filterlabel2);
            filterlabel2.appendChild(filterduration);
            timefilterformelement.appendChild(timeButton);
        }
    }
    static async bookCarTime(_event) {
        let user = localStorage.getItem("user");
        console.log("user", localStorage.getItem("user"));
        if (user == null) {
            console.log("user not logged in");
            localStorage.setItem("lastmove", "bookcar.html");
            window.location.replace("login.html");
        }
        else {
            console.log("click");
            let timeForm = document.getElementById("time");
            let formData = new FormData(timeForm);
            let query = new URLSearchParams(formData);
            let check = checkformdata(formData, 3);
            if (check == true) {
                localStorage.setItem("query", query.toString());
                localStorage.setItem("bookoption", "b");
                Car.showData();
            }
            else {
                window.alert("Bitte füllen Sie alle Felder aus");
            }
        }
    }
    static async bookCar(_event) {
        console.log("book that car");
        let user = localStorage.getItem("user");
        let query = localStorage.getItem("query");
        let carid = localStorage.getItem("dataId");
        let price = localStorage.getItem("price");
        if (user == null) {
            console.log("user not logged in");
            localStorage.setItem("lastmove", "bookcar.html");
            window.location.replace("login.html");
        }
        else {
            let timeurl = "https://softwaredesign.herokuapp.com/booktime.html";
            timeurl = timeurl + "?" + query + "&" + user + "&carid=" + carid + "&price=" + price;
            let response = await fetch(timeurl);
            let responseText = await response.text();
            window.alert(responseText);
        }
    }
}
//# sourceMappingURL=car.js.map