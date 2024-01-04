require("dotenv").config()
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js")
const { CLIENT_ID, GUILD_ID, TOKEN } = require("./tokens")

const commands = [
    {
        name: "question",
        description: "ask bard AI",
        options: [
            { name: "prompt", description: "the question", type: ApplicationCommandOptionType.String, required: true }
        ]
    }
]

const rest = new REST({ version: "10" }).setToken(TOKEN)


async function deployCommands(CLIENT_ID, GUILD_ID) {
    console.log(CLIENT_ID, GUILD_ID)
    try {
        console.log("regestring commands...")
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        )
        console.log("commands regereted successfully")
    } catch (error) {
        console.error(`there was an error: ${error}`)
    }
}

deployCommands(CLIENT_ID, GUILD_ID)
