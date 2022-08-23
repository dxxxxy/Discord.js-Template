const colors = require("../library/colors.js")
const { EmbedBuilder } = require("discord.js")

exports.run = (client, message, args) => { //required in every file
    //when someone runs our command, it all starts inside of here
    if (args[0]) { //someone elses info
        client.users.fetch(client.users.cache.find(u => u.username.toLowerCase() === args[0].toLowerCase())).then(user => {
            message.channel.send({
                embeds: [new EmbedBuilder()
                    .setTitle(`${user.tag}'s info`)
                    .setColor(colors.aliceblue)
                    .setDescription(`Created at: ${user.createdAt}`)
                    .setThumbnail(user.avatarURL())
                ]
            })
        }).catch(() => {
            message.channel.send("Couldn't find that user")
        })
    } else { //our info
        message.channel.send({
            embeds: [new EmbedBuilder()
                .setTitle(`${message.author.tag}'s info`)
                .setColor(colors.aliceblue)
                .setDescription(`Created at: ${message.author.createdAt}`)
                .setThumbnail(message.author.avatarURL())
            ]
        })
    }
}