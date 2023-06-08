import {CarData} from "../interfaces/interface";
import{HelpFunktions} from "./function.js"

export class Car {
    id: string;
    name: string;
    electronic: boolean;
    conventionell: boolean;
    fnut: string;
    lnut: string;
    max: string;
    pnd: string;
    ppmin: string;

    constructor(_id:string,_name:string,_electronic:boolean,_conventionell:boolean,_fnut:string,_lnut:string,_max:string,_pnd:string,_ppmin:string){
        this.id = _id;
        this.name= _name;
        this.electronic= _electronic;
        this.conventionell= _conventionell;
        this.fnut= _fnut;
        this.lnut= _lnut;
        this.max= _max;
        this.pnd= _pnd;
        this.ppmin= _ppmin;
    }
    // show car selection
    static async showCarData(): Promise<void> {
        document.getElementById("showData").innerHTML="";
        document.getElementById("filteroptions").innerHTML="";
        let filter: string = localStorage.getItem("filter");
        // show all cars
        if(filter =="a" || filter== null){
            localStorage.removeItem("bookoption");
            let filterurl: string = "https://carserver-nw7d.onrender.com/index.html?filter=a";
            localStorage.setItem("url",filterurl);   
        }
        // filter option car power variante
        else if (filter =="b"){
            localStorage.removeItem("bookoption");
            console.log("Filter antriebsart"); 
            let filterformelement:HTMLElement = document.createElement("form");
            filterformelement.id = "optionForm";
            document.getElementById("filteroptions").appendChild(filterformelement);
            let filterinformelement:HTMLElement = document.createElement("p");
            filterinformelement.innerHTML = "falls ein Hybrid Auto gewünscht ist, klicken sie beide Boxen";
            document.getElementById("filteroptions").appendChild(filterinformelement);
            let filterelement: HTMLInputElement = document.createElement("input");
            filterelement.type = "checkbox";
            filterelement.name = "conventionell";
            let filterelement2: HTMLElement = document.createElement("label");
            filterelement2.innerHTML="Konventionell";
            let filterelement3: HTMLInputElement = document.createElement("input");
            filterelement3.type = "checkbox";
            filterelement3.name = "electro";
            let filterelement4: HTMLElement = document.createElement("label");
            filterelement4.innerHTML="Elektro";
            let filtersubmitButton: HTMLElement = document.createElement("button");
            filtersubmitButton.addEventListener("click", async function (): Promise<void> {Car.filterCarPower(event)}); 
            filtersubmitButton.innerHTML="submit";
            filterformelement.appendChild(filterelement);
            filterformelement.appendChild(filterelement2);
            filterformelement.appendChild(filterelement3);
            filterformelement.appendChild(filterelement4);
            filterformelement.appendChild(filtersubmitButton);    
        }
        // filter option time window
        else{
            let filterformelement:HTMLElement = document.createElement("form");
            filterformelement.id = "optionForm";
            document.getElementById("filteroptions").appendChild(filterformelement);
    
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
    
            let filtersubmitbutton: HTMLElement = document.createElement("button");
            filtersubmitbutton.addEventListener("click", async function (): Promise<void> {Car.filterCarTime(event)}); 
            filtersubmitbutton.innerHTML="submit";
            
            filterformelement.appendChild(filterlabel);
            filterlabel.appendChild(filterdate);
            filterformelement.appendChild(filterlabel1);
            filterlabel1.appendChild(filtertime);
            filterformelement.appendChild(filterlabel2);
            filterlabel2.appendChild(filterduration);
            filterformelement.appendChild(filtersubmitbutton);
        }
    
        let url:string = localStorage.getItem("url");
        let response: Response = await fetch(url);
        let responsetext: string = await response.text();
        // input missing to filter correctly
        if (responsetext =="Bitte füllen sie mindestens eine Box"){
            window.alert(responsetext);
        }
        else{
            // create table with filtered/non filtered Cars
            document.getElementById("showData").innerHTML="";
            let responsetextjson: CarData[] = JSON.parse(responsetext);
            let tabledescription: string[]= ["Auto Bezeichnung","Antriebsart","frühste Nutzungsuhrzeit","späteste Nutzungsuhrzeit","maximale Nutzungdauer","pauschale Nutzungspreis","Preis pro Minute","Buchen"]
            // create table header
            let tabl: HTMLElement = document.createElement("table");
            document.getElementById("showData").appendChild(tabl);
            for ( let i: number = 0; i <= 7; i++) {
                let tableheader: HTMLElement = document.createElement("th");
                tableheader.innerHTML = tabledescription[i];
                tabl.appendChild(tableheader);
            }
            // get filter for car amount
            let caramount: string = localStorage.getItem("amount");
            let amount: number;
        
            if(caramount==null){
                amount= 10;
            }
            else{
                amount = parseInt(caramount);
            }
            
            if (Object.keys(responsetextjson).length< amount||caramount=="all"){
                amount=Object.keys(responsetextjson).length
            }
            if(Object.keys(responsetextjson).length==0){
                window.alert("Leider keine Autos mit ihren Angaben zur Verfügung");

            }
            else{
                for ( let i: number = 0; i < amount; i++) {
    
                    let tablerow: HTMLElement = document.createElement("tr");
                    let tableelement1: HTMLElement = document.createElement("td");
                    let tableelement2: HTMLElement = document.createElement("td");
                    let tableelement3: HTMLElement = document.createElement("td");
                    let tableelement4: HTMLElement = document.createElement("td");
                    let tableelement5: HTMLElement = document.createElement("td");
                    let tableelement6: HTMLElement = document.createElement("td");
                    let tableelement7: HTMLElement = document.createElement("td");
                    let tableelement8: HTMLElement = document.createElement("button");
                    //button to get more info on one car
                    tableelement8.addEventListener("click", async function (): Promise<void> {Car.bookOneCar(event)});
                    tableelement8.id = responsetextjson[i].id;
                    let betriebsart: string ="";
                    if(responsetextjson[i].electronic == true && responsetextjson[i].conventionell == false){
                        betriebsart = "E-Auto";
                    }
                    else if(responsetextjson[i].conventionell == true && responsetextjson[i].electronic == false){
                        betriebsart = "Konventionell";
                    }
                    else{
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
    
            
        }
        // button to filter car amount
        let amountbutton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
        amountbutton.addEventListener("click", async function (): Promise<void> {Car.carAmount(event)});  
        // button for filter options 
        let filterbutton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("filterbutton");
        filterbutton.addEventListener("click", async function (): Promise<void> {Car.carFilter(event)});      
    }
    //sets car amount
    static async carAmount(_event:Event):Promise<void> {
        console.log("amount click");
        
        let amountform: HTMLFormElement = <HTMLFormElement>document.getElementById("amountForm");
        let formdata: FormData = new FormData(amountform);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formdata);
        localStorage.setItem("amount",(query.toString()).substring(9));
        Car.showCarData();    
    }
    // sets car filter
    static async carFilter(_event:Event):Promise<void>{
        document.getElementById("showData").innerHTML="";
        console.log("filter click");
        let filterform: HTMLFormElement = <HTMLFormElement>document.getElementById("filterForm");
        let formdata: FormData = new FormData(filterform);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formdata);
        localStorage.setItem("filter",(query.toString()).substring(7));
        localStorage.setItem("bookoption","a");
        Car.showCarData();   
    }
    // get Cars that are avaiable at wished time from server
    static async filterCarTime(_event:Event): Promise<void>{
        document.getElementById("showData").innerHTML="";
        let optionform: HTMLFormElement = <HTMLFormElement>document.getElementById("optionForm");
        let formdata: FormData = new FormData(optionform);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formdata);
        let timeurl: string = "https://carserver-nw7d.onrender.com/index.html?filter=c";
        localStorage.setItem("url",timeurl);
        timeurl = timeurl + "&" + query.toString();
        localStorage.setItem("bookoption","b"); 
        localStorage.setItem("query",query.toString());   
        localStorage.setItem("url",timeurl);        
    }
    // get Cars that are with the wished engine from server
    static async filterCarPower(_event:Event): Promise<void> {
        console.log("filtersubmit click");
        let optionform: HTMLFormElement = <HTMLFormElement>document.getElementById("optionForm");
        let formdata: FormData = new FormData(optionform);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formdata);
        let filterurl: string = "https://carserver-nw7d.onrender.com/index.html?filter=b";
        filterurl = filterurl + "&" + query.toString();
        localStorage.setItem("url",filterurl);  
    } 
    // get to the page to book one car   
    static async bookOneCar(_event: Event): Promise<void> {
        console.log("click");
        let dataId: string = (_event.target as HTMLImageElement).id;
        localStorage.setItem("dataId",dataId);
        window.location.replace("bookcar.html");
    }
    // show Data for choosen car
    static async showData(): Promise<void> {
        document.getElementById("showCar").innerHTML="";
        document.getElementById("book").innerHTML="";
        let url: string = "https://carserver-nw7d.onrender.com/bookcars.html";
        let dataId: string =localStorage.getItem("dataId");
        url = url + "?" + "&dataID=" + dataId;
        //fetch data from server
        let response: Response = await fetch(url);
        let responsetext: string = await response.text();
        let responsetextjson: CarData = JSON.parse(responsetext);
        // time is choosen before
        let filter: string = localStorage.getItem("bookoption");
        if(filter =="b"){
            let param:string = localStorage.getItem("query");
            let parts:string[] = param.split("&");
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
    
            let price: number = parseInt(responsetextjson.pnd)+ duration*parseFloat(responsetextjson.ppmin);
            localStorage.setItem("price",price.toString());
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
            bookbutton.addEventListener("click", async function (): Promise<void> {Car.bookCar(event)});
            bookbutton.innerHTML="jetzt Buchen";
            document.getElementById("book").appendChild(bookbutton);
            
            let betriebsart: string ="";
            if(responsetextjson.electronic == true && responsetextjson.conventionell == false){
                betriebsart = "E-Auto";
            }
            else if(responsetextjson.conventionell == true && responsetextjson.electronic == false){
                betriebsart = "Konventionell";
            }
            else{
                betriebsart = "Hybrid";
            }
    
            tableelement1.innerHTML = responsetextjson.name; 
            tableelement2.innerHTML = betriebsart; 
            tableelement3.innerHTML = date;
            tableelement4.innerHTML = start+ " Uhr"; 
            tableelement5.innerHTML = endtime+ " Uhr"; 
            tableelement6.innerHTML = duration+ " Min";
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
            if(responsetextjson.electronic == true && responsetextjson.conventionell == false){
                betriebsart = "E-Auto";
            }
            else if(responsetextjson.conventionell == true && responsetextjson.electronic == false){
                betriebsart = "Konventionell";
            }
            else{
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
    
            let timefilterformelement:HTMLElement = document.createElement("form");
            timefilterformelement.onsubmit = function(){
                return false;
            };
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
            let timebutton: HTMLButtonElement = document.createElement("button");
            timebutton.addEventListener("click", async function (): Promise<void> {Car.bookCarTime(event)});
            timebutton.innerHTML="näher ansehen";
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
    static async bookCarTime(_event: Event): Promise<void> {
        console.log("click");
        let timeForm: HTMLFormElement = <HTMLFormElement>document.getElementById("time");
        let formData: FormData = new FormData(timeForm);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        let check: boolean = HelpFunktions.checkFormData(formData,3);
        if (check ==true){
            localStorage.setItem("query",query.toString());
            localStorage.setItem("bookoption","b");
            Car.showData();
        }
        else{
            window.alert("Bitte füllen Sie alle Felder aus");
        }         
    }
    // book that car
    static async bookCar(_event: Event): Promise<void> {
        console.log("book that car");
        let user: string =localStorage.getItem("user");
        let query: string =localStorage.getItem("query");
        let carid:string = localStorage.getItem("dataId");
        let price: string = localStorage.getItem("price");
        if (user == null){
            console.log("user not logged in");
            localStorage.setItem("lastmove","bookcar.html");
            window.location.replace("login.html");
        }
        else{
            let timeurl: string = "https://carserver-nw7d.onrender.com/booktime.html";
            timeurl = timeurl + "?" + query+"&"+user+"&carid="+carid+"&price="+price;
            let response: Response = await fetch(timeurl);
            let responseText: string = await response.text();
            window.alert(responseText);
            window.location.replace("index.html");

        } 
    }   
}