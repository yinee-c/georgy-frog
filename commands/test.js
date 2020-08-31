const emotes = require("../emotes.json");

module.exports = {
    name: 'test',
    description: 'testt',
    execute(message, args) {
        message.channel.send(`${emotes.Ahri}`);
    }
}