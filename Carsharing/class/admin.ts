import{HelpFunktions} from "./function.js"
import { User } from "./user.js";

export class Admin extends User{

    static admin(){
        // get Forminput from admin.html
        let carform: HTMLFormElement = <HTMLFormElement>document.getElementById("addcar");
        let carbutton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("buttonaddcar");
        carbutton.addEventListener("click", async function (): Promise<void> {Admin.addCar(event,carform)});
    }
    // add car button
    static async addCar(_event: Event,form: HTMLFormElement): Promise<void> {
        let formData: FormData = new FormData(form);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);

        let url: string = "https://carserver-nw7d.onrender.com/addcar.html";
        url = url + "?" + query.toString();
        // send request to add car to server
        let response: Response = await fetch(url);
        let responsetext: string = await response.text();
        window.alert(responsetext);
        
    }
}
localStorage.setItem("lastmove","admin.html");
HelpFunktions.navibar();
Admin.admin();
    

    
