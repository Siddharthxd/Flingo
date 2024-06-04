const {
    Message,
    Client,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js')
module.exports = {
    name: 'channellog',
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

     if(data) {
    await client.db.set(`logs_${message.guild.id}`,{ 
        voice : data ? data.voice : null,
        channel : channel.id,
        rolelog : data ? data.rolelog : null,
        modlog : data ? data.modlog : null,   
        message : data ? data.message : null,
        memberlog : data ? data.memberlog : null
    })
    await message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor(0xf9fd17)
            .setTitle('Channel Logs Configured')
            .setDescription(`The channel ${channel} has been successfully configured for logging channel-related events.`)
            .addField('Types of Channel Logging Enabled', '\`Channel Create\`\n\`Channel Delete\`\n\`Channel Update\`')
            .addField('What happens now?', 'The bot will log channel creation, deletion, and updates in the configured channel.')
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