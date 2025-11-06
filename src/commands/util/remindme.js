const Database = require('../../handler/database')
const DHMStoMS = require('../../utils/DHMStoMs')
const MStoDHMS = require('../../utils/MStoDHMS')
const wrongMessage = require('../../utils/wrongMessage')
const CommandBuilder = require('../../classes/CommandBuilder')
const CustomEmbed = require('../../classes/CustomEmbed')

module.exports = new CommandBuilder({
    name: 'remindme',
    alias: [ 'rm' ],
    cmdargs: [
        {
            label: 'Action',
            options: ['remove', 'add', 'list']
        },
        {
            label: 'Duration/ReminderId'
        }
    ],
    run: async ({ message, args }) => {
        switch (args[0]) {

            case 'add':
                if (!args[1] || !args[2]) return wrongMessage()

                Database.prepare(
                    `
                    INSERT OR REPLACE INTO reminders (userId, reminderId, expiryDate, content)
                    VALUES (?, ?, ?, ?)
                    `
                )
                .run(message.author.id, require('../../utils/getUniqueID')(99, -3), (new Date().getTime() + DHMStoMS(args[1])).toString(), args.splice(2, args.length).join(' '));

                break

            case 'remove':
                /* automate this in command handler:
                check if user's selected parameter path it requires what other parameters left
                wrongMessage() should shows every option path along with the required/available parameters 
                */
                if (!args[1]) return wrongMessage()

                let attempt = Database.prepare(
                    `
                    DELETE FROM reminders WHERE reminderId = ? AND userId = ?
                    `
                )
                .run(args[1], message.author.id)

                message.channel.send({ content: attempt.changes > 0 ? 'Removed reminder #' + args[1] : 'Failed to remove reminder'})

                break

            case 'list':
            default:
                list = Database.prepare(
                    `
                    SELECT * FROM reminders WHERE userId = ?
                    `
                )
                .all(message.author.id)

                if (list.length) {

                    const embed = new CustomEmbed()
                    let description = ''

                    console.log(list)

                    list.forEach((reminder, index) => {
                        if (index == 0) description += '```'
                        description += `\n[ID: ${reminder.reminderId}] ${reminder.content} `

                        if (new Date().getTime() <= reminder.expiryDate)
                            description += `(in ${MStoDHMS(reminder.expiryDate - new Date().getTime())})`
                        else
                            description += '(already passed)'

                        if (index + 1 == list.length) description += '```'
                    })

                    embed.setDescription(description)

                    message.channel.send({ embeds: [embed] })

                } else {
                    message.channel.send({ content: "You have no active reminders... 🦗"})
                }
                
                break

        }
    }
})