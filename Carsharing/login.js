"use strict";
let logForm = document.getElementById("logForm");
let logButton = document.getElementById("login");
logButton.addEventListener("click", login);
if (localStorage.getItem("lastmove") == "register.html") {
    // user just registered 
    window.alert("erfolgreich registriert bitte Login sie sich ein");
}
async function login(_event) {
    let formData = new FormData(logForm);
    let query = new URLSearchParams(formData);
    let url = "https://softwaredesign.herokuapp.com/login.html";
    url = url + "?" + query.toString();
    //server checked login
    let response = await fetch(url);
    let responseText = await response.text();
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
    else {
        //displays response from server if login failed
        window.alert(responseText);
    }
}
//# sourceMappingURL=login.js.map