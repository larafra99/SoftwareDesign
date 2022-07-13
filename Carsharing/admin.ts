    import {navibar} from "./function/flexnavi.js";
    localStorage.setItem("lastmove","admin.html");
    navibar();
    

    let carForm: HTMLFormElement = <HTMLFormElement>document.getElementById("addcar");
    let carButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("buttonaddcar");
    carButton.addEventListener("click", addcar);

    async function addcar(_event: Event): Promise<void> {
        let formData: FormData = new FormData(carForm);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);

        let url: string = "https://softwaredesign.herokuapp.com/addcar.html";
        url = url + "?" + query.toString();
        // send request to add car to server
        let response: Response = await fetch(url);
        let responseText: string = await response.text();
        window.alert(responseText);
        
    }
