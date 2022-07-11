"use strict";
let logForm = document.getElementById("logForm");
let logButton = document.getElementById("login");
logButton.addEventListener("click", login);
if (localStorage.getItem("lastmove") == "register.html") {
    // user just registered 
    console.log("register");
    document.getElementById("registerinfo").innerHTML = "";
    let infoText = document.createElement("p");
    infoText.innerHTML = "erfolgreich registriert bitte Login sie sich ein. Wenn sie sich die Auswahl aussehen wollen wählen sie im Header: Aussuchen Button";
    document.getElementById("registerinfo").appendChild(infoText);
    localStorage.removeItem("lastmove");
}
async function login(_event) {
    let formData = new FormData(logForm);
    let query = new URLSearchParams(formData);
    let url = "https://softwaredesign.herokuapp.com/login.html";
    url = url + "?" + query.toString();
    //server checked login
    let response = await fetch(url);
    let responseText = await response.text();
    //displays response from server if login was a sucess or if ot failed
    let loginText = document.createElement("p");
    document.getElementById("response").innerHTML = "";
    document.getElementById("response").appendChild(loginText);
    loginText.innerHTML = responseText;
    if (responseText == "erfolgreich eingeloggt") {
        //sucessfull login
        localStorage.setItem("user", ((query.toString()).split("&").shift()));
        if (localStorage.getItem("lastmove") == "bookcar.html") {
            // takes user back to the car they wanted to book before
            let location = localStorage.getItem("lastmove");
            console.log("port back");
            window.location.replace(location);
        }
        else {
            //next step choose car
            window.location.replace("index.html");
        }
    }
}
//# sourceMappingURL=login.js.map