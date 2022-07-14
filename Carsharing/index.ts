import {navibar} from "./function/flexnavi.js";
import {Car} from "./class/car.js";

localStorage.setItem("lastmove","index.html");
navibar();
// gets Page content
Car.showCarData();
