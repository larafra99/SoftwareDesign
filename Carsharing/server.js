"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carsharing = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Carsharing;
(function (Carsharing) {
    let collection;
    let collectionCars;
    let collectionUseTimes;
    let port = Number(process.env.PORT);
    if (!port) {
        port = 8100;
    }
    let dataBaseUrl = "mongodb+srv://SoftwareReader:1234@gisws20-21.a07b1.mongodb.net/Carsharing?retryWrites=true&w=majority";
    console.log("Starting server");
    //starting server and connection to database
    startServer(port);
    connectToDatabase(dataBaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("starting server requests");
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);
    }
    async function connectToDatabase(_url) {
        //let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        // let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        let mongoClient = new Mongo.MongoClient(_url);
        await mongoClient.connect();
        collection = mongoClient.db("Carsharing").collection("User");
        collectionCars = mongoClient.db("Carsharing").collection("Cars");
        collectionUseTimes = mongoClient.db("Carsharing").collection("Dates");
        console.log("Database connection user sucessfull ", collection != undefined);
        console.log("Database connection Cars sucessfull ", collectionCars != undefined);
        console.log("Database connection Dates sucessfull ", collectionUseTimes != undefined);
    }
    function handleListen() {
        console.log("listening");
    }
    async function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let q = Url.parse(_request.url, true);
            console.log("q", q);
            let parameter = q.query;
            console.log("parameter", parameter);
            if (q.pathname == "/login.html") {
                console.log("einloggen");
                let user = {
                    username: parameter.username,
                    password: parameter.password,
                    status: false
                };
                let result = await einloggen(user);
                console.log("Login:", result);
                if (result) {
                    _response.write("erfolgreich eingeloggt");
                }
                else {
                    _response.write("Überprüfen Sie Benutzernamen oder das Passwort");
                }
            }
            else if (q.pathname == "/register.html") {
                console.log("registieren");
                let users = {
                    username: parameter.username,
                    password: parameter.password,
                    status: false
                };
                let resultreg = await registerien(users);
                if (resultreg) {
                    _response.write("Nutzer wurde erstellt");
                    users.status = true;
                }
                else {
                    _response.write("username ist schon vergeben oder Felder sind leer");
                }
            }
            else if (q.pathname == "/addcar.html") {
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
                    console.log("Elektronisches Auto");
                    car.electronic = true;
                }
                if (parameter.conventionell == "on") {
                    console.log("Konventionelles Auto");
                    car.conventionell = true;
                }
                let resultcar = await addcar(car);
                if (resultcar) {
                    _response.write("Auto wurde angelegt");
                }
                else {
                    _response.write("Felder sind leer oder Datentypen sind nicht korrekt oder Auto Id existiert schon");
                }
            }
            else if (q.pathname == "/index.html") {
                console.log("get Data");
                let listCars = await showData();
                _response.write(JSON.stringify(listCars));
            }
            else if (q.pathname == "/bookcars.html") {
                console.log("book car");
                let car = await bookCar(parameter.dataID);
                _response.write(JSON.stringify(car));
            }
            else if (q.pathname == "/checktime.html") {
                console.log("check if car is available");
                if (parameter.booktime != "" && parameter.starttime != "" && parameter.duration != "") {
                    let duration = parseInt(parameter.duration);
                    let start = parseInt(parameter.starttime.replace(":", ""));
                    let end = Math.floor(duration / 60) * 100 + duration % 60 + start;
                    let usetime = {
                        carid: parameter.carid,
                        date: parameter.booktime,
                        starttime: parameter.starttime,
                        endtime: end.toString(),
                        user: parameter.username,
                    };
                    let available = await checktime(usetime, duration);
                    if (available != "true") {
                        _response.write(available);
                    }
                    else {
                        console.log("check if car is booked");
                        let time = await checkavailable(usetime);
                        console.log(time);
                    }
                }
                else {
                    // time field empty
                    _response.write("bitte füllen Sie alle Felder aus");
                }
            }
            // else if(q.pathname=="/logincheck.html"){
            //     console.log("check if user is logged in");
            //     let status: boolean = await checkuser(parameter.username as string);
            //     console.log(status);
            // }
        }
        _response.end();
    }
    async function registerien(_client) {
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
    async function einloggen(_client) {
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
                return true;
            }
            else {
                // password is wrong
                return false;
            }
        }
    }
    async function addcar(_car) {
        let daten = await collectionCars.findOne({ "id": _car.id });
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
            await collectionCars.insertOne(_car);
            // add car to database
            return true;
        }
    }
    async function showData() {
        // get all Cars in an array
        let data = await collectionCars.find().toArray();
        return data;
    }
    async function bookCar(_carid) {
        console.log("Auto buchen");
        // get Car by id
        let daten3 = await collectionCars.findOne({ "id": _carid });
        return daten3;
    }
    async function checktime(_time, _duration) {
        console.log("Auto check time");
        // get Car by id
        let daten4 = await collectionCars.findOne({ "id": _time.carid });
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
    async function checkavailable(_usetime) {
        console.log("Auto check time");
        let data5 = await collectionUseTimes.find({ "carid": _usetime.carid }).toArray();
        let wishend = parseInt(_usetime.endtime);
        let wishstart = parseInt((_usetime.starttime).replace(":", ""));
        console.log("DataArray", data5);
        console.log("Data", data5[0]);
        if (data5[0] != undefined) {
            console.log("Auto existiert schon");
            // carid exist in database
            for (let i = 0; i <= data5.length; i++) {
                if (data5[i].date == _usetime.date) {
                    console.log("Date is the same");
                    let start = parseInt((data5[i].starttime).replace(":", ""));
                    let end = parseInt((data5[i].endtime).replace(":", ""));
                    console.log("starttime", start);
                    console.log("endtime", end);
                    console.log("InterfaceStarttime", wishstart);
                    console.log("InterfaceEndtime", wishend);
                    if (start <= wishstart && wishstart <= end) {
                        console.log("starttime is in between");
                        return false;
                    }
                }
            }
            // await collectionUseTimes.insertOne(_usetime);
            console.log("auto eingefügt");
            //add car to database because date for car does not exist in database
            return false;
        }
        else {
            await collectionUseTimes.insertOne(_usetime);
            console.log("auto eingefügt");
            // add car to database because carid does not exist in database
            return true;
        }
    }
    // async function checkuser(_checkuser: string):Promise<boolean> {
    //     console.log("User",_checkuser);
    //     let daten4: any = await collection.findOne({"username": _checkuser} );
    //     console.log(daten4);
    //     if (daten4.status == "true"){
    //         console.log("eingeloogt");
    //     }
    //     return true;
    // }
})(Carsharing = exports.Carsharing || (exports.Carsharing = {}));
//# sourceMappingURL=server.js.map