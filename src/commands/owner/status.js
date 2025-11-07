const CommandBuilder = require('../../classes/CommandBuilder')
const CustomEmbed = require('../../classes/CustomEmbed')
const MStoDHMS = require('../../utils/MStoDHMS')
const { execSync } = require('child_process')
const os = require('os')

module.exports = new CommandBuilder({
    name: 'status',
    alias: ['stat', 'st'],
    run: async ({ client, message }) => {

        const info = new Array()

        if (process.platform == 'linux') {
            let temp = Math.round(parseInt(execSync(`cat /sys/class/thermal/thermal_zone0/temp`))/1000)
            info.push(`TEMP: ${temp}°C`)
        }

        info.push(`NODE UPTIME: ${MStoDHMS(client.uptime)}`)

        info.push(`OS: ${process.platform}`)

        const memoryTotal = os.totalmem()
        const memoryUsed = os.totalmem() - os.freemem()
        const percentageUsed = (memoryUsed / memoryTotal) * 100

        info.push(`MEM USAGE: ${percentageUsed.toFixed(2)}% out of ${(memoryTotal / 1024 ** 3).toFixed(2)}GiB`)

        const embed = new CustomEmbed()
        .setDescription('```\n' + info.join("\n") + '```')

        message.channel.send({ embeds: [embed] })

    }
})