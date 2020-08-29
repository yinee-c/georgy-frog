const champs = require('lol-champions');

module.exports = {
    name: 'bohater',
    description: 'bohater',
    execute(message, args) {
        message.channel.send(`losowy bohater dla ciebie to: ${champs[Math.random() * champs.length]}`);
    }
}