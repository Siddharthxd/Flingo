const { Message, Client, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'serverbanner',
    category: 'info',

    run: async (client, message, args) => {
        if (message.guild.banner) {
            let embed = new MessageEmbed()
                .setTitle(`${message.guild.name} SERVER BANNER`)
                .setColor(`#2f3136`)
                .setImage(message.guild.bannerURL({ size: 4096 }))
            message.channel.send({ embeds: [embed] })
        } else {
            let embed = new MessageEmbed()
                .setDescription(`This Server has no Banner!`)
                .setColor(0xf9fd17)

            message.channel.send({ embeds: [embed] })
        }
    }
}
