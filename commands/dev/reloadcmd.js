const {
    Message,
    Client,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js')
const siddharthxd = ['1141682510380666962']
module.exports = {
    name: 'reload',
    aliases: ['rlcmd'],
    category: 'owner',
    run: async (client, message, args) => {
        if (!siddharthxd.includes(message.author.id)) return
        try {
            let reload = false
            for (let i = 0; i < client.categories.length; i += 1) {
                let dir = client.categories[i]
                try {
                    if (!args[0]) {
                        const opp = new MessageEmbed()
                            .setColor(0xf9fd17)
                            .setDescription(
                                `${client.emoji.cross} | You didn't provided the command name.`
                            )
                        return message.channel.send({ embeds: [opp] })
                    }
                    delete require.cache[
                        require.resolve(`../../commands/${dir}/${args[0]}.js`)
                    ]
                    client.commands.delete(args[0])
                    const pull = require(`../../commands/${dir}/${args[0]}.js`)
                    client.commands.set(args[0], pull)
                    reload = true
                } catch {}
            }
            if (reload) {
                const op = new MessageEmbed()
                    .setColor(0xf9fd17)
                    .setDescription(
                        `${client.emoji.tick} | Successfully reloaded \`${args[0]}\``
                    )
                return message.channel.send({ embeds: [op] })
            }
            const notop = new MessageEmbed()
                .setColor(0xf9fd17)
                .setDescription(
                    `${client.emoji.cross} | I was unable to reload \`${args[0]}\``
                )
            return message.channel.send({ embeds: [notop] })
        } catch (e) {
            const emesdf = new MessageEmbed()
                .setColor(0xf9fd17)
                .setDescription(
                    `${client.emoji.cross} | I was unable to reload \`${args[0]}\``
                )
            return message.channel.send({ embeds: [emesdf] })
        }
    }
}
