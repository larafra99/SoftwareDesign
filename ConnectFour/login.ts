let logForm: HTMLFormElement = <HTMLFormElement>document.getElementById("logForm");
let logButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("login");
logButton.addEventListener("click", login);

async function login(_event: Event): Promise<void> {
    let formData: FormData = new FormData(logForm);
    let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);

    // http:://herokuapp/register.html?user=...&
    let url: string = "https://gisws2021.herokuapp.com/login.html";

    url = url + "?" + query.toString();
    console.log(url);
    let response: Response = await fetch(url);
    let responseText: string = await response.text();
    //console.log(response);
    console.log(responseText);

    let loginText: HTMLElement = document.createElement("p");
    document.getElementById("response").appendChild(loginText);
    loginText.innerHTML = responseText; 
    if (responseText != "null") {
        localStorage.setItem("userId", responseText);
        window.location.replace("verleih.html");
        }

    }