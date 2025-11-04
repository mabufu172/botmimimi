const { glob } = require('glob')

module.exports = async (client) => {

    const commandFiles = await glob('src/commands/**/*.js', { absolute: true })
    commandFiles.map((value) => {
        const file = require(value)
        const splitted = value.split(/[\\/]/)
        const directory = splitted[splitted.length - 2]

        if (file.name) {
            const properties = { directory, ...file }
            client.commands.set(file.name, properties)
        }
    });

    const eventFiles = await glob('src/events/*.js', { absolute: true })
    eventFiles.map((value) => require(value))
};
