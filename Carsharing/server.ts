import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";
import { ParsedUrlQuery } from "querystring";

export namespace Carsharing {
    
    interface User {
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

    interface UseTimes{
        carid:string;
        date: string;
        starttime: string;
        endtime: string;
        user: string;
    }

    let collection: Mongo.Collection;
    let collectionCars: Mongo.Collection;
    let collectionUseTimes: Mongo.Collection;
    
    let port: number = Number(process.env.PORT); 
    if (!port) {
        port = 8100; 
    }

    let dataBaseUrl: string = "mongodb+srv://SoftwareReader:1234@gisws20-21.a07b1.mongodb.net/Carsharing?retryWrites=true&w=majority";
    console.log("Starting server");

    //starting server and connection to database
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
        collectionUseTimes =  mongoClient.db("Carsharing").collection("Dates");
        console.log("Database connection user sucessfull ", collection != undefined);
        console.log("Database connection Cars sucessfull ", collectionCars != undefined);
        console.log("Database connection Dates sucessfull ", collectionUseTimes != undefined);
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
                if(parameter.conventionell =="on"){
                    console.log("Konventionelles Auto");
                    car.conventionell= true;
                }
                let resultcar: boolean = await addcar(car);
                if(resultcar){
                    _response.write("Auto wurde angelegt");
                }
                else{
                    _response.write("Felder sind leer oder Datentypen sind nicht korrekt oder Auto Id existiert schon");
                }            
            }
            else if(q.pathname =="/index.html"){
                console.log("get Data");
                if (parameter.filter = "a"){
                    console.log("get all cars")
                    // get all cars
                    let listCars: Car[] = await showData();
                    _response.write( JSON.stringify(listCars) )
                }
                else if (parameter.filter = "b"){
                    console.log("filter car types")
                    let listCars:Car[] = await filterCar(parameter.electro as string,parameter.conventionell as string);
                    _response.write( JSON.stringify(listCars) )
                }
                else{

                }
                
            }

            else if(q.pathname=="/bookcars.html"){
                console.log("book car");
                let car: Car = await bookCar(parameter.dataID as string);

                _response.write(JSON.stringify(car));
            }
            else if(q.pathname=="/checktime.html"){
                console.log("check if car is available");
                
                if (parameter.booktime!= "" && parameter.starttime!= ""&& parameter.duration!= ""){
                    let duration: number = parseInt(parameter.duration as string );
                    let start: number = parseInt((parameter.starttime as string).replace(":",""));
                    let end: number =Math.floor(duration /60)*100 + duration%60 + start;

                    let usetime:UseTimes={
                        carid: parameter.carid as string,
                        date: parameter.booktime as string,
                        starttime:start.toString(),
                        endtime: end.toString(),
                        user:parameter.username as string,
                    }
                    let available:string=await checktime(usetime, duration);

                    if( available!="true"){
                        _response.write(available); 
                    }
                    else{
                        console.log("check if car is booked")
                        let time: boolean = await checkavailable(usetime);
                        _response.write(time);

                    }
                }
                else{
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

    async function registerien(_client: User): Promise<boolean> { 
        console.log("versucht zu registrieren");
        // trying to find username in the database
        let searchname: any = await collection.findOne({"username": _client.username});    
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
                // right password for the username
                await collection.updateOne({"username": _client.username}, {$set: { "status": "true"} }); 
            return true;
            }
            else{
                // password is wrong
            return false
            }  
        }  
    }
    async function addcar(_car:Car): Promise<boolean>{
        let daten: any = await collectionCars.findOne({"id": _car.id} );
        if (!_car.id || !_car.name || !_car.fnut || !_car.lnut || !_car.max || !_car.pnd || !_car.ppmin) {
            console.log("Daten fehlen")
            //  trying to add car with empty fields
            return false;
        }
        if(_car.conventionell == false && _car.electronic == false){
            console.log("Antriebsart fehlt")
            // type car engine is missing
            return false;
        }
        else if (daten != undefined) {
            console.log("Auto existiert schon")
            // carid exists
            return false;
        }
        else{
            await collectionCars.insertOne(_car);
            // add car to database
            return true;  
        }   
    }

    async function showData(): Promise<Car[]> {
        // get all Cars in an array
        let data: any[] = await collectionCars.find().toArray();
        return data;
    }

    async function filterCar(_electro:string, _conven:string): Promise<Car[]> {
        console.log("Filter",_electro, _conven);
        if(_electro =="on"){
            let data: any[] = await collectionCars.find({"electro": "true","conventionell": "false"}).toArray();
            return data;
        }
        else if(_conven=="on"){
            let data: any[] = await collectionCars.find({"electro": "false","conventionell": "true"}).toArray();
            return data;
        }
        else{
            let data: any[] = await collectionCars.find({"electro": "true","conventionell": "true"}).toArray();
            return data;
        }  
    }

    async function bookCar(_carid:string): Promise<Car>{
        console.log("Auto buchen");
        // get Car by id
        let daten3: any = await collectionCars.findOne({"id": _carid});
        return daten3;
    } 

    async function checktime(_time:UseTimes,_duration:number):Promise<string> {
        console.log("Auto check time");
        // get Car by id
        let daten4: any = await collectionCars.findOne({"id": _time.carid});
        // transfer string to integer for comparision
        let start: number = parseInt((daten4.fnut).replace(":",""));
        let wishstart: number = parseInt((_time.starttime).replace(":",""));
        let end: number = parseInt((daten4.lnut).replace(":",""));
        if(wishstart<start){
            //start is too early
            return "das Auto ist nicht so früh nutzbar, erst nutzbar ab "+(daten4.fnut).toString()
        }
        else if(_duration>parseInt(daten4.max)){
            // duration is too long
            return "ihre gewünschte Nutzdauer ist zu lange"
        }
        else if(parseInt(_time.endtime)>end){
            // end is too late
            return "das Auto ist so spät nicht nutzbar, nur nutzbar bis "+(daten4.lnut).toString()+"Uhr"
        }
        else{
            // standart parameter fits
            return "true"; 
        }      
    }

    async function checkavailable(_usetime:UseTimes):Promise<boolean> {
        console.log("Auto check time");
        // search for the carid
        let data5: any[] = await collectionUseTimes.find({"carid": _usetime.carid}).toArray();
        let wishend: number = parseInt(_usetime.endtime);
        let wishstart: number = parseInt((_usetime.starttime));
        // if array is empty car id is not in database
        if (data5[0] != undefined) {
            console.log("Auto existiert schon");
            // carid exist in database
            for ( let i: number = 0; i < data5.length; i++){
                if(data5[i].date ==_usetime.date){
                    console.log("Date is the same");
                    let start: number = parseInt((data5[i].starttime).replace(":","")); 
                    let end: number = parseInt((data5[i].endtime).replace(":",""));
                    if(start <=  wishstart&& wishstart<=end){
                        console.log("starttime is in between");
                        return false;
                    } 
                    else if(start <=  wishend&& wishend<=end){
                        console.log("endtime is in between");
                        return false;
                    }  
                    else if (wishstart<start && wishend>end){
                        console.log("time is crossing");
                        return false;
                    }   
                }                    
            }
            await collectionUseTimes.insertOne(_usetime);
            console.log("auto eingefügt");
            //add car to database because date for car does not exist in database
            return false;   
        }
        else{
            await collectionUseTimes.insertOne(_usetime);
            console.log("auto existiert noch nicht");
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
}