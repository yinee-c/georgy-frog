const emo = require('../emoji.js');

module.exports = {
    name: 'test',
    description: 'test',
    execute(message, args) {
        message.channel.send(emo.emoji("749754895233581089"));
    }
}