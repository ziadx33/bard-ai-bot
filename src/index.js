require("dotenv").config()
require("../alive.js")
const { Client, IntentsBitField } = require('discord.js');
const { TOKEN } = require("./tokens.js");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
})

exports.client = client;

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
    require("./commandsResponses.js")
})

client.on("messageCreate", (message) => {

    if (message.author.bot) return

    if (message.content === "hello") {
        message.reply("Hello!")
    }
})


client.login(TOKEN)


