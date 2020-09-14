const emotes = require("../jsons/emotes.json");

module.exports = {
    name: 'test',
    description: 'testt',
    aliases: ["t"],
    field: 'dev',
    execute(message, args) {
        if(message.author.id == 395614648709283840)
        {
            message.channel.send(`${emotes.Ahri}`);
        }
    }
}