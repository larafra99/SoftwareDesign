let startButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("gamestart");

startButton.addEventListener("click",startGame);

async function startGame(): Promise<void> {
    let start:UnregisteredUser = new UnregisteredUser("23")
    start.chooseOpponent()
}
class UnregisteredUser{
    guestID:string; 
    chooseOpponent():void{
    }
    customizeGameBoard():Gameboard{
        let chosenGameboard:Gameboard=new Gameboard(5,5,5)
        return chosenGameboard;
    }
    placeStone():coordinates{
        let chosencoordinates:coordinates = new coordinates(4,6);
        return chosencoordinates;
    }
    register():void{

    }
    constructor(_guestID:string){
        this.guestID=_guestID;
    }
}

class User extends UnregisteredUser{
userName:string;
passwort:string;
userID:string;

constructor(_username:string, _passwort:string, _userID:string, _guestID:string){
    super(_guestID);
    this.userName=_username;
    this.passwort= _passwort;
    this.userID = _userID;
}

logIn():void{   
}
showStatistics():void{   
}
}

class coordinates{
    x:number;
    y:number;
    constructor(_x:number, _y:number){
        this.x=_x;
        this.y=_y;
    }
    getStonePosition():void{    
    }
 
    
}

class Gameboard{
    height: number;
    width: number;
    pointsToWin: number;

    constructor(_height:number, _width:number,_pointsToWin:number){
        this.height=_height;
        this.width=_width;
        this.pointsToWin=_pointsToWin;
    }
}

class Game{
    coordinate: number[];
    score: number[]

    constructor(_coordinate:number[],_score:number[]){
        this.coordinate= _coordinate
        this.score= _score
    }

    showStonesOnGameboard():void{
        
    }
    getScore():void{
        
    }
}

class Statistics{
    gamesWon: number;
    gamesLost: number;
    gamesInTotal:number;
    
    constructor(_gamesWon:number,_gamesLost:number, _gamesInTotal:number){
        this.gamesWon= _gamesWon
        this.gamesLost= _gamesLost
        this.gamesInTotal= _gamesInTotal
    }
    
    getStatistics():void{
        
    }
}
let prototyp:Gameboard = new Gameboard(7,6,4);