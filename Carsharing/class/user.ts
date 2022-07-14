import {checkregex} from "../function/regex.js";

export class User{
    username: string;
    password: string;
    admin: boolean;
    
    constructor(_username:string,_password:string,_admin:boolean){
        this.username=_username;
        this.password=_password;
        this.admin=_admin;
    }
    static startregister(){
        let regForm: HTMLFormElement = <HTMLFormElement>document.getElementById("regForm");
        let regButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("register");
        regButton.addEventListener("click", async function (): Promise<void> {User.register(event,regForm)});
    }

    static async register(_event: Event, regform: HTMLFormElement): Promise<void> {
        let formData: FormData = new FormData(regform);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
         console.log(checkregex(formData.get("password").toString(),"password")== true );
        if(checkregex(formData.get("username").toString(),"username")== true &&checkregex(formData.get("password").toString(),"password")== true ){
            let url: string = "https://softwaredesign.herokuapp.com/register.html";
            url = url + "?" + query.toString();
            //send registration to serve
            let response: Response = await fetch(url);
            let responseText: string = await response.text();
            // displays server response
            window.alert(responseText);
            if (responseText == "Nutzer wurde erstellt") {
                // if registration was a sucess, user send to login
                localStorage.setItem("lastmove","register.html");
                window.location.replace("login.html");
            }  
        }
    
        else{
            console.log(formData.get("username"));
            // displays faild regular expression
            window.alert("Nutzernamen muss mit einem Buchstaben anfangen und darf Zahlen und Unterstriche enthalten und das Password muss 4 bis 8 Zeichen haben");
        }   
    }
    static startlogin(){
        let logForm: HTMLFormElement = <HTMLFormElement>document.getElementById("logForm");
        let logButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("login");
        logButton.addEventListener("click", async function (): Promise<void> {User.login(event,logForm)});
        if(localStorage.getItem("lastmove")=="register.html"){
            // user just registered 
            window.alert("erfolgreich registriert bitte Login sie sich ein")
        }
    }

    static async login(_event: Event,logForm: HTMLFormElement): Promise<void> {
        let formData: FormData = new FormData(logForm);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);

        let url: string = "https://softwaredesign.herokuapp.com/login.html";
        url = url + "?" + query.toString();
        //server checked login
        let response: Response = await fetch(url);
        let responseText: string = await response.text();
        if (responseText == "erfolgreich eingeloggt") {
            //sucessfull login
            localStorage.setItem("user", ((query.toString()).split("&").shift()));
            
            if(localStorage.getItem("lastmove")=="bookcar.html"){
                // takes user back to the car they wanted to book before
                let location: string= localStorage.getItem("lastmove");
                console.log("port back");
                window.location.replace(location);
            }
            else{
                //next step choose car
                window.location.replace("index.html");
            }
        }
        else{
            //displays response from server if login failed
            window.alert(responseText)
        }
    }    
};