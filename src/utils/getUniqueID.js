// randomLimit default to 999
// getLastDateDigits default to -5

module.exports = (randomLimit, getLastDateDigits) => {
    return Math.floor(Math.random() * randomLimit) + new Date().getTime().toString().slice(getLastDateDigits)
}