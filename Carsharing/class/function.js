export class HelpFunktions {
    static navibar() {
        console.log("start navibar");
        // if user is logged in
        if (localStorage.getItem("user") != undefined) {
            // create logout button
            let logoutbutton = document.createElement("button");
            document.getElementById("logout").appendChild(logoutbutton);
            logoutbutton.innerHTML = "Ausloggen";
            logoutbutton.id = "logoutbutton";
            logoutbutton.addEventListener("click", HelpFunktions.logOut);
            // user is an admin
            if (localStorage.getItem("user") == "username=admin") {
                if (localStorage.getItem("lastmove") == "admin.html") {
                    // user is on admin.html
                    let navliadmin = document.createElement("li");
                    let navli2 = document.createElement("li");
                    let adminlink1 = document.createElement("a");
                    let link2 = document.createElement("a");
                    adminlink1.href = "index.html";
                    adminlink1.innerHTML = "Autos aussuchen";
                    document.getElementById("navi").appendChild(navliadmin);
                    navliadmin.appendChild(adminlink1);
                    link2.href = "statistic.html";
                    link2.innerHTML = "Nutzerstatistik";
                    document.getElementById("navi").appendChild(navli2);
                    navli2.appendChild(link2);
                    localStorage.removeItem("lastmove");
                }
                else {
                    // admin user gets the option to add cars
                    let navliadmin = document.createElement("li");
                    let adminlink1 = document.createElement("a");
                    adminlink1.href = "admin.html";
                    adminlink1.innerHTML = "Autos anlegen";
                    document.getElementById("navi").appendChild(navliadmin);
                    navliadmin.appendChild(adminlink1);
                }
            }
            if (localStorage.getItem("lastmove") == "bookcar.html") {
                // user is on bookcar.html
                let navli = document.createElement("li");
                let navli2 = document.createElement("li");
                let link = document.createElement("a");
                let link2 = document.createElement("a");
                link.href = "index.html";
                link.innerHTML = "Zurück zur Autoauswahl";
                document.getElementById("navi").appendChild(navli);
                navli.appendChild(link);
                link2.href = "statistic.html";
                link2.innerHTML = "Nutzerstatistik";
                document.getElementById("navi").appendChild(navli2);
                navli2.appendChild(link2);
                localStorage.removeItem("lastmove");
            }
            else if (localStorage.getItem("lastmove") == "statistic.html") {
                // user is on statistic.html
                let navli = document.createElement("li");
                let link = document.createElement("a");
                link.href = "index.html";
                link.innerHTML = "Zurück zur Autoauswahl";
                document.getElementById("navi").appendChild(navli);
                navli.appendChild(link);
            }
            else if (localStorage.getItem("lastmove") == "index.html") {
                // user is on index.html
                let navli = document.createElement("li");
                let link = document.createElement("a");
                link.href = "statistic.html";
                link.innerHTML = "Nutzerstatistik";
                document.getElementById("navi").appendChild(navli);
                navli.appendChild(link);
                localStorage.removeItem("lastmove");
            }
        }
        // if user is not logged in
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
            if (localStorage.getItem("lastmove") == "bookcar.html") {
                let navli = document.createElement("li");
                let link = document.createElement("a");
                link.href = "index.html";
                link.innerHTML = "Zurück";
                document.getElementById("navi").appendChild(navli);
                navli.appendChild(link);
                localStorage.removeItem("lastmove");
            }
        }
    }
    // user logs out
    static async logOut(_event) {
        localStorage.clear();
        window.location.replace("login.html");
    }
    static checkFormData(formData, length) {
        // checks if form is filled out
        let formfilled = 0;
        for (const entry of formData.values()) {
            if (entry != "") {
                formfilled++;
            }
        }
        if (formfilled == length) {
            return true;
        }
        return false;
    }
    static checkRegex(checkString, checkFor) {
        //check if username is valid
        if (checkFor == "username") {
            // ^ muss immer am beginn sein
            // () Der Ausdruck innerhalb der Klammer wird zu einem Element zusammen gefasst
            const regexuser = /^[A-Za-z0-9_]/;
            if (regexuser.test(checkString) == true) {
                return true;
            }
            ;
        }
        // check if password is valid
        if (checkFor == "password") {
            // ^ muss immer am beginn sein
            // () Der Ausdruck innerhalb der Klammer wird zu einem Element zusammen gefasst
            // {1,3} 	minimale und maximale Anzahl des vorangegangenen Elements.
            const regexpassword = /^.{4,19}$/;
            if (regexpassword.test(checkString) == true) {
                return true;
            }
            ;
        }
        return false;
    }
}
//# sourceMappingURL=function.js.map