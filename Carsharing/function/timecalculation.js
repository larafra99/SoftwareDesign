export function starttime(_starttime) {
    let start = parseInt(_starttime.replace(":", ""));
    return start;
}
export function duration(_duration) {
    let duration = parseInt(_duration);
    return duration;
}
export function endtime(_start, _duration) {
    let dur = duration(_duration);
    let begining = starttime(_start);
    let end = Math.floor(dur / 60) * 100 + dur % 60 + begining;
    return end;
}
//# sourceMappingURL=timecalculation.js.map