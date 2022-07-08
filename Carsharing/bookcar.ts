namespace Carsharing{
    
    showData();

    interface Car{
        id: string;
        name: string;
        electronic: boolean;
        conventionell: boolean;
        fnut: string;
        lnut: string;
        max: string;
        pnd: string;
        ppmin: string;
    }

    async function showData(): Promise<void> {
        let url: string = "https://softwaredesign.herokuapp.com/bookcars.html";
        let dataId: string =sessionStorage.getItem("dataId");
        url = url + "?" + "&dataID=" + dataId;
        //console.log(url);
        let response: Response = await fetch(url);
        let responseText: string = await response.text();
        let responseTextJson: Car = JSON.parse(responseText);
        //console.log(response);
        //console.log(responseTextJson);
        let tabledescription: string[]= ["Auto Id","Auto Bezeichnung","Antriebsart","frühste Nutzungsuhrzeit","späteste Nutzungsuhrzeit","maximale Nutzungdauer","pauschale Nutzungspreis","Preis pro Minute"]
        
        let tabl: HTMLElement = document.createElement("table");
        document.getElementById("showCar").appendChild(tabl);
        for ( let i: number = 0; i <= 7; i++) {
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
        
        let betriebsart: string ="";
        if(responseTextJson.electronic == true && responseTextJson.conventionell == false){
            console.log("elektronik");
            betriebsart = "E-Auto";
        }
        else if(responseTextJson.conventionell == true && responseTextJson.electronic == false){
            betriebsart = "Konventionell";
        }
        else{
            betriebsart = "Hybrid";
        }

        tableelement1.innerHTML = responseTextJson.id; 
        tableelement2.innerHTML = responseTextJson.name; 
        tableelement3.innerHTML = betriebsart; 
        tableelement4.innerHTML = responseTextJson.fnut + " Uhr"; 
        tableelement5.innerHTML = responseTextJson.lnut + " Uhr"; 
        tableelement6.innerHTML = responseTextJson.max + " Min";
        tableelement7.innerHTML = responseTextJson.pnd + " €"; 
        tableelement8.innerHTML = responseTextJson.ppmin + " €";
        
        tablerow.appendChild(tableelement1);
        tablerow.appendChild(tableelement2);
        tablerow.appendChild(tableelement3);
        tablerow.appendChild(tableelement4);
        tablerow.appendChild(tableelement5);
        tablerow.appendChild(tableelement6);
        tablerow.appendChild(tableelement7);
        tablerow.appendChild(tableelement8); 
        tabl.appendChild(tablerow);

        let timeForm: HTMLFormElement = <HTMLFormElement>document.getElementById("time");
        let timeButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("timebutton");
        timeButton.addEventListener("click", booktime);
        
        async function booktime(_event: Event): Promise<void> {
            console.log("click");
            let formData: FormData = new FormData(timeForm);
            let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
            console.log(query.toString());
            let timeurl: string = "https://softwaredesign.herokuapp.com/checktime.html";
    
            timeurl = timeurl + "?" + query.toString();
            console.log(timeurl);
            let response: Response = await fetch(timeurl);
            let responseText: string = await response.text();
            //console.log(response);
            console.log(responseText);
        }
    } 
}