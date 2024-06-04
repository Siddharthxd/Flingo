const {
    Message,
    Client,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    MessageSelectMenu
} = require('discord.js')

module.exports = {
    name: 'vcundeafen',
    aliases: ['vcundeaf'],
    category: 'voice',
    run: async (client, message, args) => {
        if (!message.member.permissions.has('DEAFEN_MEMBERS')) {
            const error = new MessageEmbed()
                .setColor(0xf9fd17)
                .setDescription(
                    `You must have \`Deafen members\` permission to use this command.`
                )
            return message.channel.send({ embeds: [error] })
        }
        if (!message.guild.me.permissions.has('DEAFEN_MEMBERS')) {
            const error = new MessageEmbed()
                .setColor(0xf9fd17)
                .setDescription(
                    `I must have \`Deafen members\` permission to use this command.`
                )
            return message.channel.send({ embeds: [error] })
        }
        if (!message.member.voice.channel) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(0xf9fd17)
                        .setDescription(
                            `You must be connected to a voice channel first.`
                        )
                ]
            })
        }
        let member1 =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0])
        if (!member1) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(0xf9fd17)
                        .setDescription(
                            `You must mention someone whom you want to undeafen in your vc.`
                        )
                ]
            })
        }
        let member =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0])
        if (!member.voice.channel) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(0xf9fd17)
                        .setDescription(
                            `<@${member.user.id}> is not in your vc.`
                        )
                ]
            })
        }
        try {
            member.voice.setDeaf(
                false,
                `${message.author.tag} (${message.author.id})`
            )
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(0xf9fd17)
                        .setDescription(
                            `${client.emoji.tick} | Successfully undeafened <@${member.user.id}> From Voice!`
                        )
                ]
            })
        } catch (err) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(0xf9fd17)
                        .setDescription(
                            `I was unable to voice undeafen <@${member.user.id}>.`
                        )
                ]
            })
        }
    }
}
