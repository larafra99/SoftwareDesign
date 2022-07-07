"use strict";
let logForm = document.getElementById("logForm");
let logButton = document.getElementById("login");
logButton.addEventListener("click", login);
async function login(_event) {
    let formData = new FormData(logForm);
    let query = new URLSearchParams(formData);
    // http:://herokuapp/register.html?user=...&
    let url = "https://softwaredesign.herokuapp.com/login.html";
    url = url + "?" + query.toString();
    console.log(url);
    let response = await fetch(url);
    let responseText = await response.text();
    //console.log(response);
    console.log(responseText);
    let loginText = document.createElement("p");
    document.getElementById("response").appendChild(loginText);
    loginText.innerHTML = responseText;
    if (responseText != "null") {
        sessionStorage.setItem("userId", responseText);
        //window.location.replace("verleih.html");
    }
}
//# sourceMappingURL=login.js.map