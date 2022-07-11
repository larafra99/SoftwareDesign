let logForm: HTMLFormElement = <HTMLFormElement>document.getElementById("logForm");
let logButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("login");
logButton.addEventListener("click", login);

async function login(_event: Event): Promise<void> {
    let formData: FormData = new FormData(logForm);
    let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);

    // http:://herokuapp/register.html?user=...&
    let url: string = "https://softwaredesign.herokuapp.com/login.html";

    url = url + "?" + query.toString();
    console.log(url);
    console.log("query",(query.toString()).substring(9));
    console.log("query",((query.toString()).split("&").shift()).substring(9));
    let response: Response = await fetch(url);
    let responseText: string = await response.text();
    console.log(response);
    console.log(responseText);

    let loginText: HTMLElement = document.createElement("p");
    document.getElementById("response").innerHTML="";
    document.getElementById("response").appendChild(loginText);
    loginText.innerHTML = responseText; 
    if (responseText == "erfolgreich eingeloggt") {
        localStorage.setItem("user", ((query.toString()).split("&").shift()));
        
        if(localStorage.getItem("lastmove")!= null){
            let location: string= localStorage.getItem("lastmove");
            console.log("port back");
            console.log(location);
            window.location.replace(location);
        }
        else{
            window.location.replace("index.html");

        }
        }

}