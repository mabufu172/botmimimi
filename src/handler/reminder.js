const Database = require('./database')
const client = require('../../index')
const MStoDHMS = require('../utils/MStoDHMS')
const CustomEmbed = require('../classes/CustomEmbed')

list = Database.prepare(
    `
    SELECT * FROM reminders
    `
)
.all()

function sendReminder(reminder) {
    const currentTime = new Date().getTime()
    const fetchUser = client.users.fetch(reminder.userId)

    if (!fetchUser) return console.log('Failed to fetch user')

    Database.prepare(
        `
        DELETE FROM reminders WHERE reminderId = ? AND userId = ?
        `
    ).run(reminder.reminderId, reminder.userId)

    const embed = new CustomEmbed()
    .setTitle(`Reminder #${reminder.reminderId}`)
    .setDescription(`\`${MStoDHMS(currentTime - reminder.initDate)}\` ago you asked to be reminded of:\`\`\`\n${reminder.content}\`\`\``)

    fetchUser.then(user => user.send({ embeds: [embed] }))
}

const currentTime = new Date().getTime()

if (list)

list.forEach(reminder => {
    if (currentTime <= reminder.expiryDate)
        setTimeout(() => sendReminder(reminder), reminder.expiryDate - currentTime)
    else
        sendReminder(reminder)
})

module.exports = sendReminder