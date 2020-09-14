const discord = require("discord.js");
const config = require('../../jsons/config.json');
const emotes = require('../../jsons/emotes.json');

module.exports = {
    start(message, why) {
        let embed = new discord.MessageEmbed()
            .setDescription(`${emotes.bad} ${why}`)
            .setColor(config.Colors["blad embed"])
            .setTimestamp(Date.now())
            .setFooter(`Aktywowano przez: ${message.author.username}`, message.author.avatarURL({dynamic: true}));
    
        message.channel.send(embed);
    }   
}