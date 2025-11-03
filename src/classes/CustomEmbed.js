module.exports = class CustomEmbed extends require("discord.js").EmbedBuilder {

    constructor (data) { // used to be data = {} or data = new Object()

        super(data)
        this.setColor(require("../json/bot_config.json").accent)

    }

}