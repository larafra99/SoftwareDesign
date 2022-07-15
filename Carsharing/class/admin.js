import { HelpFunktions } from "./function.js";
import { User } from "./user.js";
export class Admin extends User {
    static admin() {
        // get Forminput from admin.html
        let carform = document.getElementById("addcar");
        let carbutton = document.getElementById("buttonaddcar");
        carbutton.addEventListener("click", async function () { Admin.addCar(event, carform); });
    }
    // add car button
    static async addCar(_event, form) {
        let formData = new FormData(form);
        let query = new URLSearchParams(formData);
        let url = "https://softwaredesign.herokuapp.com/addcar.html";
        url = url + "?" + query.toString();
        // send request to add car to server
        let response = await fetch(url);
        let responsetext = await response.text();
        window.alert(responsetext);
    }
}
localStorage.setItem("lastmove", "admin.html");
HelpFunktions.navibar();
Admin.admin();
//# sourceMappingURL=admin.js.map