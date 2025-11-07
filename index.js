const { Collection, Client, GatewayIntentBits } = require('discord.js')

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
})

client.commands = new Collection()
client.config = require('./src/json/bot_config.json')

module.exports = client

require('dotenv').config()
require('./src/handler/commands.js')(client)
require('./src/handler/database.js')

client.login(process.env.TOKEN)