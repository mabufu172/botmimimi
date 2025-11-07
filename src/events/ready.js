const client = require('../../index')

client.on('clientReady', () => {
    console.log(`Logged in as ${client.user.displayName}`)
    require('../handler/reminder.js')
})