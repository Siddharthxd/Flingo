const { Client, Collection, Intents, WebhookClient } = require('discord.js')
const fs = require('fs')
const mongoose = require('mongoose')
const Utils = require('./util')
const { glob } = require('glob')
const { promisify } = require('util')
const { Database } = require('quickmongo')
const axios = require('axios')
const Sweepers = require('./Sweepers')
const { QuickDB } = require("quick.db");
const { Manager } = require('magmastream');


module.exports = class Flingo extends Client {
    constructor() {
        super({
            intents: 3276543,
            fetchAllMembers: false,
            shards: 'auto',
            disableEveryone: true
        })

        this.music = new Manager({
            nodes: [
                {
        host: 'lavalink4.alfari.id',
        identifier: 'Node 1',
        password: 'catfein',
        port: 443,
        retryAmount: 1000,
        retrydelay: 10000,
        resumeStatus: true, 
        resumeTimeout: 1000,
        secure: true,
                }
            ],
            send: (id, payload) => {
                const guild = client.guilds.cache.get(id);
                // NOTE: FOR ERIS YOU NEED JSON.stringify() THE PAYLOAD
                if (guild) guild.shard.send(payload);
            },        
        })
        this.config = require(`${process.cwd()}/config.json`)
        this.logger = require('./logger')
        this.commands = new Collection()
        this.categories = fs.readdirSync('./commands/')
        this.emoji = {
            tick: '<:flingo_tick:1245366034618384455>',
            cross: '<:flingo_cross:1245366342337560677>',
            dot: '<:flingo_dots:1245359086963261492>'
        }
        this.util = new Utils(this)
        this.Sweeper = new Sweepers(this)
        this.color = `0x2b2d31`
        this.support = `https://discord.gg/flingo`
        this.cooldowns = new Collection()
        this.snek = require('axios')
        this.ratelimit = new WebhookClient({
            url: 'https://discord.com/api/webhooks/1245357335413788723/UL3tN1ZHU63CqYUEgeajaOSBzRJHeHiGGVJolk_iIjnkEJ55kmmz2sWmnzHC-diLCmsi'
        })
        this.error = new WebhookClient({
            url: 'https://discord.com/api/webhooks/1245357335413788723/UL3tN1ZHU63CqYUEgeajaOSBzRJHeHiGGVJolk_iIjnkEJ55kmmz2sWmnzHC-diLCmsi'
        })

        this.on('error', (error) => {
            this.error.send(`\`\`\`js\n${error.stack}\`\`\``)
        })
        process.on('unhandledRejection', (error) => {
            this.error.send(`\`\`\`js\n${error.stack}\`\`\``)
        })
        process.on('uncaughtException', (error) => {
            this.error.send(`\`\`\`js\n${error.stack}\`\`\``)
        })
        process.on('warning', (warn) => {
            this.error.send(`\`\`\`js\n${warn}\`\`\``)
        })
        process.on('uncaughtExceptionMonitor', (err, origin) => {
            this.error.send(`\`\`\`js\n${err},${origin}\`\`\``)
        })
        this.on('rateLimit', (info) => {
            this.ratelimit.send({
                content: `\`\`\`js\nTimeout: ${info.timeout},\nLimit: ${info.limit},\nMethod: ${info.method},\nPath: ${info.path},\nRoute: ${info.route},\nGlobal: ${info.global}\`\`\``
            })
        })
    }
    async initializedata() {
        this.data = new QuickDB()
        this.logger.log(`Connecting to Sql...`)
        this.logger.log('Sql Database Connected', 'ready')
    }
    async initializeMongoose() {
        this.db = new Database(this.config.MONGO_DB)
        this.db.connect()
        this.logger.log(`Connecting to MongoDb...`)
        mongoose.connect(this.config.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        this.logger.log('Mongoose Database Connected', 'ready')
    }

    async loadEvents() {
        fs.readdirSync('./events/').forEach((file) => {
            let eventName = file.split('.')[0]
            require(`${process.cwd()}/events/${file}`)(this)
            this.logger.log(`Updated Event ${eventName}.`, 'event')
        })
    }

    async loadlogs() {
        fs.readdirSync('./logs/').forEach((file) => {
            let logevent = file.split('.')[0]
            require(`${process.cwd()}/logs/${file}`)(this)
            this.logger.log(`Updated Logs ${logevent}.`, 'event')
        })
    }
    async loadMain() {
        const commandFiles = []

        const commandDirectories = fs.readdirSync(`${process.cwd()}/commands`)

        for (const directory of commandDirectories) {
            const files = fs
                .readdirSync(`${process.cwd()}/commands/${directory}`)
                .filter((file) => file.endsWith('.js'))

            for (const file of files) {
                commandFiles.push(
                    `${process.cwd()}/commands/${directory}/${file}`
                )
            }
        }
        commandFiles.map((value) => {
            const file = require(value)
            const splitted = value.split('/')
            const directory = splitted[splitted.length - 2]
            if (file.name) {
                const properties = { directory, ...file }
                this.commands.set(file.name, properties)
            }
        })
        this.logger.log(`Updated ${this.commands.size} Commands.`, 'cmd')
    }
}
