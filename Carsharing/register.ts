import {checkregex} from "./function/regex.js";
let regForm: HTMLFormElement = <HTMLFormElement>document.getElementById("regForm");
let regButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("register");
regButton.addEventListener("click", register);

async function register(_event: Event): Promise<void> {
    let formData: FormData = new FormData(regForm);
    let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
     
    let validregister: boolean = checkregex(formData.get("username").toString(),"username");
    console.log(validregister);
    if(validregister== false){
        console.log(formData.get("username"));
        let registerText: HTMLElement = document.createElement("p");
        document.getElementById("response").innerHTML="";
        document.getElementById("response").appendChild(registerText);
        registerText.innerHTML = "Nutzernamen muss mit einem Buchstaben anfangen und darf Zahlen und Unterstriche enthalten";
    }
    else{
        let url: string = "https://softwaredesign.herokuapp.com/register.html";
        url = url + "?" + query.toString();
        //send registration to server
        let response: Response = await fetch(url);
        let responseText: string = await response.text();
        // displays server response
        let registerText: HTMLElement = document.createElement("p");
        document.getElementById("response").innerHTML="";
        document.getElementById("response").appendChild(registerText);
        registerText.innerHTML = responseText;
        if (responseText == "Nutzer wurde erstellt") {
            // if registration was a sucess, user send to login
            localStorage.setItem("lastmove","register.html");
            window.location.replace("login.html");
        }
    }

    
}
