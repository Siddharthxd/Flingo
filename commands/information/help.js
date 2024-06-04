const {
    MessageEmbed,
    Message,
    MessageActionRow,
    MessageButton,
    MessageSelectMenu,
    Client,
  } = require("discord.js");
  
  module.exports = {
    name: "help",
    aliases: ["h"],
    category: "info",
    run: async (client, message, args) => {
      let prefix = ".";
      const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("helpop")
          .setPlaceholder(`❯ ${client.user.username} Help Menu!`)
          .addOptions([
            {
              label: "Security",
              description: "Get All Security Command List",
              value: "first",
              emoji: "<:flingo_antinuke:1245358013548597341>",
            },
            {
              label: "Moderation",
              description: "Get All Moderation Command List",
              value: "second",
              emoji: "<:flingo_mod:1245359512009834526>",
            },
            {
              label: "Utility",
              description: "Get All Utility Command List",
              value: "third",
              emoji: "<:flingo_utility:1245360608870793339>",
            },
            {
              label: "Voice",
              description: "Get All Voice Command List",
              value: "fourth",
              emoji: "<:flingo_voice:1245361013000241232>",
            },
            {
              label: "Custom Role",
              description: "Get All Custom Role Command List",
              value: "fifth",
              emoji: "<:flingo_customrole:1245363522788130929>",
            },
            {
              label: "Giveaway",
              description: "Get All Giveaway Command List",
              value: "six",
              emoji: "<:flingo_tada:1245364020823720027>",
            },
            {
              label: "Music",
              description: "Get All Music Command List",
              value: "seven",
              emoji: "<:flingo_music:1246491890636034059>",
            },
          ]),
      );
      let user = await client.users.fetch(`1243874333810626570`)
      const embed = new MessageEmbed()
        .setColor(0xf9fd17)
        .setAuthor({
          name: 'Flingo#4883 Help Panel!',
          iconURL: (client.user.displayAvatarURL())
        })
        .setThumbnail(client.user.displayAvatarURL())
        .setImage('https://media.discordapp.net/attachments/1245356971155132510/1245371823072477245/standard.gif?ex=66588264&is=665730e4&hm=06f946091398958f444b7de561dc21c72fac8f3db444d526a1a2bf9909bb1d98&=&width=1440&height=83')
        .setDescription(
          `<:flingo_dots:1245359086963261492> Prefix for this server \`${prefix}\`\n<:flingo_dots:1245359086963261492>  Total Commands: \`${client.commands.size}\`**\n[Invite Me](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) | [Support Server](https://discord.gg/flingo)**\n<:flingo_reply:1245365005919195208>**__Main Modules__**\n<:flingo_antinuke:1245358013548597341> \`:\` Security\n<:flingo_mod:1245359512009834526>  \`:\` Moderation\n<:flingo_utility:1245360608870793339> \`:\` Utility\n<:flingo_voice:1245361013000241232> \`:\` Voice\n<:flingo_customrole:1245363522788130929> \`:\` Custom Role \n<:flingo_tada:1245364020823720027> \`:\` Giveaway\n<:flingo_music:1246491890636034059><:flingo_soon:1246488965507321887> \`:\` Music`,
        )
        .setFooter({
          text: `Made By siddharth.xd_`,
          iconURL: user.displayAvatarURL({
              dynamic: true
          })
      })
      message.channel.send({ embeds: [embed], components: [row] });
    },
  };