const CommandBuilder = require('../../classes/CommandBuilder')

module.exports = new CommandBuilder({
    name: 'ping',
    alias: ['braincell', 'braincells'],
    run: async ({ message }) => {
        message.channel.send("Pinging... :wireless:").then(msg => {
            msg.edit({ content: `I have approximately \`${msg.createdTimestamp - message.createdTimestamp}\` braincells.` })
        })
    }
})