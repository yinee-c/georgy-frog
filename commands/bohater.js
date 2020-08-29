const champs = require('lol-champions');

module.exports = {
    name: 'bohater',
    description: 'bohater',
    execute(message, args) {
        message.channel.reply(`losowy bohater dla ciebie to: ${champs[Math.random() * champs.length]}`);
    }
}