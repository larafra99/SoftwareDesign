"use strict";
let carForm = document.getElementById("addcar");
let carButton = document.getElementById("buttonaddcar");
carButton.addEventListener("click", addcar);
async function addcar(_event) {
    let formData = new FormData(carForm);
    let query = new URLSearchParams(formData);
    let url = "https://softwaredesign.herokuapp.com/addcar.html";
    url = url + "?" + query.toString();
    // send request to add car to server
    let response = await fetch(url);
    let responseText = await response.text();
    let registerText = document.createElement("p");
    document.getElementById("response").innerHTML = "";
    document.getElementById("response").appendChild(registerText);
    registerText.innerHTML = responseText;
}
//# sourceMappingURL=admin.js.map