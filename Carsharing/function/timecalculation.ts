export function starttime(_starttime:string):number{
    let start: number = parseInt(_starttime.replace(":",""));
    return start;
}
export function duration(_duration:string):number{
    let duration: number = parseInt(_duration as string );
    return duration;

}
export function endtime(_start:string,_duration:string):number{
    let dur:number =duration(_duration);
    let begining: number = starttime(_start);
    let end: number =Math.floor(dur /60)*100 + dur%60 + begining;
    return end;
}
