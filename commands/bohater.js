const champs = require('lol-champions');

module.exports = {
    name: 'bohater',
    description: 'bohater',
    execute(message, args) {
        var randomNumber = Math.floor(Math.random()*champs.length);
        let randomChamp = champs[randomNumber]["name"];
        message.reply(`losowy bohater dla ciebie to: ${randomChamp}`);
    }
}