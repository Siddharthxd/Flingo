module.exports = async (client) => {
    client.on('raw',  (d) => {
   
        client.music.updateVoiceState(d)
})}
