
const { MessageEmbed } = require("discord.js")
const Flingo = require('../structures/Flingo');
module.exports = 
/**
 * 
 * @param {Flingo} client 
 */
async (client) => {
    client.music.on("nodeConnect", async (node) => {
        client.logger.log(`Node ${node} connected`, 'ready')
    })
    client.music.on("nodeError", async (node, error) => {
        client.logger.log(`Node ${node} had an error: ${error}`, 'error')
    })

    client.music.on("trackStart", async (player, track) => {
        const channel = client.channels.cache.get(player.textChannel);
        const embed = new MessageEmbed()
        .setTitle(`Now playing`)
        .setDescription(`[${track.title}](${track.uri})`)
        .setColor(client.color)
        .setTimestamp()
        channel.send(embed)
    
    })
}