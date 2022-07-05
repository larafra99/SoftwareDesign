"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let startButton = document.getElementById("gamestart");
startButton.addEventListener("click", startGame);
function startGame() {
    return __awaiter(this, void 0, void 0, function* () {
        let start = new UnregisteredUser("23");
        start.chooseOpponent();
    });
}
class UnregisteredUser {
    constructor(_guestID) {
        this.guestID = _guestID;
    }
    chooseOpponent() {
    }
    customizeGameBoard() {
        let chosenGameboard = new Gameboard(5, 5, 5);
        return chosenGameboard;
    }
    placeStone() {
        let chosencoordinates = new coordinates(4, 6);
        return chosencoordinates;
    }
    register() {
    }
}
class User extends UnregisteredUser {
    constructor(_username, _passwort, _userID, _guestID) {
        super(_guestID);
        this.userName = _username;
        this.passwort = _passwort;
        this.userID = _userID;
    }
    logIn() {
    }
    showStatistics() {
    }
}
class coordinates {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
    getStonePosition() {
    }
}
class Gameboard {
    constructor(_height, _width, _pointsToWin) {
        this.height = _height;
        this.width = _width;
        this.pointsToWin = _pointsToWin;
    }
}
class Game {
    constructor(_coordinate, _score) {
        this.coordinate = _coordinate;
        this.score = _score;
    }
    showStonesOnGameboard() {
    }
    getScore() {
    }
}
class Statistics {
    constructor(_gamesWon, _gamesLost, _gamesInTotal) {
        this.gamesWon = _gamesWon;
        this.gamesLost = _gamesLost;
        this.gamesInTotal = _gamesInTotal;
    }
    getStatistics() {
    }
}
let prototyp = new Gameboard(7, 6, 4);
//# sourceMappingURL=connectfour.js.map