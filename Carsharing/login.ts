let logForm: HTMLFormElement = <HTMLFormElement>document.getElementById("logForm");
let logButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("login");
logButton.addEventListener("click", login);
if(localStorage.getItem("lastmove")=="register.html"){
    // user just registered 
    console.log("register");
    document.getElementById("registerinfo").innerHTML="";
    let infoText: HTMLElement = document.createElement("p");
    infoText.innerHTML="erfolgreich registriert bitte Login sie sich ein. Wenn sie sich die Auswahl aussehen wollen wählen sie im Header: Aussuchen Button"
    document.getElementById("registerinfo").appendChild(infoText);
    localStorage.removeItem("lastmove");
}

async function login(_event: Event): Promise<void> {
    let formData: FormData = new FormData(logForm);
    let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);

    let url: string = "https://softwaredesign.herokuapp.com/login.html";
    url = url + "?" + query.toString();
    //server checked login
    let response: Response = await fetch(url);
    let responseText: string = await response.text();
    //displays response from server if login was a sucess or if ot failed
    let loginText: HTMLElement = document.createElement("p");
    document.getElementById("response").innerHTML="";
    document.getElementById("response").appendChild(loginText);
    loginText.innerHTML = responseText; 
    if (responseText == "erfolgreich eingeloggt") {
        //sucessfull login
        localStorage.setItem("user", ((query.toString()).split("&").shift()));
        
        if(localStorage.getItem("lastmove")=="bookcar.html"){
            // takes user back to the car they wanted to book before
            let location: string= localStorage.getItem("lastmove");
            console.log("port back");
            window.location.replace(location);
        }
        else{
            //next step choose car
            window.location.replace("index.html");
        }
    }
}