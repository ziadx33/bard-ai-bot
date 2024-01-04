const { GoogleGenerativeAI } = require("@google/generative-ai");
const { client } = require("./index.js");
const { API_KEY } = require("./tokens.js");
const genAI = new GoogleGenerativeAI(API_KEY);

client.on("interactionCreate", (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === "question") {
        const { value: prompt } = interaction.options.get("prompt")
        interaction.reply("generating response...")
        getBardResponse(prompt, (response) => {
            const answer = `question: ${prompt}\n\nresponse: ${response}`
            function checkLength(text) {
                if (text.length >= 2000) {
                    interaction.deleteReply()
                    interaction.channel.send(text.slice(0, 2000))
                    text = text.slice(2000)
                    checkLength(text, text.length)
                } else {
                    interaction.channel.send(text)
                }
            }
            checkLength(answer, answer.length)
        })
    }
})



async function getBardResponse(prompt, cbFn) {
    try {

        const maxResponseLength = 2000 - (prompt.length + 5);
        const generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: maxResponseLength
        }
        const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        console.log(response.text())
        cbFn(response.text());
    } catch (error) {
        console.error(error);
        cbFn("An error occurred");
    }
}
