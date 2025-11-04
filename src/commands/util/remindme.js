const Database = require("../../handler/database")
const CommandBuilder = require('../../classes/CommandBuilder')
const CustomEmbed = require('../../classes/CustomEmbed')

module.exports = new CommandBuilder({
    name: 'remindme',
    alias: [ 'rm' ],
    cmdargs: [
        {
            label: 'Action',
            options: ['edit', 'remove', 'add']
        },
        {
            label: 'duration'
        }
    ],
    run: async ({ message, args }) => {
        switch (args[0]) {

            case "add":

                db.prepare(`
                    INSERT OR REPLACE INTO reminder (userId, reminderId, expiryDate, content)
                    VALUES (?, ?, ?, ?)
                    `)
                .run(message.author.id, require("../../utils/getUniqueID"), new Date().getDate(), "500");

                break

            case "edit":
                
                message.channel.send({ content: require("../../utils/getUniqueID")(99, -3) })

                break

            case "remove":
                break

        }
    }
})