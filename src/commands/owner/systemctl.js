const CommandBuilder = require('../../classes/CommandBuilder')
const { execSync } = require("child_process")
const wrongMessage = require('../../utils/wrongMessage')

module.exports = new CommandBuilder({
    name: 'systemctl',
    cmdargs: [
        {label: 'action', options: ['restart', 'stop']},
    ],
    reqargs: 1,
    run: async ({ message, args }) => {

        try {
            await message.channel.send({ content: `Attempting to ${args[0]} systemctl service: ${process.env.SYSTEMCTL_SERVICE_NAME}` })
            execSync(`echo ${process.env.ROOT_PASSWORD} | sudo -S systemctl ${args[0]} ${process.env.SYSTEMCTL_SERVICE_NAME}`)
        } catch (err) {
            console.log(err)
            message.channel.send({ content: 'Something went wrong.' })
        }

    }
})
