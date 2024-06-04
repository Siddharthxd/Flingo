const {
    Message,
    Client,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js')
module.exports = {
    name: 'logall',
    aliases: [],
    category: 'mod',
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_GUILD')) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(0xf9fd17)
                        .setDescription(
                            `${client.emoji.cross} | You must have \`MANAGE SERVER\` permissions to use this command.`
                        )
                ]
            })
        }
        if (!client.util.hasHigher(message.member)) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(0xf9fd17)
                        .setDescription(
                            `${client.emoji.cross} | You must have a higher role than me to use this command.`
                        )
                ]
            })
        }

    let channel = getChannelFromMention(message, args[0]) || message.guild.channels.cache.get(args[0])
if(!channel){
    await message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor(0xf9fd17)
            .setTitle('Invalid Channel')
            .setDescription('Please provide a valid channel for channel logs.')
        ],
      });
    }
if(channel) {
    let data = await client.db.get(`logs_${message.guild.id}`)
    if(!data){
        await client.db.set(`logs_${message.guild.id}`,{ 
            voice : null,
            channel : null,
            rolelog : null,
            modlog : null,   
            message : null,
            memberlog : null
        })
        const initialMessage = await message.channel.send({
            embeds: [new MessageEmbed().setColor(0xf9fd17).setDescription('Configuring your server...')],
          });
          await client.util.sleep(2000);
          initialMessage.edit({
            embeds: [
              new MessageEmbed()
                .setColor(0xf9fd17)
                .setTitle('Server Configuration Successful')
                .setDescription('Your server has been successfully configured for logging.')
            ],
          });
                }

        if(data){
    await client.db.set(`logs_${message.guild.id}`,{ 
        voice : channel.id,
        channel : channel.id,
        rolelog : channel.id,
        modlog : channel.id,   
        message : channel.id,
        memberlog : channel.id
    })
    await message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor(0xf9fd17)
            .setTitle('Logging All Events Configured')
            .setDescription(`The channel ${channel} has been successfully configured for logging all types of events.`)
            .addField('Types of Logging Enabled', '\`Message (Update, Delete)\`\n\`Member (Join, Leave, Role Update)\`\n\`Role (Create, Update, Delete)\`\n\`Channel (Create, Update, Delete)\`\n\`Modlog (Ban, Unban, Kick)\`\n \`Voice Logs (Member join,leave,move)\`')
            .addField('What happens now?', 'The bot will log various events in the configured channel, including messages, member actions, role changes, server updates, and channel modifications.')
        ],
      });
      }
    }
}
}
function getChannelFromMention(message, mention) {
    if (!mention) return null;

    const matches = mention.match(/^<#(\d+)>$/); 
    if (!matches) return null;

    const channelId = matches[1];
    return message.guild.channels.cache.get(channelId);
}
