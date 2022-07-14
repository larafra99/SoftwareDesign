import { checkFormData } from "../function/formdata.js";
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
    // show car selection
    static async showCarData() {
        document.getElementById("showData").innerHTML = "";
        document.getElementById("filteroptions").innerHTML = "";
        let filter = localStorage.getItem("filter");
        // show all cars
        if (filter == "a" || filter == null) {
            localStorage.removeItem("bookoption");
            let filterurl = "https://softwaredesign.herokuapp.com/index.html?filter=a";
            localStorage.setItem("url", filterurl);
        }
        // filter option car power variante
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
        // filter option time window
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
            let filtersubmitbutton = document.createElement("button");
            filtersubmitbutton.addEventListener("click", async function () { Car.filterCarTime(event); });
            filtersubmitbutton.innerHTML = "submit";
            filterformelement.appendChild(filterlabel);
            filterlabel.appendChild(filterdate);
            filterformelement.appendChild(filterlabel1);
            filterlabel1.appendChild(filtertime);
            filterformelement.appendChild(filterlabel2);
            filterlabel2.appendChild(filterduration);
            filterformelement.appendChild(filtersubmitbutton);
        }
        let url = localStorage.getItem("url");
        let response = await fetch(url);
        let responsetext = await response.text();
        // input missing to filter correctly
        if (responsetext == "Bitte füllen sie mindestens eine Box") {
            window.alert(responsetext);
        }
        else {
            // create table with filtered/non filtered Cars
            let responsetextjson = JSON.parse(responsetext);
            let tabledescription = ["Auto Bezeichnung", "Antriebsart", "frühste Nutzungsuhrzeit", "späteste Nutzungsuhrzeit", "maximale Nutzungdauer", "pauschale Nutzungspreis", "Preis pro Minute", "Buchen"];
            // create table header
            let tabl = document.createElement("table");
            document.getElementById("showData").appendChild(tabl);
            for (let i = 0; i <= 7; i++) {
                let tableheader = document.createElement("th");
                tableheader.innerHTML = tabledescription[i];
                tabl.appendChild(tableheader);
            }
            // get filter for car amount
            let caramount = localStorage.getItem("amount");
            let amount;
            if (caramount == null) {
                amount = 10;
            }
            else {
                amount = parseInt(caramount);
            }
            if (Object.keys(responsetextjson).length < amount || caramount == "all") {
                amount = Object.keys(responsetextjson).length;
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
                //button to get more info on one car
                tableelement8.addEventListener("click", async function () { Car.bookOneCar(event); });
                tableelement8.id = responsetextjson[i].id;
                let betriebsart = "";
                if (responsetextjson[i].electronic == true && responsetextjson[i].conventionell == false) {
                    betriebsart = "E-Auto";
                }
                else if (responsetextjson[i].conventionell == true && responsetextjson[i].electronic == false) {
                    betriebsart = "Konventionell";
                }
                else {
                    betriebsart = "Hybrid";
                }
                tableelement1.innerHTML = responsetextjson[i].name;
                tableelement2.innerHTML = betriebsart;
                tableelement3.innerHTML = responsetextjson[i].fnut + " Uhr";
                tableelement4.innerHTML = responsetextjson[i].lnut + " Uhr";
                tableelement5.innerHTML = responsetextjson[i].max + " Min";
                tableelement6.innerHTML = responsetextjson[i].pnd + " €";
                tableelement7.innerHTML = responsetextjson[i].ppmin + " €";
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
        // button to filter car amount
        let amountbutton = document.getElementById("submit");
        amountbutton.addEventListener("click", async function () { Car.carAmount(event); });
        // button for filter options 
        let filterbutton = document.getElementById("filterbutton");
        filterbutton.addEventListener("click", async function () { Car.carFilter(event); });
    }
    //sets car amount
    static async carAmount(_event) {
        console.log("amount click");
        let amountform = document.getElementById("amountForm");
        let formdata = new FormData(amountform);
        let query = new URLSearchParams(formdata);
        localStorage.setItem("amount", (query.toString()).substring(9));
        Car.showCarData();
    }
    // sets car filter
    static async carFilter(_event) {
        console.log("filter click");
        let filterform = document.getElementById("filterForm");
        let formdata = new FormData(filterform);
        let query = new URLSearchParams(formdata);
        localStorage.setItem("filter", (query.toString()).substring(7));
        localStorage.setItem("bookoption", "a");
        Car.showCarData();
    }
    // get Cars that are avaiable at wished time from server
    static async filterCarTime(_event) {
        let optionform = document.getElementById("optionForm");
        let formdata = new FormData(optionform);
        let query = new URLSearchParams(formdata);
        let timeurl = "https://softwaredesign.herokuapp.com/index.html?filter=c";
        localStorage.setItem("url", timeurl);
        timeurl = timeurl + "&" + query.toString();
        localStorage.setItem("bookoption", "b");
        localStorage.setItem("query", query.toString());
        localStorage.setItem("url", timeurl);
    }
    // get Cars that are with the wished engine from server
    static async filterCarPower(_event) {
        console.log("filtersubmit click");
        let optionform = document.getElementById("optionForm");
        let formdata = new FormData(optionform);
        let query = new URLSearchParams(formdata);
        let filterurl = "https://softwaredesign.herokuapp.com/index.html?filter=b";
        filterurl = filterurl + "&" + query.toString();
        localStorage.setItem("url", filterurl);
    }
    // get to the page to book one car   
    static async bookOneCar(_event) {
        console.log("click");
        let dataId = _event.target.id;
        localStorage.setItem("dataId", dataId);
        window.location.replace("bookcar.html");
    }
    // show Data for choosen car
    static async showData() {
        document.getElementById("showCar").innerHTML = "";
        document.getElementById("book").innerHTML = "";
        let url = "https://softwaredesign.herokuapp.com/bookcars.html";
        let dataId = localStorage.getItem("dataId");
        url = url + "?" + "&dataID=" + dataId;
        //fetch data from server
        let response = await fetch(url);
        let responsetext = await response.text();
        let responsetextjson = JSON.parse(responsetext);
        // time is choosen before
        let filter = localStorage.getItem("bookoption");
        if (filter == "b") {
            let param = localStorage.getItem("query");
            let parts = param.split("&");
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
            let price = parseInt(responsetextjson.pnd) + duration * parseFloat(responsetextjson.ppmin);
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
            if (responsetextjson.electronic == true && responsetextjson.conventionell == false) {
                betriebsart = "E-Auto";
            }
            else if (responsetextjson.conventionell == true && responsetextjson.electronic == false) {
                betriebsart = "Konventionell";
            }
            else {
                betriebsart = "Hybrid";
            }
            tableelement1.innerHTML = responsetextjson.name;
            tableelement2.innerHTML = betriebsart;
            tableelement3.innerHTML = date;
            tableelement4.innerHTML = start + " Uhr";
            tableelement5.innerHTML = endtime + " Uhr";
            tableelement6.innerHTML = duration + " Min";
            tableelement7.innerHTML = responsetextjson.pnd + " €";
            tableelement8.innerHTML = responsetextjson.ppmin + " €";
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
        // time is not choosen beforehand
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
            if (responsetextjson.electronic == true && responsetextjson.conventionell == false) {
                betriebsart = "E-Auto";
            }
            else if (responsetextjson.conventionell == true && responsetextjson.electronic == false) {
                betriebsart = "Konventionell";
            }
            else {
                betriebsart = "Hybrid";
            }
            tableelement1.innerHTML = responsetextjson.name;
            tableelement2.innerHTML = betriebsart;
            tableelement3.innerHTML = responsetextjson.fnut + " Uhr";
            tableelement4.innerHTML = responsetextjson.lnut + " Uhr";
            tableelement5.innerHTML = responsetextjson.max + " Min";
            tableelement6.innerHTML = responsetextjson.pnd + " €";
            tableelement7.innerHTML = responsetextjson.ppmin + " €";
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
            let timebutton = document.createElement("button");
            timebutton.addEventListener("click", async function () { Car.bookCarTime(event); });
            timebutton.innerHTML = "näher ansehen";
            timefilterformelement.appendChild(filterlabel);
            filterlabel.appendChild(filterdate);
            timefilterformelement.appendChild(filterlabel1);
            filterlabel1.appendChild(filtertime);
            timefilterformelement.appendChild(filterlabel2);
            filterlabel2.appendChild(filterduration);
            timefilterformelement.appendChild(timebutton);
        }
    }
    // check if Car is available with server
    static async bookCarTime(_event) {
        let user = localStorage.getItem("user");
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
            let check = checkFormData(formData, 3);
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
    // book that car
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