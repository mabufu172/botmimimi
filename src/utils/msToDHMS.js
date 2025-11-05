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
        if (days) {
            remaining_ms -= days * msInADay
            clock += days + "d"
        }
    }
    
    if (ms >= msInAnHour) {
        hours = (remaining_ms - (remaining_ms % msInAnHour)) / msInAnHour
        if (hours) {
            remaining_ms -= hours * msInAnHour
            clock += hours + "h"
        }
    }

    if (ms >= msInAMinute) {
        minutes =  (remaining_ms - (remaining_ms % msInAMinute)) / msInAMinute
        if (minutes) {
            remaining_ms -= minutes * msInAMinute
            clock += minutes + "m"
        }
    }

    if (ms >= msInASecond) {
        seconds = (remaining_ms - (remaining_ms % msInASecond)) / msInASecond
        if (seconds) {
            remaining_ms -= minutes * msInASecond
            clock += seconds + "s"
        }
    }

    return clock
}