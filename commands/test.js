const emotes = require("../jsons/emotes.json");

module.exports = {
    name: 'test',
    description: 'testt',
    aliases: ["t"],
    execute(message, args) {
        message.channel.send(`${emotes.Ahri}`);
    }
}