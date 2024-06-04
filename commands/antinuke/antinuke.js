const { MessageEmbed } = require('discord.js');

// Emoji constants
let enable = `<:flingo_tick:1245366034618384455><:flingo_cross:1245366342337560677>`;
let disable = `<:flingo_cross:1245366342337560677><:flingo_tick:1245366034618384455>`;
let protect = `<:flingo_antinuke:1245358013548597341>`;
let hii = `<:flingo_dots:1245359086963261492>`;

module.exports = {
    name: 'antinuke',    
    category: 'security',
    run: async (client, message, args) => {
        if (message.guild.memberCount < 30) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(0xf9fd17)
                        .setDescription(`${client.emoji.cross} | Your Server Doesn't Meet My 30 Member Criteria`)
                ]
            });
        }

        let own = message.author.id == message.guild.ownerId;
        const check = await client.util.isExtraOwner(message.author, message.guild);
        if (!own && !check) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(0xf9fd17)
                        .setDescription(`${client.emoji.cross} | Only the server owner or an extra owner with a higher role than mine is authorized to execute this command.`)
                ]
            });
        }

        if (!own && !(message?.guild.members.cache.get(client.user.id).roles.highest.position <= message?.member?.roles?.highest.position)) {
            const higherole = new MessageEmbed()
                .setColor(0xf9fd17)
                .setDescription(`${client.emoji.cross} | Only the server owner or extra owner with a higher role than mine can execute this command.`);
            return message.channel.send({ embeds: [higherole] });
        }

        let prefix = '.' || message.guild.prefix;
        const option = args[0];
        const isActivatedAlready = await client.db.get(`${message.guild.id}_antinuke`);

        // Check if Antinuke is enabled or disabled
        let configEmbed;
        if (isActivatedAlready) {
            configEmbed = new MessageEmbed()
                .setThumbnail(client.user.displayAvatarURL())
                .setAuthor({
                    name: `${client.user.username} Security`,
                    iconURL: client.user.displayAvatarURL()
                })
                .setColor(0xf9fd17)
                .setDescription(
                    `**Security Settings For ${message.guild.name} ${protect}**\n\nTip: To optimize the functionality of my Anti-Nuke Module, please move my role to the top of the roles list.${hii}\n\n***__Modules Enabled__*** ${protect}\n**Anti Ban: ${enable}\nAnti Unban: ${enable}\nAnti Kick: ${enable}\nAnti Bot: ${enable}\nAnti Channel Create: ${enable}\nAnti Channel Delete: ${enable}\nAnti Channel Update: ${enable}\nAnti Emoji/Sticker Create: ${enable}\nAnti Emoji/Sticker Delete: ${enable}\nAnti Emoji/Sticker Update: ${enable}\nAnti Everyone/Here Ping: ${enable}\nAnti Link Role: ${enable}\nAnti Role Create: ${enable}\nAnti Role Delete: ${enable}\nAnti Role Update: ${enable}\nAnti Role Ping: ${enable}\nAnti Member Update: ${enable}\nAnti Integration: ${enable}\nAnti Server Update: ${enable}\nAnti Automod Rule Create: ${enable}\nAnti Automod Rule Update: ${enable}\nAnti Automod Rule Delete: ${enable}\nAnti Guild Event Create: ${enable}\nAnti Guild Event Update: ${enable}\nAnti Guild Event Delete: ${enable}\nAnti Webhook: ${enable}**\n\n**__Anti Prune__: ${enable}\n__Auto Recovery__: ${enable}**`
                );
        } else {
            configEmbed = new MessageEmbed()
                .setThumbnail(client.user.displayAvatarURL())
                .setAuthor({
                    name: `${client.user.username} Security`,
                    iconURL: client.user.displayAvatarURL()
                })
                .setColor(0xf9fd17)
                .setDescription(`**Security Settings For ${message.guild.name} ${protect}**\n\nTip: To optimize the functionality of my Anti-Nuke Module, please move my role to the top of the roles list.${hii}\n\n***__Modules Disabled__*** ${protect}\n**To enable Antinuke, use \`${prefix}antinuke enable\`**`);
        }

        // Set footer and send the embed
        configEmbed.setFooter({
            text: `Punishment Type: Ban`,
            iconURL: message.author.displayAvatarURL({ dynamic: true })
        });

        const antinuke = new MessageEmbed()
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setColor(0xf9fd17)
            .setTitle(` Antinuke Protection`)
            .setDescription(`Upgrade your server's security with Antinuke! It swiftly detects and takes action against suspicious admin activities, all while protecting your whitelisted members. Strengthen your defenses – enable Antinuke now!`)
            .addFields(
                {
                    name: ` Enable Antinuke`,
                    value: `To enable Antinuke, use \`${prefix}antinuke enable\``
                },
                {
                    name: ` Disable Antinuke`,
                    value: `To disable Antinuke, use \`${prefix}antinuke disable\``
                },
                {
                    name: ` Antinuke Configuration`,
                    value: `To view or configure Antinuke settings, use \`${prefix}antinuke config\``
                }
            );

        if (!option) {
            message.channel.send({ embeds: [antinuke] });
        } else if (option === 'enable') {
            if (isActivatedAlready) {
                // Already enabled
                const enableEmbed = new MessageEmbed()
                    .setThumbnail(client.user.displayAvatarURL())
                    .setColor(0xf9fd17)
                    .setTitle(`Security Settings For ${message.guild.name} ${protect}`)
                    .setDescription(`Umm, it seems like your server has already enabled security.\n\n**Current Status:** ${enable}\nTo Disable, use ${prefix}antinuke disable`);
                message.channel.send({ embeds: [enableEmbed] });
            } else {
                // Enable Antinuke
                await client.db.set(`${message.guild.id}_antinuke`, true);
                await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] });
                // Send enabled message
                const enabled = new MessageEmbed()
                    .setThumbnail(client.user.displayAvatarURL())
                    .setAuthor({
                        name: `${client.user.username} Security`,
                        iconURL: client.user.displayAvatarURL()
                    })
                    .setColor(0xf9fd17)
                    .setDescription(`**Security Settings For ${message.guild.name} ${protect}**\n\n**Antinuke is Now Enabled**`)
                    .setFooter({
                        text: `Punishment Type: Ban`,
                        iconURL: message.author.displayAvatarURL({ dynamic: true })
                    });
                // Send initializing message
                let msg = await message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setColor(0xf9fd17)
                            .setDescription(`${client.emoji.tick} | Initializing Quick Setup!`)
                    ]
                });
                // Simulate setup
                const steps = ['Checking Permissions ...', 'Unbypassable Setup...!!'];
                for (const step of steps) {
                    await client.util.sleep(1000);
                    await msg.edit({
                        embeds: [
                            new MessageEmbed()
                                .setColor(0xf9fd17)
                                .setDescription(`${msg.embeds[0].description}\n${client.emoji.tick} | ${step}`)
                        ]
                    });
                }
                // Send enabled message
                await client.util.sleep(2000);
                await msg.edit({ embeds: [enabled] });

                if (message.guild.roles.cache.size > 249)
                    return message.reply(`I Won't Able To Create \`Flingo Dominance\` Cause There Are Already 249 Roles In This Server`);

                let role = message?.guild.members.cache.get(client.user.id).roles.highest.position;
                let createdRole = await message.guild.roles.create({
                    name: 'Flingo Dominance',
                    position: role ? role : 0,
                    reason: 'Flingo Role For Ubypassable Setup',
                    permissions: ['ADMINISTRATOR'],
                    color: '#ff0000'
                });
                await message.guild.me.roles.add(createdRole.id);
            }
        } else if (option === 'disable') {
            // Disable Antinuke
            if (!isActivatedAlready) {
                const dissable = new MessageEmbed()
                    .setThumbnail(client.user.displayAvatarURL())
                    .setColor(0xf9fd17)
                    .setDescription(`**Security Settings For ${message.guild.name} ${protect}\nUmm, looks like your server hasn't enabled security.\n\nCurrent Status: ${disable}\n\nTo Enable use ${prefix}antinuke enable**`);
                message.channel.send({ embeds: [dissable] });
            } else {
                await client.db.get(`${message.guild.id}_wl`).then(async (data) => {
                    const users = data.whitelisted;
                    let i;
                    for (i = 0; i < users.length; i++) {
                        let data2 = await client.db?.get(`${message.guild.id}_${users[i]}_wl`);
                        if (data2) {
                            await client.db?.delete(`${message.guild.id}_${users[i]}_wl`);
                        }
                    }
                });

                await client.db.set(`${message.guild.id}_antinuke`, null);
                await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] });

                const disabled = new MessageEmbed()
                    .setThumbnail(client.user.displayAvatarURL())
                    .setColor(0xf9fd17)
                    .setDescription(`**Security Settings For ${message.guild.name} ${protect}\nSuccessfully disabled security settings for this server.\n\nCurrent Status: ${disable}\n\nTo Enable use ${prefix}antinuke enable**`);
                message.channel.send({ embeds: [disabled] });
            }
        } else if (option === 'config') {
            // Send Antinuke configuration
            message.channel.send({ embeds: [configEmbed] });
        } else {
            return message.channel.send({ embeds: [antinuke] });
        }
    }
};
