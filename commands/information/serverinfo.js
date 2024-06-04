const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    VERY_HIGH: 'Very High'
}
const booster = {
    NONE: 'Level 0',
    TIER_1: 'Level: 1',
    TIER_2: 'Level: 2',
    TIER_3: 'Level: 3'
}
const disabled = '<:cross9:1239478941694296064>'
const enabled = '<:tick:1239477785425219625>'

module.exports = {
    name: 'serverinfo',
    category: 'info',
    aliases: ['si'],
    description: 'To Get Information About The Server',
    run: async (client, message, args) => {
        this.client = client
        const guild = message.guild
        const { createdTimestamp, ownerId, description } = guild
        function checkDays(date) {
            let now = new Date()
            let diff = now.getTime() - date.getTime()
            let days = Math.floor(diff / 86400000)
            return days + (days == 1 ? ' day' : ' days') + ' ago'
        }
        const roles = guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map((role) => role.toString())
            .slice(0, -1)
        let rolesdisplay
        if (roles.length < 15) {
            rolesdisplay = roles.join(' ')
            if (roles.length < 1) rolesdisplay = 'None'
        } else {
            rolesdisplay = `\`Too many roles to show..\``
        }
        if (rolesdisplay.length > 1024)
            rolesdisplay = `${roles.slice(4).join(' ')} \`more..\``
        const members = guild.members.cache
        const channels = guild.channels.cache
        const emojis = guild.emojis.cache
        let data = guild.bannerURL
        let bans = await message.guild.bans.fetch().then((x) => x.size)
        if (data) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(this.client.color)
                        .setTitle(`${guild.name}'s Information`)
                        .setThumbnail(guild.iconURL({ dynamic: true }))
                        .setImage(guild.bannerURL({ size: 4096 }))
                        .addFields([
                            {
                                name: '__About__',
                                value: `**Name**: ${guild.name} \n **ID**: ${guild.id} \n **Owner <:red_owner:1240990649277222912>:** <@!${guild.ownerId}> (${guild.ownerId})\n**Created at:** <t:${parseInt(createdTimestamp / 1000)}:R>\n**Members: **${guild.memberCount}\n**Banned Members: **${bans}`
                            },
                            {
                                name: '__Server Information__',
                                value: `**Verification Level:** ${verificationLevels[guild.verificationLevel]}\n**Inactive Channel: **${guild.afkChannelId ? `<#${guild.afkChannelId}>` : `${disabled}`}\n**Inactive Timeout: **${guild.afkTimeout / 60} mins\n**System Messages Channel: **${guild.systemChannelId ? `<#${guild.systemChannelId}>` : disabled}\n**Boost Bar Enabled: **${guild.premiumProgressBarEnabled ? enabled : disabled}`
                            },
                            {
                                name: '__Channels__',
                                value: `**Total: ** ${channels.size}\n**Channels: **<:TextChannel:1240990873484005447> ${channels.filter((channel) => channel.type === 'GUILD_TEXT').size} | <:VoiceChannel:1240990985757134979> ${channels.filter((channel) => channel.type === 'GUILD_VOICE').size}`
                            },
                            {
                                name: '__Emoji Info__',
                                value: `**Regular:** ${emojis.filter((emoji) => !emoji.animated).size} \n**Animated:** ${emojis.filter((emoji) => emoji.animated).size} \n**Total:** ${emojis.size}`
                            },
                            {
                                name: '__Boost Status__',
                                value: `${booster[guild.premiumTier]} [<:boobsters:1240991386879131740> ${guild.premiumSubscriptionCount || '0'} Boosts]`
                            },
                            {
                                name: `__Server Roles__ [${roles.length}]`,
                                value: `${rolesdisplay}`
                            }
                        ])
                        .setTimestamp()
                ]
            })
        }
    }
}
