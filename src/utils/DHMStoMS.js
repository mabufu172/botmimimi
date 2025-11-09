module.exports = DHMS => {

    const signs = DHMS.match(/[dhms]/gi)
    const numbers = DHMS.split(/[dhms]/gi)

    if (!signs || !numbers) return null

    let result = 0

    signs.forEach((char, index) => {
        let multiplier = 0
        switch(char){
            case "s":
                multiplier = 1000
                break
            case "m":
                multiplier = 60000
                break
            case "h":
                multiplier = 3600000
                break
            case "d":
                multiplier = 86400000
                break
        }
        result += numbers[index] * multiplier
    })

    return result
}