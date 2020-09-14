let discord = require('discord.js');
let config = require('../jsons/config.json');
let emotes = require('../jsons/emotes.json');

var cee = require('./functions/createEmbedError.js');

module.exports = {
    name: 'usun',
    description: 'Usuwa wiadomości na danym kanale',
    aliases: ['purge'],
    field: 'mod',
    execute(message, args) {
        var temp = parseInt(args[0]) || 0;

        if(temp < 1 || temp > 99) {
            cee.start(message, "Wpisz ile wiadomości chcesz usunąć, nie mniej niż `0` i nie więcej niż `100`");
            message.react(emotes.bad_react);
            return;
        }

        message.channel.messages.fetch({limit: temp}).then(messages => {
            const unpinnedMessages = messages.filter(message => !(message.pinned));
            message.channel.bulkDelete(unpinnedMessages, true);
        }).catch(console.log);
    }
}