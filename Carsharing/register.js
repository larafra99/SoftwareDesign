"use strict";
var Carsharing;
(function (Carsharing) {
    let regForm = document.getElementById("regForm");
    let regButton = document.getElementById("register");
    regButton.addEventListener("click", register);
    async function register(_event) {
        let formData = new FormData(regForm);
        console.log(formData);
        let query = new URLSearchParams(formData);
        console.log(query.toString());
        // http:://herokuapp/register.html?user=...&
        let url = "https://softwaredesign.herokuapp.com/register.html";
        //let url: string = "https://localhost:8100/register.html";
        url = url + "?" + query.toString();
        console.log(url);
        let response = await fetch(url);
        let responseText = await response.text();
        //console.log(response);
        console.log(responseText);
        let registerText = document.createElement("p");
        document.getElementById("response").appendChild(registerText);
        registerText.innerHTML = responseText;
        if (responseText == "Nutzer wurde erstellt") {
            //window.location.replace("index.html");
        }
    }
})(Carsharing || (Carsharing = {}));
//# sourceMappingURL=register.js.map