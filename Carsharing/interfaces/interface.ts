interface CarData{
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
    CarData,
    User,
    UseTimes,
}