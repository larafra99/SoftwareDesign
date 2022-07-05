class User{
    guestID: string;

    constructor(_guestID:string){
        this.guestID=_guestID
    }

    choosecar():void{
    }
    register():void{
    }
    login():void{
        // sehe die funktion sinnvoller bei registered user 
    }
}

class RegisteredUser extends User{
    userID: string;
    password: string;
    username: string;
    logedin: boolean;

    constructor(_username:string, _passwort:string, _userID:string, _guestID:string){
        super(_guestID);
        this.username=_username;
        this.password= _passwort;
        this.userID = _userID;
    }

    travelhistory():void{
    }
    regchoosecar(): void /*extends User.choosecar()*/{   
    }
}

class Admin extends RegisteredUser{

    constructor(){
        super(_username);
        this.username= 'admin';
        this.password = '1234';
    }

    addcar():void{

    }

}