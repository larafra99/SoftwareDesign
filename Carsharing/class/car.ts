import {CarData} from "../interfaces/interface";
import { checkformdata} from "../function/formdata.js"

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
    
     static async showCarData(): Promise<void> {
        document.getElementById("showData").innerHTML="";
        document.getElementById("filteroptions").innerHTML="";
        let filter: string = localStorage.getItem("filter");
        if(filter =="a" || filter== null){
            localStorage.removeItem("bookoption");
            let filterurl: string = "https://softwaredesign.herokuapp.com/index.html?filter=a";
            localStorage.setItem("url",filterurl);   
        }
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
    
            let filtersubmitButton: HTMLElement = document.createElement("button");
            filtersubmitButton.addEventListener("click", async function (): Promise<void> {Car.filterCarTime(event)}); 
            filtersubmitButton.innerHTML="submit";
            
            filterformelement.appendChild(filterlabel);
            filterlabel.appendChild(filterdate);
            filterformelement.appendChild(filterlabel1);
            filterlabel1.appendChild(filtertime);
            filterformelement.appendChild(filterlabel2);
            filterlabel2.appendChild(filterduration);
            filterformelement.appendChild(filtersubmitButton);
        }
    
        let url:string = localStorage.getItem("url");
        let response: Response = await fetch(url);
        let responseText: string = await response.text();
        //console.log("Respons",responseText);
        if (responseText =="Bitte füllen sie mindestens eine Box"){
            window.alert(responseText);
        }
        else{
            let responseTextJson: CarData[] = JSON.parse(responseText);
            let tabledescription: string[]= ["Auto Bezeichnung","Antriebsart","frühste Nutzungsuhrzeit","späteste Nutzungsuhrzeit","maximale Nutzungdauer","pauschale Nutzungspreis","Preis pro Minute","Buchen"]
            
            let tabl: HTMLElement = document.createElement("table");
            document.getElementById("showData").appendChild(tabl);
            for ( let i: number = 0; i <= 7; i++) {
                let tableheader: HTMLElement = document.createElement("th");
                tableheader.innerHTML = tabledescription[i];
                tabl.appendChild(tableheader);
            }
            let caramount: string = localStorage.getItem("amount");
            let amount: number;
        
            if(caramount==null){
                amount= 10;
            }
            else{
                amount = parseInt(caramount);
            }
            
            if (Object.keys(responseTextJson).length< amount||caramount=="all"){
                amount=Object.keys(responseTextJson).length
            }
    
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
    
                tableelement8.addEventListener("click", async function (): Promise<void> {Car.bookOneCar(event)});
                tableelement8.id = responseTextJson[i].id;
                let betriebsart: string ="";
                if(responseTextJson[i].electronic == true && responseTextJson[i].conventionell == false){
                    betriebsart = "E-Auto";
                }
                else if(responseTextJson[i].conventionell == true && responseTextJson[i].electronic == false){
                    betriebsart = "Konventionell";
                }
                else{
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
        
        let amountButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
        amountButton.addEventListener("click", async function (): Promise<void> {Car.carAmount(event)});   
        let filterButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("filterbutton");
        filterButton.addEventListener("click", async function (): Promise<void> {Car.carFilter(event)});      
    }
    
     static async carAmount(_event:Event):Promise<void> {
        console.log("amount click");
        let amountForm: HTMLFormElement = <HTMLFormElement>document.getElementById("amountForm");
        let formData: FormData = new FormData(amountForm);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        localStorage.setItem("amount",(query.toString()).substring(9));
        Car.showCarData();    
    }
    
    static async carFilter(_event:Event):Promise<void>{
        console.log("filter click");
        let filterForm: HTMLFormElement = <HTMLFormElement>document.getElementById("filterForm");
        let formData: FormData = new FormData(filterForm);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        console.log("Query", query.toString());
        console.log((query.toString()).substring(7));
        //localStorage.removeItem("filter");
        localStorage.setItem("filter",(query.toString()).substring(7));
        localStorage.setItem("bookoption","a");
        Car.showCarData();   
    }
    
    static async filterCarTime(_event:Event): Promise<void>{
        console.log("filtersubmit click");
        let optionForm: HTMLFormElement = <HTMLFormElement>document.getElementById("optionForm");
        let formData: FormData = new FormData(optionForm);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        let timeurl: string = "https://softwaredesign.herokuapp.com/index.html?filter=c";
        localStorage.setItem("url",timeurl);
        timeurl = timeurl + "&" + query.toString();
        localStorage.setItem("bookoption","b"); 
        localStorage.setItem("query",query.toString());   
        localStorage.setItem("url",timeurl);        
    }
    
    static async filterCarPower(_event:Event): Promise<void> {
        console.log("filtersubmit click");
        let optionForm: HTMLFormElement = <HTMLFormElement>document.getElementById("optionForm");
        let formData: FormData = new FormData(optionForm);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        let filterurl: string = "https://softwaredesign.herokuapp.com/index.html?filter=b";
        filterurl = filterurl + "&" + query.toString();
        localStorage.setItem("url",filterurl);  
    } 
        
    static async bookOneCar(_event: Event): Promise<void> {
        console.log("click");
        let dataId: string = (_event.target as HTMLImageElement).id;
        localStorage.setItem("dataId",dataId);
        window.location.replace("bookcar.html");
    }
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    static async showData(): Promise<void> {
        document.getElementById("showCar").innerHTML="";
        document.getElementById("book").innerHTML="";
        let url: string = "https://softwaredesign.herokuapp.com/bookcars.html";
        let dataId: string =localStorage.getItem("dataId");
        url = url + "?" + "&dataID=" + dataId;
        let response: Response = await fetch(url);
        let responseText: string = await response.text();
        let responseTextJson: CarData = JSON.parse(responseText);
    
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
            let timeButton: HTMLButtonElement = document.createElement("button");
            timeButton.addEventListener("click", async function (): Promise<void> {Car.bookCarTime(event)});
            timeButton.innerHTML="näher ansehen";
            timefilterformelement.appendChild(filterlabel);
            filterlabel.appendChild(filterdate);
            timefilterformelement.appendChild(filterlabel1);
            filterlabel1.appendChild(filtertime);
            timefilterformelement.appendChild(filterlabel2);
            filterlabel2.appendChild(filterduration);
            timefilterformelement.appendChild(timeButton);
        }        
    } 
    
    static async bookCarTime(_event: Event): Promise<void> {
        let user: string =localStorage.getItem("user");
        console.log("user",localStorage.getItem("user"));
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
            let check: boolean = checkformdata(formData,3);
            if (check ==true){
                localStorage.setItem("query",query.toString());
                localStorage.setItem("bookoption","b");
                Car.showData();
            }
            else{
                window.alert("Bitte füllen Sie alle Felder aus");
            }
        }            
    }

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
            let timeurl: string = "https://softwaredesign.herokuapp.com/booktime.html";
            timeurl = timeurl + "?" + query+"&"+user+"&carid="+carid+"&price="+price;
            let response: Response = await fetch(timeurl);
            let responseText: string = await response.text();
            window.alert(responseText);
        } 
    }   
}