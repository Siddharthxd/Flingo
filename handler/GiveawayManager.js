const { GiveawaysManager } = require("discord-giveaways");
const Model = require("../models/Giveaways");

module.exports = class extends GiveawaysManager {
  constructor(client) {
    super(client, {
      default: {
        botsCanWin: false,
        embedColor: '#00e3ff',
        embedColorEnd: '#00e3ff',
        reaction: '<:flingo_tada:1245364020823720027>',
      },
    });
  }

  async getAllGiveaways() {
    return await Model.find().lean().exec();
  }

  async saveGiveaway(messageId, giveawayData) {
    await Model.create(giveawayData);
    return true;
  }

  async editGiveaway(messageId, giveawayData) {
    await Model.updateOne({ messageId }, giveawayData, { omitUndefined: true }).exec();
    return true;
  }

  async deleteGiveaway(messageId) {
    await Model.deleteOne({ messageId }).exec();
    return true;
  }
};
