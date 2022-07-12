import{Car}from "./interfaces/interface.js";
import {navibar} from "./function/flexnavi.js";
localStorage.setItem("lastmove","bookcar.html");
navibar();
showData();

async function showData(): Promise<void> {
    let url: string = "https://softwaredesign.herokuapp.com/bookcars.html";
    let dataId: string =localStorage.getItem("dataId");
    url = url + "?" + "&dataID=" + dataId;
    let response: Response = await fetch(url);
    let responseText: string = await response.text();
    let responseTextJson: Car = JSON.parse(responseText);

    let filter: string = localStorage.getItem("bookoption");
    if(filter =="b"){
        let param:string = localStorage.getItem("query");
        let parts:string[] = param.split("&");
        console.log(parts);
        let date:string = parts[0].substring(5);
        let start:string = (parts[1].substring(5)).replace("%3A",":");
        let starttime:number= parseInt((parts[1].substring(5)).replace("%3A",""));
        let duration: number = parseInt(parts[2].substring(9));
        let end: number =Math.floor(duration /60)*100 + duration%60 + starttime;
        let endtime: string =end.toString();
        if (endtime.length==3){
            endtime = "0"+endtime.slice(0,1)+":"+endtime.slice(1);
        }
        else{
            endtime = endtime.slice(0,2)+":"+endtime.slice(2);
        }

        let price: number = parseInt(responseTextJson.pnd)+ duration*parseFloat(responseTextJson.ppmin);
        let tabledescription: string[]= ["Auto Bezeichnung","Antriebsart","Tag","Startzeit","Endzeit","gewünschte Nutzdauer","pauschale Nutzungspreis","Preis pro Minute","Preis insgesamt","Buchen"]
        let tabl: HTMLElement = document.createElement("table");
        document.getElementById("showCar").appendChild(tabl);
        for ( let i: number = 0; i <= 9; i++) {
            let tableheader: HTMLElement = document.createElement("th");
            tableheader.innerHTML = tabledescription[i];
            tabl.appendChild(tableheader);
        }
            
        let tablerow: HTMLElement = document.createElement("tr");
        let tableelement1: HTMLElement = document.createElement("td");
        let tableelement2: HTMLElement = document.createElement("td");
        let tableelement3: HTMLElement = document.createElement("td");
        let tableelement4: HTMLElement = document.createElement("td");
        let tableelement5: HTMLElement = document.createElement("td");
        let tableelement6: HTMLElement = document.createElement("td");
        let tableelement7: HTMLElement = document.createElement("td");
        let tableelement8: HTMLElement = document.createElement("td");
        let tableelement9: HTMLElement = document.createElement("td");
        let bookbutton:HTMLButtonElement = document.createElement("button");
        bookbutton.addEventListener("click", bookcar);
        bookbutton.innerHTML="jetzt Buchen";
        document.getElementById("book").appendChild(bookbutton);
        
        let betriebsart: string ="";
        if(responseTextJson.electronic == true && responseTextJson.conventionell == false){
            betriebsart = "E-Auto";
        }
        else if(responseTextJson.conventionell == true && responseTextJson.electronic == false){
            betriebsart = "Konventionell";
        }
        else{
            betriebsart = "Hybrid";
        }

        tableelement1.innerHTML = responseTextJson.name; 
        tableelement2.innerHTML = betriebsart; 
        tableelement3.innerHTML = date;
        tableelement4.innerHTML = start+ " Uhr"; 
        tableelement5.innerHTML = endtime+ " Uhr"; 
        tableelement6.innerHTML = duration+ " Min";
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

    else{
        let tabledescription: string[]= ["Auto Bezeichnung","Antriebsart","frühste Nutzungsuhrzeit","späteste Nutzungsuhrzeit","maximale Nutzungdauer","pauschale Nutzungspreis","Preis pro Minute"]
    
        let tabl: HTMLElement = document.createElement("table");
        document.getElementById("showCar").appendChild(tabl);
        for ( let i: number = 0; i <= 6; i++) {
            let tableheader: HTMLElement = document.createElement("th");
            tableheader.innerHTML = tabledescription[i];
            tabl.appendChild(tableheader);
        }
            
        let tablerow: HTMLElement = document.createElement("tr");
        let tableelement1: HTMLElement = document.createElement("td");
        let tableelement2: HTMLElement = document.createElement("td");
        let tableelement3: HTMLElement = document.createElement("td");
        let tableelement4: HTMLElement = document.createElement("td");
        let tableelement5: HTMLElement = document.createElement("td");
        let tableelement6: HTMLElement = document.createElement("td");
        let tableelement7: HTMLElement = document.createElement("td");
        
        let betriebsart: string ="";
        if(responseTextJson.electronic == true && responseTextJson.conventionell == false){
            betriebsart = "E-Auto";
        }
        else if(responseTextJson.conventionell == true && responseTextJson.electronic == false){
            betriebsart = "Konventionell";
        }
        else{
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

        let timefilterformelement:HTMLElement = document.createElement("form");
        timefilterformelement.id = "time";
        document.getElementById("book").appendChild(timefilterformelement);
        let filterdate: HTMLInputElement = document.createElement("input");
        filterdate.type = "date";
        filterdate.name = "date";
        let filtertime: HTMLInputElement = document.createElement("input");
        filtertime.type = "time";
        filtertime.name = "time";
        let filterduration: HTMLInputElement = document.createElement("input");
        filterduration.type = "number";
        filterduration.min = "30";
        filterduration.step = "15";
        filterduration.name = "duration";
        let filterlabel: HTMLElement = document.createElement("label");
        filterlabel.innerHTML="Zeit Buchen";
        let filterlabel1: HTMLElement = document.createElement("label");
        filterlabel1.innerHTML="von";
        let filterlabel2: HTMLElement = document.createElement("label");
        filterlabel2.innerHTML="Dauer in Minuten";
        let timeButton: HTMLButtonElement = document.createElement("button");
        timeButton.addEventListener("click", booktime);
        timeButton.innerHTML="jetzt Buchen";
        timefilterformelement.appendChild(filterlabel);
        filterlabel.appendChild(filterdate);
        timefilterformelement.appendChild(filterlabel1);
        filterlabel1.appendChild(filtertime);
        timefilterformelement.appendChild(filterlabel2);
        filterlabel2.appendChild(filterduration);
        timefilterformelement.appendChild(timeButton);
    }        
} 

async function booktime(_event: Event): Promise<void> {
    let user: string =localStorage.getItem("user");
    let carid:string = localStorage.getItem("dataId");
    if (user == null){
        console.log("user not logged in");
        localStorage.setItem("lastmove","bookcar.html");
        window.location.replace("login.html");
    }
    else{
        console.log("click");
        let timeForm: HTMLFormElement = <HTMLFormElement>document.getElementById("time");
        let formData: FormData = new FormData(timeForm);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        console.log(query.toString());
        let timeurl: string = "https://softwaredesign.herokuapp.com/checktime.html";

        timeurl = timeurl + "?" + query.toString()+"&"+user+"&"+"carid="+carid;
        console.log("Zeit checken",timeurl);
        let response: Response = await fetch(timeurl);
        let responseText: string = await response.text();
        console.log(response);
        console.log(responseText);
        document.getElementById("response").innerHTML="";
        let booktext: HTMLElement = document.createElement("p");
        document.getElementById("response").appendChild(booktext);
        booktext.innerHTML = responseText;  
    }

}
async function bookcar(_event: Event): Promise<void> {
    
    let user: string =localStorage.getItem("user");
    let query: string =localStorage.getItem("query");
    let carid:string = localStorage.getItem("dataId");
    if (user == null){
        console.log("user not logged in");
        localStorage.setItem("lastmove","bookcar.html");
        window.location.replace("login.html");
    }
    else{
        let timeurl: string = "https://softwaredesign.herokuapp.com/booktime.html";
        timeurl = timeurl + "?" + query+"&"+user+"&"+"carid="+carid;
        console.log(timeurl);
        let response: Response = await fetch(timeurl);
        let responseText: string = await response.text();
        console.log(response);
        console.log(responseText);
        document.getElementById("response").innerHTML="";
        let booktext: HTMLElement = document.createElement("p");
        document.getElementById("response").appendChild(booktext);
        booktext.innerHTML = responseText; 
    }
    
}
