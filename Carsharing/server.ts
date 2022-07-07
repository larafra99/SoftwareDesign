import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";
import { ParsedUrlQuery } from "querystring";


export namespace Carsharing {
    
    interface User {
        //id: string;
        username: string;
        password: string;
        status: boolean;   
    }

    let collection: Mongo.Collection;
    let collectionData: Mongo.Collection;

    
    let port: number = Number(process.env.PORT); 
    if (!port) {
        port = 8100; 
    }

    //let dataBaseUrl: string = "mongodb://localhost: 27017";
    //let dataBaseUrl: string = "mongodb+srv://Reader:Database123@gisws20-21.a07b1.mongodb.net/ASTA?retryWrites=true&w=majority";
    //let dataBaseUrl: string = "mongodb+srv://SoftwareReader:1234@gisws20-21.a07b1.mongodb.net/?retryWrites=true&w=majority";
    let dataBaseUrl: string = "mongodb+srv://SoftwareReader:1234@gisws20-21.a07b1.mongodb.net/Carsharing?retryWrites=true&w=majority";
    console.log("Starting server");

    //Aufruf der Funktionen
    startServer(port);
    connectToDatabase(dataBaseUrl);

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer();
        console.log("starting server requests") 
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen); 
        server.listen(_port); 
    }

    async function connectToDatabase(_url: string): Promise<void> {
        //let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        // let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url);
        await mongoClient.connect();
        collection = mongoClient.db("Carsharing").collection("User");
        collectionData =  mongoClient.db("Carsharing").collection("Cars");
        console.log("Database connection user sucessfull ", collection != undefined);
        console.log("Database connection Cars sucessfull ", collectionData != undefined);
    }

    function handleListen(): void {
        console.log("listening"); 
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("I hear voices!"); 
        _response.setHeader("content-type", "text/html; charset=utf-8"); 
        _response.setHeader("Access-Control-Allow-Origin", "*"); 

        if (_request.url) {
            let q: Url.UrlWithParsedQuery = Url.parse(_request.url, true);  
            console.log("q", q);
            let parameter: ParsedUrlQuery = q.query;
            console.log("parameter", parameter);

            if (q.pathname == "/login.html") {
                console.log("einloggen");
                let result: boolean =  await einloggen(parameter.username as string , parameter.password as string);
                console.log("Login:", result);
                _response.write(JSON.stringify(result));
            }

            else if (q.pathname == "/register.html") {
                console.log("registieren");

                let users: User = {
                    username: parameter.username as string,
                    password: parameter.password as string,
                    status: false
                };

                //console.log(users);
                let resultreg: boolean = await registerien(users);
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

    async function registerien(_client: User): Promise<boolean> { 
        console.log("versucht zu registrieren");
        console.log("username", _client.username);
        // if (!_client.username){
        //     x=1;
        // }
        let searchname: any = await collection.findOne({"username": _client.username});    

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

    async function einloggen(_username: string, _password: string): Promise<boolean> {
        
        if (!_username || !_password) {
            return false;
        }
        else{
            let daten2: any = await collection.findOne({"username": _username}, {projection: { username: 0, password: 0, id:0}} );
            console.log(daten2);
            return true;

        }
        
    }  
    
}