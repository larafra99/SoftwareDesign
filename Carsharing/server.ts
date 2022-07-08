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
    interface Car{
        id: string;
        name: string;
        electronic: boolean;
        conventionell: boolean;
        fnut: string;
        lnut: string;
        max: string;
        pnd: string;
        ppmin: string;
    }

    let collection: Mongo.Collection;
    let collectionCars: Mongo.Collection;

    
    let port: number = Number(process.env.PORT); 
    if (!port) {
        port = 8100; 
    }

    //let dataBaseUrl: string = "mongodb://localhost: 27017";
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
        collectionCars =  mongoClient.db("Carsharing").collection("Cars");
        console.log("Database connection user sucessfull ", collection != undefined);
        console.log("Database connection Cars sucessfull ", collectionCars != undefined);
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
                let user: User = {
                    username: parameter.username as string,
                    password: parameter.password as string,
                    status: false
                };
                let result: boolean =  await einloggen(user);
                console.log("Login:", result);
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
            else if(q.pathname =="/addcar.html"){
                console.log("Add Car");

                let car:Car ={
                    id: parameter.carid as string,
                    name: parameter.carname as string,
                    electronic: false,
                    conventionell: false,
                    fnut: parameter.fnut as string,
                    lnut: parameter.snut as string,
                    max: parameter.max as string,
                    pnd: parameter.pnd as string,
                    ppmin: parameter.ppmin as string,
                }
                if (parameter.electric == "on"){
                    console.log("Elektronisches Auto");
                    car.electronic= true;
                }
                if(parameter.electric=="on"){
                    console.log("Konventionelles Auto");
                    car.conventionell= true;
                }
                let resultcar: boolean = await addcar(car);
                if(resultcar){
                    _response.write("Auto wurde angelegt");
                }
                else{
                    _response.write("Felder sind leer oder Datentypen sind nicht korrekt");

                }
                          
            }      
        }
        _response.end();
    }

    async function registerien(_client: User): Promise<boolean> { 
        console.log("versucht zu registrieren");
        console.log("username", _client.username);
    
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

    async function einloggen(_client: User): Promise<boolean> {
        // check if username is found in the collection
        let daten2: any = await collection.findOne({"username": _client.username} );
        //check if a password or a username are entered
        if (!_client.username || !_client.password) {
            //  login without a username or passwort 
            return false;
        }
        else if (daten2 == undefined) {
            // username does not exist
            return false;
        }
        else{
            // if username exists
            if (daten2.password== _client.password){
                // check if its the right password for the username
            return true;
            }
            else{
                // password is wrong
            return false
            }  
        }  
    }
    async function addcar(_car:Car): Promise<boolean>{
        let daten: any = await collectionCars.findOne({"username": _car.id} );
        console.log("Car", daten);
        if (!_car.id || !_car.name || !_car.fnut || !_car.lnut || !_car.max || !_car.pnd || !_car.ppmin) {
            console.log("Daten fehlen")
            //  login without a username or passwort 
            return false;
        }
        else if (daten != undefined) {
            console.log("Auto existiert schon")
            // username does not exist
            return false;
        }
        else{
            await collectionCars.insertOne(_car);
            return true;
             
        }  
        
    }   
}