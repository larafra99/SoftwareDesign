import { User } from "./user.js";
User.startlogin();
// let logForm: HTMLFormElement = <HTMLFormElement>document.getElementById("logForm");
// let logButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("login");
// logButton.addEventListener("click", login);
// if(localStorage.getItem("lastmove")=="register.html"){
//     // user just registered 
//     window.alert("erfolgreich registriert bitte Login sie sich ein")
// }
// async function login(_event: Event): Promise<void> {
//     let formData: FormData = new FormData(logForm);
//     let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
//     let url: string = "https://softwaredesign.herokuapp.com/login.html";
//     url = url + "?" + query.toString();
//     //server checked login
//     let response: Response = await fetch(url);
//     let responseText: string = await response.text();
//     if (responseText == "erfolgreich eingeloggt") {
//         //sucessfull login
//         localStorage.setItem("user", ((query.toString()).split("&").shift()));
//         if(localStorage.getItem("lastmove")=="bookcar.html"){
//             // takes user back to the car they wanted to book before
//             let location: string= localStorage.getItem("lastmove");
//             console.log("port back");
//             window.location.replace(location);
//         }
//         else{
//             //next step choose car
//             window.location.replace("index.html");
//         }
//     }
//     else{
//         //displays response from server if login failed
//         window.alert(responseText)
//     }
// }
//# sourceMappingURL=login.js.map