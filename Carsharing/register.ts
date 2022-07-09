namespace Carsharing{


    let regForm: HTMLFormElement = <HTMLFormElement>document.getElementById("regForm");
    let regButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("register");
    regButton.addEventListener("click", register);


    async function register(_event: Event): Promise<void> {
        let formData: FormData = new FormData(regForm);
        console.log(formData);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        console.log(query.toString());

        // http:://herokuapp/register.html?user=...&
        let url: string = "https://softwaredesign.herokuapp.com/register.html";
        //let url: string = "https://localhost:8100/register.html";

        url = url + "?" + query.toString();
        console.log(url);
        let response: Response = await fetch(url);
        let responseText: string = await response.text();
        //console.log(response);
        console.log(responseText);

        let registerText: HTMLElement = document.createElement("p");
        document.getElementById("response").innerHTML="";
        document.getElementById("response").appendChild(registerText);
        registerText.innerHTML = responseText;
        if (responseText == "Nutzer wurde erstellt") {
            window.location.replace("login.html");
        }
    }
}