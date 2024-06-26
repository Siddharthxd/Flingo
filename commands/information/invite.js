const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

// Command
module.exports = {
    name: 'invite',
    aliases: ['inv', 'i'],
    category: 'info',

    run: async (client, message, args) => {
        const button = new MessageActionRow().addComponents(
            new MessageButton()
                .setLabel('Invite Me')
                .setStyle('LINK')
                .setURL(
                    `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`
                )
        )

        // Sending
        message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor(0xf9fd17)
                    .setDescription(
                        `[Click here to invite me](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`
                    )
            ],
            components: [button]
        })
    }
}
