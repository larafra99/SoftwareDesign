namespace Carsharing{


    let carForm: HTMLFormElement = <HTMLFormElement>document.getElementById("addcar");
    let carButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("buttonaddcar");
    carButton.addEventListener("click", addcar);


    async function addcar(_event: Event): Promise<void> {
        let formData: FormData = new FormData(carForm);
        console.log(formData);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        console.log(query.toString());

        // http:://herokuapp/register.html?user=...&
        let url: string = "https://softwaredesign.herokuapp.com/addcar.html";
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
            //window.location.replace("index.html");
        }
    }
}