import { navibar } from "../function/flexnavi.js";
export class Admin {
    static admin() {
        let carForm = document.getElementById("addcar");
        let carButton = document.getElementById("buttonaddcar");
        carButton.addEventListener("click", async function () { Admin.addcar(event, carForm); });
    }
    static async addcar(_event, carForm) {
        let formData = new FormData(carForm);
        let query = new URLSearchParams(formData);
        let url = "https://softwaredesign.herokuapp.com/addcar.html";
        url = url + "?" + query.toString();
        // send request to add car to server
        let response = await fetch(url);
        let responseText = await response.text();
        window.alert(responseText);
    }
}
localStorage.setItem("lastmove", "admin.html");
navibar();
Admin.admin();
//# sourceMappingURL=admin.js.map