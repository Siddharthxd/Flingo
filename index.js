const wait = require('wait')
require('dotenv').config()
require('module-alias/register')
const path = require('path')
const Flingo = require(`./structures/Flingo.js`)
const client = new Flingo()
const GiveawayManager = require("./handler/GiveawayManager");

client.giveawaysManager = new GiveawayManager(client);
client.emoji = {
    'giveaway': '<a:giveaway2:1027531088135991337>'
  };

this.config = require(`${process.cwd()}/config.json`);
(async () => {
    await client.initializeMongoose()
    await client.initializedata()
    await wait(3000);
    (await client.loadEvents()) - (await client.loadlogs())
    await client.loadMain()
    await client.login('token')

})()
