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
        let url: string = "https://softwaredesign.herokuapp.com/index.html";
        let response: Response = await fetch(url);
        let responseText: string = await response.text();
        let responseTextJson: Car[] = JSON.parse(responseText);
        //console.log(response);
        console.log(responseTextJson);
        console.log(Object.keys(responseTextJson).length);
        

        let tabl: HTMLElement = document.createElement("table");
        let tableheader1: HTMLElement = document.createElement("th");
        let tableheader2: HTMLElement = document.createElement("th");
        let tableheader3: HTMLElement = document.createElement("th");
        let tableheader4: HTMLElement = document.createElement("th");
        let tableheader5: HTMLElement = document.createElement("th");
        let tableheader6: HTMLElement = document.createElement("th");
        let tableheader7: HTMLElement = document.createElement("th");
        let tableheader8: HTMLElement = document.createElement("th");
        tableheader1.innerHTML = "Auto Id";
        tableheader2.innerHTML = "Auto Bezeichnung";
        tableheader3.innerHTML = "Antriebsart";
        tableheader4.innerHTML = "frühste Nutzungsuhrzeit";
        tableheader5.innerHTML = "späteste Nutzungsuhrzeit";
        tableheader6.innerHTML = "maximale Nutzungdauer";
        tableheader7.innerHTML = "pauschale Nutzungspreis";
        tableheader8.innerHTML = "Preis pro Minute";
        document.getElementById("showData").appendChild(tabl);
        tabl.appendChild(tableheader1);
        tabl.appendChild(tableheader2);
        tabl.appendChild(tableheader3);
        tabl.appendChild(tableheader4);
        tabl.appendChild(tableheader5);
        tabl.appendChild(tableheader6);
        tabl.appendChild(tableheader7);
        tabl.appendChild(tableheader8);
            
        // for ( let i: number = 0; i < Object.keys(responseTextJson).length; i++) {

        //     let tablerow: HTMLElement = document.createElement("tr");
        //     let tableelement1: HTMLElement = document.createElement("td");
        //     let tableelement2: HTMLElement = document.createElement("td");
        //     let tableelement3: HTMLElement = document.createElement("td");
        //     let tableelement4: HTMLElement = document.createElement("td");
        //     let imag: HTMLImageElement = document.createElement("img");
        //     imag.src = "picture/" + responseTextJson[i].url;
        //     tableelement2.innerHTML = responseTextJson[i].name; 
        //     tableelement3.innerHTML = responseTextJson[i].geld; 
        //     //console.log(responseTextJson[1].status);
        //     console.log(sessionStorage.getItem("userId"));
        //     console.log("respone" + responseTextJson[i].reserviert );

        //     if (responseTextJson[i].status == "frei") {
        //         let button: HTMLButtonElement = document.createElement("button");
        //         button.addEventListener("click", ausleihen);
        //         button.id = responseTextJson[i]._id;
        //         //console.log(responseTextJson[i]._id);
        //         tableelement4.appendChild(button);
        //         button.innerHTML = "ausleihen";
        //     }
        //     else {
        //         tableelement4.innerHTML = responseTextJson[i].status;
        //         if (responseTextJson[i].reserviert  == sessionStorage.getItem("userId")) {
        //             tablerow.style.backgroundColor = "#81F781";

        //         }
        //         else {
        //             tablerow.style.backgroundColor = "#9B9696";
        //         }
                
                
        //     }

        //     tablerow.appendChild(tableelement1);
        //     tablerow.appendChild(tableelement2);
        //     tablerow.appendChild(tableelement3);
        //     tablerow.appendChild(tableelement4);
        //     tableelement1.appendChild(imag);
        //     tabl.appendChild(tablerow);

        // }    

    }  
    async function ausleihen(_event: Event): Promise<void> {
        let url: string = "https://gisws2021.herokuapp.com/ausleihen.html";

        let userId: string = sessionStorage.getItem("userId");
        let dataId: string = (_event.target as HTMLImageElement).id;
        console.log(dataId);
        url = url + "?" + "userID=" + userId + "&dataID=" + dataId;
        console.log(url);
        let response: Response = await fetch(url);
        let responseText: string = await response.text();
        //console.log(response);
        console.log(responseText);
        window.location.replace("verleih.html"); 
       
    }
}