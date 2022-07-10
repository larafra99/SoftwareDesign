namespace Carsharing{
    showData("10");

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

    async function showData(caramount:string): Promise<void> {
        document.getElementById("showData").innerHTML="";
        let url: string = "https://softwaredesign.herokuapp.com/index.html";
        let response: Response = await fetch(url);
        let responseText: string = await response.text();
        let responseTextJson: Car[] = JSON.parse(responseText);
        //console.log(response);
        console.log(responseTextJson);
        console.log(Object.keys(responseTextJson).length);
        let tabledescription: string[]= ["Auto Bezeichnung","Antriebsart","frühste Nutzungsuhrzeit","späteste Nutzungsuhrzeit","maximale Nutzungdauer","pauschale Nutzungspreis","Preis pro Minute","Buchen"]
        
        let tabl: HTMLElement = document.createElement("table");
        document.getElementById("showData").appendChild(tabl);
        for ( let i: number = 0; i <= 7; i++) {
            let tableheader: HTMLElement = document.createElement("th");
            tableheader.innerHTML = tabledescription[i];
            tabl.appendChild(tableheader);
        }
        let amount: number;
        if (caramount=="all"){
            amount=Object.keys(responseTextJson).length

        }
        amount = parseInt(caramount);
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

            tableelement8.addEventListener("click", bookcar);
            tableelement8.id = responseTextJson[i].id;
            
            let betriebsart: string ="";
            if(responseTextJson[i].electronic == true && responseTextJson[i].conventionell == false){
                console.log("elektonik");
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
        let amountButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
        amountButton.addEventListener("click", amountbutton);   
        let filterButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("filterbutton");
        filterButton.addEventListener("click", filterbutton);      
    }
    async function amountbutton(_event:Event):Promise<void> {
        console.log("amount click");
        let amountForm: HTMLFormElement = <HTMLFormElement>document.getElementById("amountForm");
        let formData: FormData = new FormData(amountForm);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        console.log("Query", query.toString());
        console.log((query.toString()).substring(9));
        showData((query.toString()).substring(9)); 
        
    }
    async function filterbutton(_event:Event):Promise<void>{
        let filterelement: HTMLElement = document.createElement("p");
        filterelement.innerHTML="hi";
        document.getElementById("filteroptions").appendChild(filterelement);
        console.log("filter click");
    } 
     
    async function bookcar(_event: Event): Promise<void> {
        console.log("click");
        let dataId: string = (_event.target as HTMLImageElement).id;
        console.log(dataId);
        localStorage.removeItem("dataId");
        localStorage.setItem("dataId",dataId);
        window.location.replace("bookcar.html");
    }    
}