const champs = require('lol-champions');
const emotes = require("../emotes.json");

module.exports = {
    name: 'bohater',
    description: 'bohater',
    execute(message, args) {
        var randomNumber = Math.floor(Math.random()*champs.length);
        let randomChamp = champs[randomNumber]["name"];
        let champEmote = emotes[`${randomChamp}`];
        message.reply(`losowy bohater dla ciebie to: ${champEmote} ${randomChamp}`);
    }
}