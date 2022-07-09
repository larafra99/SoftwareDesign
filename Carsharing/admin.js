"use strict";
var Carsharing;
(function (Carsharing) {
    let carForm = document.getElementById("addcar");
    let carButton = document.getElementById("buttonaddcar");
    carButton.addEventListener("click", addcar);
    async function addcar(_event) {
        let formData = new FormData(carForm);
        console.log(formData);
        let query = new URLSearchParams(formData);
        console.log(query.toString());
        // http:://herokuapp/register.html?user=...&
        let url = "https://softwaredesign.herokuapp.com/addcar.html";
        //let url: string = "https://localhost:8100/register.html";
        url = url + "?" + query.toString();
        console.log(url);
        let response = await fetch(url);
        let responseText = await response.text();
        //console.log(response);
        console.log(responseText);
        let registerText = document.createElement("p");
        document.getElementById("response").innerHTML = "";
        document.getElementById("response").appendChild(registerText);
        registerText.innerHTML = responseText;
        if (responseText == "Nutzer wurde erstellt") {
            //window.location.replace("index.html");
        }
    }
})(Carsharing || (Carsharing = {}));
//# sourceMappingURL=admin.js.map