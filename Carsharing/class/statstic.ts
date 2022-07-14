import{UseTimes}from "../interfaces/interface.js";
import {navibar} from "../function/flexnavi.js";

export class Statistic{
    static async showstatistic():Promise<void> {
        document.getElementById("fullstatistic").innerHTML="";
        let url: string = "https://softwaredesign.herokuapp.com/getstatistc.html";
        let user: string =localStorage.getItem("user");
        url = url + "?" + "&" + user;
        // get statistics from server
        let response: Response = await fetch(url);
        let responseText: string = await response.text();
        let responseTextJson: UseTimes[] = JSON.parse(responseText);
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
        for ( let i: number = 0; i < Object.keys(responseTextJson).length; i++) {
            let starttime:string;
            let endtime: string;
            overallprice=overallprice +parseFloat(responseTextJson[i].price);
            if (responseTextJson[i].starttime.length==3){
                starttime= "0"+(responseTextJson[i].starttime).slice(0,1)+":"+(responseTextJson[i].starttime).slice(1);
            }
            else{
                starttime = (responseTextJson[i].starttime).slice(0,2)+":"+(responseTextJson[i].starttime).slice(2);
            }
            if (responseTextJson[i].endtime.length==3){
                endtime = "0"+(responseTextJson[i].endtime).slice(0,1)+":"+(responseTextJson[i].endtime).slice(1);
            }
            else{
                endtime = (responseTextJson[i].endtime).slice(0,2)+":"+(responseTextJson[i].endtime).slice(2);
            }
    
            let tablerow: HTMLElement = document.createElement("tr");
            let tableelement1: HTMLElement = document.createElement("td");
            let tableelement2: HTMLElement = document.createElement("td");
            let tableelement3: HTMLElement = document.createElement("td");
            let tableelement4: HTMLElement = document.createElement("td");
            let tableelement5: HTMLElement = document.createElement("td");
    
            tableelement1.innerHTML = responseTextJson[i].carid; 
            tableelement2.innerHTML = responseTextJson[i].date 
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
        // create Text for average costs and overall costs
        let averageprice:number =overallprice/Object.keys(responseTextJson).length;
        let stats: HTMLElement = document.createElement("p");
        let stats2: HTMLElement = document.createElement("p");
        let stats3: HTMLElement = document.createElement("p");
        document.getElementById("statistic").appendChild(stats);
        document.getElementById("statistic").appendChild(stats2);
        document.getElementById("statistic").appendChild(stats3);
        stats.innerHTML="Gesamtkosten aller Fahrten:  " +overallprice+" €";
        stats2.innerHTML="Anzahl an Fahrten:  "+Object.keys(responseTextJson).length;
        stats3.innerHTML="Durchschnitskosten Ihrer Fahrten:  "+averageprice+" €";
    }
};
localStorage.setItem("lastmove","statistic.html");
navibar();
Statistic.showstatistic();