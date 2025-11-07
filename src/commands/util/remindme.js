const Database = require('../../handler/database')
const DHMStoMS = require('../../utils/DHMStoMs')
const MStoDHMS = require('../../utils/MStoDHMS')
const wrongMessage = require('../../utils/wrongMessage')
const sendReminder = require('../../handler/reminder')
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

        const currentTime = new Date().getTime()

        switch (args[0]) {

            case 'add':
                if (!args[1] || !args[2]) return wrongMessage()
                if (!DHMStoMS(args[1])) return message.channel.send({ content: 'Invalid DHMS format'})
                const prepare = Database.prepare(
                    `
                    INSERT OR REPLACE INTO reminders (userId, reminderId, expiryDate, initDate, content)
                    VALUES (?, ?, ?, ?, ?)
                    RETURNING *
                    `
                )
                const data = prepare.get(message.author.id, require('../../utils/getUniqueID')(99, -3), (currentTime + DHMStoMS(args[1])), currentTime, args.splice(2, args.length).join(' '));
                setTimeout(() => sendReminder(data), data.expiryDate - currentTime)

                const embed = new CustomEmbed()
                .setTitle(`Created reminder #${data.reminderId}`)
                .setDescription(`In \`${MStoDHMS(data.expiryDate - currentTime)}\` you will be reminded about:\`\`\`\n${data.content}\`\`\``)
                //.setFooter({ text: `You will be reminded in ${MStoDHMS(data.expiryDate - currentTime)}` })
                message.channel.send({ embeds: [embed] })

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
                /*
                PLEASE MAKE A HANDLER IF WE DELETE REMINDER IT WILL REMOVE TIMEOUT
                possible answer:
                create another instance in reminders that stores what is the setTimeout ID after its been created a setTimeout
                */
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
                    .setTitle('Active reminders')
                    let description = ''

                    list.forEach((reminder, index) => {
                        if (index == 0) description += '```'
                        description += `\n[ID: ${reminder.reminderId}] ${reminder.content} `

                        if (currentTime <= reminder.expiryDate)
                            description += `(in ${MStoDHMS(reminder.expiryDate - currentTime)})`
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