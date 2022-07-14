import {CarData} from "../interfaces/interface";

export class Car {
    id: string;
    name: string;
    electronic: boolean;
    conventionell: boolean;
    fnut: string;
    lnut: string;
    max: string;
    pnd: string;
    ppmin: string;

    constructor(_id:string,_name:string,_electronic:boolean,_conventionell:boolean,_fnut:string,_lnut:string,_max:string,_pnd:string,_ppmin:string){
        this.id = _id;
        this.name= _name;
        this.electronic= _electronic;
        this.conventionell= _conventionell;
        this.fnut= _fnut;
        this.lnut= _lnut;
        this.max= _max;
        this.pnd= _pnd;
        this.ppmin= _ppmin;
        }
}