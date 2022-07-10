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
        document.getElementById("showData").innerHTML="";
        document.getElementById("filteroptions").innerHTML="";
        let filter: string = localStorage.getItem("filter");
        if(filter =="a" || filter== null){
            let filterurl: string = "https://softwaredesign.herokuapp.com/index.html?filter=a";
            localStorage.setItem("url",filterurl);   
        }
        else if (filter =="b"){
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
            filtersubmitButton.addEventListener("click", filtersubmitbutton); 
            filtersubmitButton.innerHTML="submit";
            filterformelement.appendChild(filterelement);
            filterformelement.appendChild(filterelement2);
            filterformelement.appendChild(filterelement3);
            filterformelement.appendChild(filterelement4);
            filterformelement.appendChild(filtersubmitButton);
              
        }
        else{
            let filterurl: string = "https://softwaredesign.herokuapp.com/index.html?filter=c";
            localStorage.setItem("url",filterurl);   
        }

        let url:string = localStorage.getItem("url");
        let response: Response = await fetch(url);
        let responseText: string = await response.text();
        let responseTextJson: Car[] = JSON.parse(responseText);
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

            tableelement8.addEventListener("click", bookcar);
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
        localStorage.setItem("amount",(query.toString()).substring(9));
        showData();    
    }

    async function filterbutton(_event:Event):Promise<void>{
        console.log("filter click");
        let filterForm: HTMLFormElement = <HTMLFormElement>document.getElementById("filterForm");
        let formData: FormData = new FormData(filterForm);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        console.log("Query", query.toString());
        console.log((query.toString()).substring(7));
        //localStorage.removeItem("filter");
        localStorage.setItem("filter",(query.toString()).substring(7));
        showData();
        
    }
    async function filtersubmitbutton(_event:Event): Promise<void> {
        console.log("filtersubmit click");
        let optionForm: HTMLFormElement = <HTMLFormElement>document.getElementById("optionForm");
        let formData: FormData = new FormData(optionForm);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        let filterurl: string = "https://softwaredesign.herokuapp.com/index.html?filter=b";
        filterurl = filterurl + "&" + query.toString();
        console.log("Query", query.toString());
        localStorage.setItem("url",filterurl); 
        
    } 
     
    async function bookcar(_event: Event): Promise<void> {
        console.log("click");
        let dataId: string = (_event.target as HTMLImageElement).id;
        console.log(dataId);
        localStorage.setItem("dataId",dataId);
        window.location.replace("bookcar.html");
    }    
}