import { navibar } from "./function/flexnavi.js";
localStorage.setItem("lastmove", "admin.html");
navibar();
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
    window.alert(responseText);
}
//# sourceMappingURL=admin.js.map