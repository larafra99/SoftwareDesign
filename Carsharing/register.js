import { checkregex } from "./function/regex.js";
let regForm = document.getElementById("regForm");
let regButton = document.getElementById("register");
regButton.addEventListener("click", register);
async function register(_event) {
    let formData = new FormData(regForm);
    let query = new URLSearchParams(formData);
    let validregister = checkregex(formData.get("username").toString(), "username");
    console.log(validregister);
    if (validregister == false) {
        console.log(formData.get("username"));
        let registerText = document.createElement("p");
        document.getElementById("response").innerHTML = "";
        document.getElementById("response").appendChild(registerText);
        registerText.innerHTML = "Nutzernamen muss mit einem Buchstaben anfangen und darf Zahlen und Unterstriche enthalten";
    }
    else {
        let url = "https://softwaredesign.herokuapp.com/register.html";
        url = url + "?" + query.toString();
        //send registration to server
        let response = await fetch(url);
        let responseText = await response.text();
        // displays server response
        let registerText = document.createElement("p");
        document.getElementById("response").innerHTML = "";
        document.getElementById("response").appendChild(registerText);
        registerText.innerHTML = responseText;
        if (responseText == "Nutzer wurde erstellt") {
            // if registration was a sucess, user send to login
            localStorage.setItem("lastmove", "register.html");
            window.location.replace("login.html");
        }
    }
}
//# sourceMappingURL=register.js.map