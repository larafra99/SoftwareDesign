import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";
export var Carsharing;
(function (Carsharing) {
    //define collections
    let collection;
    let collectioncars;
    let collectionusetimes;
    // get server port 
    let port = Number(process.env.PORT);
    if (!port) {
        port = 8100;
    }
    // acess to database
    let databaseurl = "mongodb+srv://SoftwareReader:1234@gisws20-21.a07b1.mongodb.net/Carsharing?retryWrites=true&w=majority";
    console.log("Starting server");
    //starting server and connection to database
    startServer(port);
    connectToDatabase(databaseurl);
    // start server
    function startServer(_port) {
        let server = Http.createServer();
        console.log("starting server requests");
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);
    }
    // connect to databse and collections
    async function connectToDatabase(_url) {
        let mongoclient = new Mongo.MongoClient(_url);
        await mongoclient.connect();
        collection = mongoclient.db("Carsharing").collection("User");
        collectioncars = mongoclient.db("Carsharing").collection("Cars");
        collectionusetimes = mongoclient.db("Carsharing").collection("Dates");
        console.log("Database connection user sucessfull ", collection != undefined);
        console.log("Database connection Cars sucessfull ", collectioncars != undefined);
        console.log("Database connection Dates sucessfull ", collectionusetimes != undefined);
    }
    // listen for incoming requests
    function handleListen() {
        console.log("listening");
    }
    // handle incoming requests
    async function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            // get request url
            let q = Url.parse(_request.url, true);
            console.log("q", q);
            // get request parameter
            let parameter = q.query;
            console.log("parameter", parameter);
            if (q.pathname == "/login.html") {
                // check if login is correct
                console.log("logIn");
                let user = {
                    username: parameter.username,
                    password: parameter.password,
                    admin: false,
                };
                let result = await logIn(user);
                console.log("Login:", result);
                if (result) {
                    _response.write("erfolgreich eingeloggt");
                }
                else {
                    _response.write("Überprüfen Sie Benutzernamen oder das Passwort");
                }
            }
            else if (q.pathname == "/register.html") {
                // check if username is already taken
                console.log("registieren");
                let users = {
                    username: parameter.username,
                    password: parameter.password,
                    admin: false,
                };
                let resultreg = await register(users);
                if (resultreg) {
                    _response.write("Nutzer wurde erstellt");
                }
                else {
                    _response.write("username ist schon vergeben oder Felder sind leer");
                }
            }
            else if (q.pathname == "/addcar.html") {
                // add car to collection
                console.log("Add Car");
                let car = {
                    id: parameter.carid,
                    name: parameter.carname,
                    electronic: false,
                    conventionell: false,
                    fnut: parameter.fnut,
                    lnut: parameter.snut,
                    max: parameter.max,
                    pnd: parameter.pnd,
                    ppmin: parameter.ppmin,
                };
                if (parameter.electric == "on") {
                    car.electronic = true;
                }
                if (parameter.conventionell == "on") {
                    car.conventionell = true;
                }
                let resultcar = await addCar(car);
                if (resultcar) {
                    _response.write("Auto wurde angelegt");
                }
                else {
                    _response.write("Felder sind leer oder Datentypen sind nicht korrekt oder Auto Id existiert schon");
                }
            }
            else if (q.pathname == "/index.html") {
                // get cars based on filter used
                console.log("get Data");
                if (parameter.filter == "a") {
                    console.log("get all cars");
                    // get all cars
                    let listCars = await showData();
                    _response.write(JSON.stringify(listCars));
                }
                else if (parameter.filter == "b") {
                    // get cars based on chossen engine
                    if (parameter.electro == undefined && parameter.conventionell == undefined) {
                        //if no boxed is checked
                        console.log("no box checked");
                        _response.write("Bitte füllen sie mindestens eine Box");
                    }
                    else {
                        console.log("filter car types");
                        let listCars = await filterCar(parameter.electro, parameter.conventionell);
                        _response.write(JSON.stringify(listCars));
                    }
                }
                else {
                    // get cars that are available at choosen time
                    if (parameter.date == '' || parameter.time == '' || parameter.duration == '') {
                        // fields are empty
                        console.log("fields empty");
                        _response.write("Bitte füllen sie mindestens eine Box");
                    }
                    else {
                        console.log("filter time");
                        let duration = parseInt(parameter.duration);
                        let start = parseInt(parameter.time.replace(":", ""));
                        let end = Math.floor(duration / 60) * 100 + duration % 60 + start;
                        let listCars = await filterTimeCar(parameter.date, start.toString(), end.toString(), duration);
                        //TODO listcar.length = 0;kein Auto verfügbar
                        _response.write(JSON.stringify(listCars));
                    }
                }
            }
            else if (q.pathname == "/bookcars.html") {
                // get car information
                console.log("book car");
                let car = await findCar(parameter.dataID);
                _response.write(JSON.stringify(car));
            }
            else if (q.pathname == "/booktime.html") {
                // check if car is available at wished time
                console.log("book that car");
                let duration = parseInt(parameter.duration);
                let start = parseInt(parameter.time.replace(":", ""));
                let end = Math.floor(duration / 60) * 100 + duration % 60 + start;
                let bookcar = {
                    carid: parameter.carid,
                    date: parameter.date,
                    starttime: start.toString(),
                    endtime: end.toString(),
                    user: parameter.username,
                    price: parameter.price,
                };
                let available = await checkTime(bookcar, duration);
                if (available != "true") {
                    _response.write(available);
                }
                else {
                    console.log("check if car is booked");
                    let time = await checkAvailable(bookcar);
                    if (time != true) {
                        _response.write("Car is already booked");
                    }
                    else {
                        _response.write("Auto erfolgreich gebucht");
                    }
                }
            }
            else if (q.pathname == "/getstatistc.html") {
                // get user statistic
                console.log("get Statistic");
                let stat = await statistic(parameter.username);
                _response.write(JSON.stringify(stat));
            }
        }
        _response.end();
    }
    async function register(_client) {
        console.log("versucht zu registrieren");
        // trying to find username in the database
        let searchname = await collection.findOne({ "username": _client.username });
        if (!_client.username || !_client.password) {
            // username or password field are not filled out
            return false;
        }
        else if (searchname != undefined) {
            // username is already taken
            return false;
        }
        else {
            // insert username into database
            await collection.insertOne(_client);
            console.log("registrieren erfolgreich");
            return true;
        }
    }
    async function logIn(_client) {
        // check if username is found in the collection
        let daten2 = await collection.findOne({ "username": _client.username });
        //check if a password or a username are entered
        if (!_client.username || !_client.password) {
            //  login without a username or passwort 
            return false;
        }
        else if (daten2 == undefined) {
            // username does not exist
            return false;
        }
        else {
            // if username exists
            if (daten2.password == _client.password) {
                // right password for the username
                await collection.updateOne({ "username": _client.username }, { $set: { "status": "true" } });
                if (_client.username == "admin") {
                    await collection.updateOne({ "username": _client.username }, { $set: { "admin": "true" } });
                }
                return true;
            }
            else {
                // password is wrong
                return false;
            }
        }
    }
    async function addCar(_car) {
        // add car to collection
        // check if car id is already taken
        let daten = await collectioncars.findOne({ "id": _car.id });
        if (!_car.id || !_car.name || !_car.fnut || !_car.lnut || !_car.max || !_car.pnd || !_car.ppmin) {
            console.log("Daten fehlen");
            //  trying to add car with empty fields
            return false;
        }
        if (_car.conventionell == false && _car.electronic == false) {
            console.log("Antriebsart fehlt");
            // type car engine is missing
            return false;
        }
        else if (daten != undefined) {
            console.log("Auto existiert schon");
            // carid exists
            return false;
        }
        else {
            await collectioncars.insertOne(_car);
            // add car to database
            return true;
        }
    }
    async function showData() {
        // get all Cars in an array
        let data = await collectioncars.find().toArray();
        return data;
    }
    async function filterCar(_electro, _conven) {
        if (_electro == "on" && _conven == undefined) {
            // if electro engine is wished
            console.log("electro car");
            let data = await collectioncars.find({ "conventionell": false }).toArray();
            return data;
        }
        else if (_conven == "on" && _electro == undefined) {
            // if conventinell engine is wished
            console.log("benzin car");
            let data = await collectioncars.find({ "electronic": false }).toArray();
            return data;
        }
        else {
            console.log("hybrid car");
            // hybrid car is wished
            let data = await collectioncars.find({ "electronic": true, "conventionell": true }).toArray();
            return data;
        }
    }
    async function filterTimeCar(_date, _start, _end, _duration) {
        //filter all available cars
        let wishstart = parseInt(_start);
        let wishend = parseInt(_end);
        let data = await collectioncars.find().toArray();
        let potentialcar = [];
        let carsavailable = [];
        let finalcars = [];
        for (let i = 0; i < data.length; i++) {
            // check if standart parameter fit
            let start = parseInt((data[i].fnut).replace(":", ""));
            let end = parseInt((data[i].lnut).replace(":", ""));
            if (wishstart < start) {
                //start is too early
            }
            else if (_duration > parseInt(data[i].max)) {
                // duration is too long
            }
            else if (wishend > end) {
                // end is too late
            }
            else {
                // standart parameter fits
                potentialcar.push(data[i].id);
            }
        }
        if (potentialcar.length == 0) {
            // no cars available
        }
        else {
            for (let x = 0; x < potentialcar.length; x++) {
                // check the cars that fit with standard parameter if they are booked
                let time = {
                    carid: potentialcar[x],
                    date: _date,
                    starttime: _start,
                    endtime: _end,
                    user: null,
                    price: null,
                };
                let checkcaravailable = await checkAvailable(time);
                if (checkcaravailable == true) {
                    carsavailable.push(potentialcar[x]);
                }
            }
        }
        // get all cars, that fit and are not booked, general information 
        for (let y = 0; y < carsavailable.length; y++) {
            let daten5 = await findCar(carsavailable[y]);
            finalcars.push(daten5);
        }
        return finalcars;
    }
    async function findCar(_carid) {
        console.log("Auto buchen");
        // get Car by id
        let daten3 = await collectioncars.findOne({ "id": _carid });
        return daten3;
    }
    async function checkTime(_time, _duration) {
        console.log("Auto check time");
        // get Car by id
        let daten4 = await collectioncars.findOne({ "id": _time.carid });
        // transfer string to integer for comparision
        let start = parseInt((daten4.fnut).replace(":", ""));
        let wishstart = parseInt((_time.starttime).replace(":", ""));
        let end = parseInt((daten4.lnut).replace(":", ""));
        if (wishstart < start) {
            //start is too early
            return "das Auto ist nicht so früh nutzbar, erst nutzbar ab " + (daten4.fnut).toString();
        }
        else if (_duration > parseInt(daten4.max)) {
            // duration is too long
            return "ihre gewünschte Nutzdauer ist zu lange";
        }
        else if (parseInt(_time.endtime) > end) {
            // end is too late
            return "das Auto ist so spät nicht nutzbar, nur nutzbar bis " + (daten4.lnut).toString() + "Uhr";
        }
        else {
            // standart parameter fits
            return "true";
        }
    }
    async function checkAvailable(_usetime) {
        console.log("Auto check time");
        // search for the carid
        let data5 = await collectionusetimes.find({ "carid": _usetime.carid }).toArray();
        let wishend = parseInt(_usetime.endtime);
        let wishstart = parseInt((_usetime.starttime));
        // if array is empty car id is not in database
        if (data5[0] != undefined) {
            console.log("Auto existiert schon");
            // carid exist in database
            for (let i = 0; i < data5.length; i++) {
                if (data5[i].date == _usetime.date) {
                    // date is the same as the wished one
                    console.log("Date is the same");
                    let start = parseInt((data5[i].starttime).replace(":", ""));
                    let end = parseInt((data5[i].endtime).replace(":", ""));
                    if (start <= wishstart && wishstart <= end) {
                        console.log("starttime is in between");
                        return false;
                    }
                    else if (start <= wishend && wishend <= end) {
                        console.log("endtime is in between");
                        return false;
                    }
                    else if (wishstart < start && wishend > end) {
                        console.log("time is crossing");
                        return false;
                    }
                }
            }
            if (_usetime.user != null) {
                // user is logged in book car for user
                await collectionusetimes.insertOne(_usetime);
            }
            console.log("auto eingefügt");
            //add car to database because date for car does not exist in database
            return true;
        }
        else {
            if (_usetime.user != null) {
                await collectionusetimes.insertOne(_usetime);
            }
            console.log("auto existiert noch nicht");
            // add car to database because carid does not exist in database
            return true;
        }
    }
    async function statistic(_user) {
        // get userstatistic
        console.log("find statistic");
        // get Car by id
        let daten = await collectionusetimes.find({ "user": _user }).toArray();
        ;
        return daten;
    }
})(Carsharing || (Carsharing = {}));
//# sourceMappingURL=server.js.map