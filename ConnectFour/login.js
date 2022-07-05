"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let logForm = document.getElementById("logForm");
let logButton = document.getElementById("login");
logButton.addEventListener("click", login);
function login(_event) {
    return __awaiter(this, void 0, void 0, function* () {
        let formData = new FormData(logForm);
        let query = new URLSearchParams(formData);
        // http:://herokuapp/register.html?user=...&
        let url = "https://gisws2021.herokuapp.com/login.html";
        url = url + "?" + query.toString();
        console.log(url);
        let response = yield fetch(url);
        let responseText = yield response.text();
        //console.log(response);
        console.log(responseText);
        let loginText = document.createElement("p");
        document.getElementById("response").appendChild(loginText);
        loginText.innerHTML = responseText;
        if (responseText != "null") {
            sessionStorage.setItem("userId", responseText);
            window.location.replace("verleih.html");
        }
    });
}
//# sourceMappingURL=login.js.map