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
        console.log("Database connection user sucessfull ", collection != undefined);
        console.log("Database connection Cars sucessfull ", collectionCars != undefined);
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
                    console.log("Paramter != null");
                    let available = await checktime(parameter.carid, parameter.starttime, parameter.duration);
                    //let time: boolean = await checkavailable();
                    console.log(available);
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
    async function checktime(_carid, _starttime, _duration) {
        console.log("Auto check time");
        console.log("Id", _carid, "Start", _starttime, "Ende", _duration);
        // get Car by id
        let daten4 = await collectionCars.findOne({ "id": _carid });
        console.log(daten4);
        let start = parseInt((daten4.fnut).replace(":", ""));
        let duration = parseInt(daten4.max);
        let wishduration = parseInt(_duration);
        let wishstart = parseInt((_starttime).replace(":", ""));
        let end = parseInt((daten4.lnut).replace(":", ""));
        let wishend = wishduration / 60;
        console.log("enddauer", wishend);
        // let wunschend: number = parseInt((_endtime).replace(":",""));
        if (wishstart < start) {
            return "das Auto ist nicht so früh nutzbar, erst nutzbar ab" + " " + (daten4.fnut).toString();
        }
        else if (wishduration > duration) {
            return "ihre gewünschte Nutzdauer ist zu lange";
        }
        // else if(wunschend>end){
        //     return "das Auto ist so spät nicht nutzbar, nur nutzbar bis"+(daten4.lnut).toString()
        // }
        return "true";
    }
    async function checkavailable() {
        console.log("Auto check time");
        return true;
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