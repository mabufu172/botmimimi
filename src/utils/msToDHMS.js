module.exports = ms => {

    const msInASecond = 1000
    const msInAMinute = 60000
    const msInAnHour = 3600000
    const msInADay = 86400000

    let
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    remaining_ms = ms,
    clock = ''

    if (ms >= msInADay) {
        days = (remaining_ms - (remaining_ms % msInADay)) / msInADay
        remaining_ms -= days * msInADay
        clock += days + "d"
    } else if (ms >= msInAnHour) {
        hours = (remaining_ms - (remaining_ms % msInAnHour)) / msInAnHour
        remaining_ms -= hours * msInAnHour
        clock += hours + "h"
    } else if (ms >= msInAMinute) {
        minutes =  (remaining_ms - (remaining_ms % msInAMinute)) / msInAMinute
        remaining_ms -= minutes * msInAMinute
        clock += minutes + "m"
    } else if (ms >= msInASecond) {
        seconds = (remaining_ms - (remaining_ms % msInASecond)) / msInASecond
        remaining_ms -= minutes * msInASecond
        clock += seconds + "s"
    }

    return clock
}