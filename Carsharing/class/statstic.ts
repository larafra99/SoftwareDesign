import{UseTimes}from "../interfaces/interface.js";
import{HelpFunktions} from "./function.js"

export class Statistic{
    static async showStatistic():Promise<void> {
        document.getElementById("fullstatistic").innerHTML="";
        let url: string = "https://softwaredesign.herokuapp.com/getstatistc.html";
        let user: string =localStorage.getItem("user");
        url = url + "?" + "&" + user;
        // get statistics from server
        let response: Response = await fetch(url);
        let responsetext: string = await response.text();
        let responsetextjson: UseTimes[] = JSON.parse(responsetext);
        // create table for all booking events
        let tabledescription: string[]= ["Auto Bezeichnung","Datum","Startnutzung","Endnutzung","Nutzungspreis"]       
        let tabl: HTMLElement = document.createElement("table");
        let overallprice:number = 0;
        document.getElementById("fullstatistic").appendChild(tabl);
        // create table header
        for ( let i: number = 0; i < tabledescription.length; i++) {
            let tableheader: HTMLElement = document.createElement("th");
            tableheader.innerHTML = tabledescription[i];
            tabl.appendChild(tableheader);
        }
        // create table elements with serverresponse
        for ( let i: number = 0; i < Object.keys(responsetextjson).length; i++) {
            let starttime:string;
            let endtime: string;
            overallprice=overallprice +parseFloat(responsetextjson[i].price);
            if (responsetextjson[i].starttime.length==3){
                starttime= "0"+(responsetextjson[i].starttime).slice(0,1)+":"+(responsetextjson[i].starttime).slice(1);
            }
            else{
                starttime = (responsetextjson[i].starttime).slice(0,2)+":"+(responsetextjson[i].starttime).slice(2);
            }
            if (responsetextjson[i].endtime.length==3){
                endtime = "0"+(responsetextjson[i].endtime).slice(0,1)+":"+(responsetextjson[i].endtime).slice(1);
            }
            else{
                endtime = (responsetextjson[i].endtime).slice(0,2)+":"+(responsetextjson[i].endtime).slice(2);
            }
    
            let tablerow: HTMLElement = document.createElement("tr");
            let tableelement1: HTMLElement = document.createElement("td");
            let tableelement2: HTMLElement = document.createElement("td");
            let tableelement3: HTMLElement = document.createElement("td");
            let tableelement4: HTMLElement = document.createElement("td");
            let tableelement5: HTMLElement = document.createElement("td");
    
            tableelement1.innerHTML = responsetextjson[i].carid; 
            tableelement2.innerHTML = responsetextjson[i].date 
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
        let averageprice:number =overallprice/Object.keys(responsetextjson).length;
        let stats: HTMLElement = document.createElement("p");
        let stats2: HTMLElement = document.createElement("p");
        let stats3: HTMLElement = document.createElement("p");
        document.getElementById("statistic").appendChild(stats);
        document.getElementById("statistic").appendChild(stats2);
        document.getElementById("statistic").appendChild(stats3);
        stats.innerHTML="Gesamtkosten aller Fahrten:  " +overallprice+" €";
        stats2.innerHTML="Anzahl an Fahrten:  "+Object.keys(responsetextjson).length;
        stats3.innerHTML="Durchschnittskosten Ihrer Fahrten:  "+averageprice+" €";
    }
};
localStorage.setItem("lastmove","statistic.html");
HelpFunktions.navibar();
Statistic.showStatistic();