"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carsharing = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Carsharing;
(function (Carsharing) {
    let collection;
    let collectionData;
    let port = Number(process.env.PORT);
    if (!port) {
        port = 8100;
    }
    //let dataBaseUrl: string = "mongodb://localhost: 27017";
    //let dataBaseUrl: string = "mongodb+srv://Reader:Database123@gisws20-21.a07b1.mongodb.net/ASTA?retryWrites=true&w=majority";
    //let dataBaseUrl: string = "mongodb+srv://SoftwareReader:1234@gisws20-21.a07b1.mongodb.net/?retryWrites=true&w=majority";
    let dataBaseUrl = "mongodb+srv://SoftwareReader:1234@gisws20-21.a07b1.mongodb.net/Carsharing?retryWrites=true&w=majority";
    console.log("Starting server");
    //Aufruf der Funktionen
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
        collectionData = mongoClient.db("Carsharing").collection("Cars");
        console.log("Database connection user sucessfull ", collection != undefined);
        console.log("Database connection Cars sucessfull ", collectionData != undefined);
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
                _response.write(JSON.stringify(result));
                if (result) {
                    _response.write("erfolgreich eingeloggt");
                    user.status = true;
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
                //console.log(users);
                let resultreg = await registerien(users);
                if (resultreg) {
                    _response.write("Nutzer wurde erstellt");
                    users.status = true;
                }
                else {
                    _response.write("username ist schon vergeben oder Felder sind leer");
                }
            }
        }
        _response.end();
    }
    async function registerien(_client) {
        console.log("versucht zu registrieren");
        console.log("username", _client.username);
        // if (!_client.username){
        //     x=1;
        // }
        let searchname = await collection.findOne({ "username": _client.username });
        if (!_client.username || !_client.password) {
            return false;
        }
        else if (searchname != undefined) {
            return false;
        }
        else {
            await collection.insertOne(_client);
            console.log("registrieren erfolgreich");
            return true;
        }
    }
    async function einloggen(_client) {
        //check if a password or a username are entered
        if (!_client.username || !_client.password) {
            //  login without a username or passwort 
            return false;
        }
        else {
            // check if username is found in the collection
            let daten2 = await collection.findOne({ "username": _client.username });
            console.log("PAssswort", daten2.password);
            if (daten2.password == _client.password) {
                // check if its the right passwort for the username
                console.log("PAssswort", daten2.password);
                return true;
            }
            else {
                // passwort is wrong
                return false;
            }
        }
    }
})(Carsharing = exports.Carsharing || (exports.Carsharing = {}));
//# sourceMappingURL=server.js.map