const { MessageEmbed } = require ('discord.js')

module.exports = {
    name: 'play',
    category: 'music',
    aliases: ['p'],

    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply('you need to join a voice channel.');
        if (!args.length) return message.reply('you need to give me a URL or a search term.');

        const query = args.join(' ');

        

        
    
        const botCurrentVoiceChannelId =
          message.guild?.members.me?.voice.channelId;
    
        if (
          botCurrentVoiceChannelId &&
          message.member.voice.channelId &&
          message.member.voice.channelId !== botCurrentVoiceChannelId
        ) {
          return await message.reply({
            content: `You must be connnected to the same voice channel as me to use this command. <#${botCurrentVoiceChannelId}>`,
          });
        }
    
        const player = client.music.create({
          guild: message.guildId,
          textChannel: message.channelId,
          voiceChannel: message.member?.voice.channelId,
          selfDeafen: true,
          volume: 100,
        });
    
        if (player.state !== "CONNECTED") player.connect();
    
        const result = await player.search(query, message.author);
    
        switch (result.loadType) {
          case "empty":
            if (!player.queue.current) player.destroy();
    
            return await message.reply({
              content: `Load failed when searching for \`${query}\``,
            });
    
          case "error":
            if (!player.queue.current) player.destroy();
    
            return await message.reply({
              content: `No matches when searching for \`${query}\``,
            });
    
          case "track":
            player.queue.add(result.tracks[0]);
    
            if (!player.playing && !player.paused && !player.queue.length) {
              await player.play();
            }
    
            return await message.reply({
              content: `Added [${result.tracks[0].title}](${result.tracks[0].uri}) to the queue.`,
            });
    
          case "playlist":
            if (!result.playlist?.tracks) return;
    
            player.queue.add(result.playlist.tracks);
    
            if (
              !player.playing &&
              !player.paused &&
              player.queue.size === result.playlist.tracks.length
            ) {
              await player.play();
            }
    
            return await message.reply({
              content: `Added [${result.playlist.name}](${query}) playlist to the queue.`,
            });
    
          case "search":
            player.queue.add(result.tracks[0]);
            if (!player.playing && !player.paused && !player.queue.length) {
              await player.play();
            }
    
            return await message.reply({
              content: `Added [${result.tracks[0].title}](${result.tracks[0].uri}) to the queue.`,
            });
        }
    }
}
