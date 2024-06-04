const { Message, Client, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'membercount',
    aliases: ['mc'],
    category: 'info',

    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor(0xf9fd17)
            .setTitle(`Members`)
            .setDescription(`${message.guild.memberCount}`)
            .setTimestamp()

        message.channel.send({ embeds: [embed] })
    }
}
