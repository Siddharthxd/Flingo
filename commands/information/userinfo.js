const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "userinfo",
    aliases: ['ui', 'whois'],
    category: 'info',
    description: "To Get Information About A User",
    run: async (client, message, args) => {
        const permissions = {
            "ADMINISTRATOR": "Administrator",
            "MANAGE_GUILD": "Manage Server",
            "MANAGE_ROLES": "Manage Roles",
            "MANAGE_CHANNELS": "Manage Channels",
            "KICK_MEMBERS": "Kick Members",
            "BAN_MEMBERS": "Ban Members",
            "MANAGE_NICKNAMES": "Manage Nicknames",
            "MANAGE_EMOJIS": "Manage Emojis",
            "MANAGE_WEBHOOKS": "Manage Webhooks",
            "MANAGE_MESSAGES": "Manage Messages",
            "MENTION_EVERYONE": "Mention Everyone"
        }
        const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const nick = mention.nickname === null ? "None" : mention.nickname;
        const roles = mention.roles.cache.get === "" ? "None" : mention.roles.cache.get;
        const usericon = mention.user.displayAvatarURL({dynamic: true});
        const mentionPermissions = mention.permissions.toArray() === null ? "None" : mention.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
            if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
            else;
        }
        var flags = {
            "DISCORD_EMPLOYEE": "<:discordemployee:1223264604130377761>",
            "DISCORD_PARTNER": "<:partners:1223264762226413638>",
            "BUGHUNTER_LEVEL_1": "<:bughunterl1:1223265054103965716>",
            "BUGHUNTER_LEVEL_2": "<:bughunter2:1223265167089991802>",
            "HYPESQUAD_EVENTS": "<:hypesquadevents:1223265276355936286>",
            "HOUSE_BRILLIANCE": "<:brilliance:1223265376893141063>",
            "HOUSE_BRAVERY": "<:DiscordHypesquadBravery:1223265469708894259>",
            "HOUSE_BALANCE": "<:balance:1223265535970770965>",
            "EARLY_SUPPORTER": "<:earlysupporter:1223265622415118337>",
            "TEAM_USER": "<:TEAM_USER:1223265987269234830>",
            "VERIFIED_BOT": "<:Verified_bot:1223266180228448336>",
            "EARLY_VERIFIED_DEVELOPER": "<:VerifiedBotDeveloper:1223266297383751814>"
        };
        var bot = {
            "true": "Bot",
            "false": "Human"
        };
        const userFlags = message.member.user.flags.toArray();
        const userlol = new MessageEmbed()
        .setAuthor({ name: `${mention.user.username}'s Information`, iconURL: mention.user.avatarURL()}) 
        .setThumbnail(usericon)
        .addField(`General Information`, `**Name:** \`\`${mention.user.username}\`\`\n**Discriminator:** \`${mention.user.discriminator}\` \n**Nickname:** \`${nick}\``)
        .addField(`Overview`, `**Badges:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(' ') : 'None'}\n**Type:** ${bot[mention.user.bot]}`)
        .addField(`Server Relating Information`, `**Roles:** ${mention._roles[0] ? `<@&${mention._roles.join(">  <@&")}>` : `\`No roles\``}  \n**Key Permissions:** \`${finalPermissions.join(', ')}\``)
        .addField(`Misc Information`, `**Created On:** <t:${Math.round(mention.user.createdTimestamp/1000)}:R>\n**Joined On:** <t:${Math.round(mention.joinedTimestamp/1000)}:R>`)
        .setThumbnail(mention.user.avatarURL())
        .setFooter({ text: `Requested By: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true}) })
        .setTimestamp()
        .setColor(0xf9fd17);
        message.reply({ embeds: [userlol] })
    }
}