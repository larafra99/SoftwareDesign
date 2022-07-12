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
interface User {
    username: string;
    password: string;
    status: boolean;
    admin: boolean;   
}
interface UseTimes{
    carid:string;
    date: string;
    starttime: string;
    endtime: string;
    user: string;
    price: string;
}
export{
    Car,
    User,
    UseTimes,
}