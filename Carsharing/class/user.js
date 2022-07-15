import { checkRegex } from "../function/regex.js";
export class User {
    username;
    password;
    admin;
    id;
    constructor(_username, _password, _admin) {
        this.username = _username;
        this.password = _password;
        this.admin = _admin;
    }
    // started from register.html
    static startRegister() {
        let regform = document.getElementById("regForm");
        let regbutton = document.getElementById("register");
        regbutton.addEventListener("click", async function () { User.register(event, regform); });
    }
    // user wants to register
    static async register(_event, form) {
        let formdata = new FormData(form);
        let query = new URLSearchParams(formdata);
        // check with regular expression
        if (checkRegex(formdata.get("username").toString(), "username") == true && checkRegex(formdata.get("password").toString(), "password") == true) {
            let url = "https://softwaredesign.herokuapp.com/register.html";
            url = url + "?" + query.toString();
            //send registration to serve
            let response = await fetch(url);
            let responsetext = await response.text();
            // displays server response
            window.alert(responsetext);
            if (responsetext == "Nutzer wurde erstellt") {
                // if registration was a sucess, user send to login
                localStorage.setItem("lastmove", "register.html");
                window.location.replace("login.html");
            }
        }
        else {
            // displays faild regular expression
            window.alert("Nutzernamen muss mit einem Buchstaben anfangen und darf Zahlen und Unterstriche enthalten und das Password muss 4 bis 8 Zeichen haben");
        }
    }
    // started with login.html
    static startLogin() {
        let logform = document.getElementById("logForm");
        let logbutton = document.getElementById("login");
        logbutton.addEventListener("click", async function () { User.login(event, logform); });
        if (localStorage.getItem("lastmove") == "register.html") {
            // user just registered 
            window.alert("erfolgreich registriert bitte Login sie sich ein");
        }
    }
    // user wants to login
    static async login(_event, logForm) {
        let formdata = new FormData(logForm);
        let query = new URLSearchParams(formdata);
        let url = "https://softwaredesign.herokuapp.com/login.html";
        url = url + "?" + query.toString();
        //server checked login
        let response = await fetch(url);
        let responsetext = await response.text();
        if (responsetext == "erfolgreich eingeloggt") {
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
            window.alert(responsetext);
        }
    }
}
;
//# sourceMappingURL=user.js.map