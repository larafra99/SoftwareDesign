"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.navibar = void 0;
function navibar() {
    console.log("start navibar");
    if (localStorage.getItem("user") != undefined) {
        let logoutbutton = document.createElement("button");
        document.getElementById("logout").appendChild(logoutbutton);
        logoutbutton.innerHTML = "Ausloggen";
        logoutbutton.id = "logoutbutton";
        logoutbutton.addEventListener("click", logout);
        if (localStorage.getItem("user") == "username=admin") {
            let navliadmin = document.createElement("li");
            let adminlink1 = document.createElement("a");
            adminlink1.href = "admin.html";
            adminlink1.innerHTML = "Autos anlegen";
            document.getElementById("navi").appendChild(navliadmin);
            navliadmin.appendChild(adminlink1);
        }
    }
    else {
        let navli1 = document.createElement("li");
        let navli2 = document.createElement("li");
        let link1 = document.createElement("a");
        link1.href = "register.html";
        link1.innerHTML = "Registrieren";
        let link2 = document.createElement("a");
        link2.href = "login.html";
        link2.innerHTML = "Login";
        document.getElementById("navi").appendChild(navli1);
        navli1.appendChild(link1);
        document.getElementById("navi").appendChild(navli2);
        navli2.appendChild(link2);
    }
}
exports.navibar = navibar;
//# sourceMappingURL=flexnavi.js.map