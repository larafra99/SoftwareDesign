    import {navibar} from "../function/flexnavi.js";
    
    export class Admin{

        static admin(){
            let carForm: HTMLFormElement = <HTMLFormElement>document.getElementById("addcar");
            let carButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("buttonaddcar");
            carButton.addEventListener("click", async function (): Promise<void> {Admin.addcar(event,carForm)});
        }
        
        static async addcar(_event: Event,carForm: HTMLFormElement): Promise<void> {
            let formData: FormData = new FormData(carForm);
            let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
    
            let url: string = "https://softwaredesign.herokuapp.com/addcar.html";
            url = url + "?" + query.toString();
            // send request to add car to server
            let response: Response = await fetch(url);
            let responseText: string = await response.text();
            window.alert(responseText);
            
        }
    }
    localStorage.setItem("lastmove","admin.html");
    navibar();
    Admin.admin();
    

    
