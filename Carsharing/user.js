import { checkregex } from "./function/regex.js";
export class User {
    username;
    password;
    admin;
    constructor(_username, _password, _admin) {
        this.username = _username;
        this.password = _password;
        this.admin = _admin;
    }
    static startregister() {
        let regForm = document.getElementById("regForm");
        let regButton = document.getElementById("register");
        regButton.addEventListener("click", async function () { User.register(event, regForm); });
    }
    static async register(_event, regform) {
        let formData = new FormData(regform);
        let query = new URLSearchParams(formData);
        console.log(checkregex(formData.get("password").toString(), "password") == true);
        if (checkregex(formData.get("username").toString(), "username") == true && checkregex(formData.get("password").toString(), "password") == true) {
            let url = "https://softwaredesign.herokuapp.com/register.html";
            url = url + "?" + query.toString();
            //send registration to serve
            let response = await fetch(url);
            let responseText = await response.text();
            // displays server response
            window.alert(responseText);
            if (responseText == "Nutzer wurde erstellt") {
                // if registration was a sucess, user send to login
                localStorage.setItem("lastmove", "register.html");
                window.location.replace("login.html");
            }
        }
        else {
            console.log(formData.get("username"));
            // displays faild regular expression
            window.alert("Nutzernamen muss mit einem Buchstaben anfangen und darf Zahlen und Unterstriche enthalten und das Password muss 4 bis 8 Zeichen haben");
        }
    }
    static startlogin() {
        let logForm = document.getElementById("logForm");
        let logButton = document.getElementById("login");
        logButton.addEventListener("click", async function () { User.login(event, logForm); });
        if (localStorage.getItem("lastmove") == "register.html") {
            // user just registered 
            window.alert("erfolgreich registriert bitte Login sie sich ein");
        }
    }
    static async login(_event, logForm) {
        let formData = new FormData(logForm);
        let query = new URLSearchParams(formData);
        let url = "https://softwaredesign.herokuapp.com/login.html";
        url = url + "?" + query.toString();
        //server checked login
        let response = await fetch(url);
        let responseText = await response.text();
        if (responseText == "erfolgreich eingeloggt") {
            //sucessfull login
            localStorage.setItem("user", ((query.toString()).split("&").shift()));
            if (localStorage.getItem("lastmove") == "bookcar.html") {
                // takes user back to the car they wanted to book before
                let location = localStorage.getItem("lastmove");
                console.log("port back");
                window.location.replace(location);
            }
            else {
                //next step choose car
                window.location.replace("index.html");
            }
        }
        else {
            //displays response from server if login failed
            window.alert(responseText);
        }
    }
}
;
//# sourceMappingURL=user.js.map