export function navibar(): void{
    console.log("start navibar");
    // if user is logged in
    if (localStorage.getItem("user")!=undefined){
        // create logout button
        let logoutbutton:HTMLElement = document.createElement("button");
        document.getElementById("logout").appendChild(logoutbutton);
        logoutbutton.innerHTML="Ausloggen";
        logoutbutton.id ="logoutbutton";
        logoutbutton.addEventListener("click", logOut);
        // user is an admin
        if(localStorage.getItem("user")=="username=admin"){
            if(localStorage.getItem("lastmove")=="admin.html"){
                // user is on admin.html
                let navliadmin:HTMLElement = document.createElement("li");
                let navli2:HTMLElement = document.createElement("li");
                let adminlink1:HTMLAnchorElement = document.createElement("a");
                let link2:HTMLAnchorElement = document.createElement("a");
                adminlink1.href="index.html";
                adminlink1.innerHTML="Autos aussuchen";
                document.getElementById("navi").appendChild(navliadmin);
                navliadmin.appendChild(adminlink1);
                link2.href="statistic.html";
                link2.innerHTML="Nutzerstatistik";
                document.getElementById("navi").appendChild(navli2);
                navli2.appendChild(link2);
                localStorage.removeItem("lastmove");
            }
            else{
                // admin user gets the option to add cars
                let navliadmin:HTMLElement = document.createElement("li");
                let adminlink1:HTMLAnchorElement = document.createElement("a");
                adminlink1.href="admin.html";
                adminlink1.innerHTML="Autos anlegen";
                document.getElementById("navi").appendChild(navliadmin);
                navliadmin.appendChild(adminlink1);
            }   
        }
        if(localStorage.getItem("lastmove")=="bookcar.html"){
            // user is on bookcar.html
            let navli:HTMLElement = document.createElement("li");
            let navli2:HTMLElement = document.createElement("li");
            let link:HTMLAnchorElement = document.createElement("a");
            let link2:HTMLAnchorElement = document.createElement("a");
            link.href="index.html";
            link.innerHTML="Zurück zur Autoauswahl";
            document.getElementById("navi").appendChild(navli);
            navli.appendChild(link);
            link2.href="statistic.html";
            link2.innerHTML="Nutzerstatistik";
            document.getElementById("navi").appendChild(navli2);
            navli2.appendChild(link2);
            localStorage.removeItem("lastmove");
        }
        else if(localStorage.getItem("lastmove")=="statistic.html"){
            // user is on statistic.html
            let navli:HTMLElement = document.createElement("li");
            let link:HTMLAnchorElement = document.createElement("a");
            link.href="index.html";
            link.innerHTML="Zurück zur Autoauswahl";
            document.getElementById("navi").appendChild(navli);
            navli.appendChild(link);
        }
        else if(localStorage.getItem("lastmove")=="index.html"){
            // user is on index.html
            let navli:HTMLElement = document.createElement("li");
            let link:HTMLAnchorElement = document.createElement("a");
            link.href="statistic.html";
            link.innerHTML="Nutzerstatistik";
            document.getElementById("navi").appendChild(navli);
            navli.appendChild(link);
            localStorage.removeItem("lastmove");
        }
    }
    // if user is not logged in
    else{
        let navli1:HTMLElement = document.createElement("li");
        let navli2:HTMLElement = document.createElement("li");
        let link1:HTMLAnchorElement = document.createElement("a");
        link1.href="register.html";
        link1.innerHTML="Registrieren";
        let link2:HTMLAnchorElement = document.createElement("a");
        link2.href="login.html";
        link2.innerHTML="Login";
        document.getElementById("navi").appendChild(navli1);
        navli1.appendChild(link1);
        document.getElementById("navi").appendChild(navli2);
        navli2.appendChild(link2);
        if(localStorage.getItem("lastmove")=="bookcar.html"){
            let navli:HTMLElement = document.createElement("li");
            let link:HTMLAnchorElement = document.createElement("a");
            link.href="index.html";
            link.innerHTML="Zurück";
            document.getElementById("navi").appendChild(navli);
            navli.appendChild(link);
            localStorage.removeItem("lastmove");
        }
    }
}
// user logs out
async function logOut(_event: Event): Promise<void>{
    localStorage.clear();
    window.location.replace("login.html");
}