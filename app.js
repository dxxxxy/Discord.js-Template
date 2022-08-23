require("dotenv").config()
const { Client, Collection, IntentsBitField } = require("discord.js")
const fs = require("fs")
const client = new Client({ intents: new IntentsBitField(131071) })

client.commands = new Collection()

fs.readdir("./events/", (err, files) => {
    if (err) return console.error
    files.forEach(file => {
        if (!file.endsWith(".js")) return
        const evt = require(`./events/${file}`)
        let evtName = file.split(".")[0]
        client.on(evtName, evt.bind(null, client))
    })
})

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error
    files.forEach(file => {
        if (!file.endsWith(".js")) return
        let props = require(`./commands/${file}`)
        let cmdName = file.split(".")[0]
        client.commands.set(cmdName, props)
    })
})

client.login(process.env.CLIENT_TOKEN)