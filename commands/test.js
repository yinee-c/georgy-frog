module.exports = {
    name: 'test',
    description: 'testt',
    execute(message, args) {
        const emo = require('../emoji.js');
        message.channel.send(emo.emoji("749754895233581089"));
    }
}