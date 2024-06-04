module.exports = async (client) => {
    client.on('ready', async () => {
        client.music.init(client.user.id);
        client.user.setPresence({
            activities: [
                {
                    name: `FASTERTHANTACHYON`,
                    type: `LISTENING`
                }
            ],
            status: `dnd`
        })
        client.logger.log(`Logged in to ${client.user.tag}`, 'ready')
    })

}
