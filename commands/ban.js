let discord = require('discord.js');
let config = require('../jsons/config.json');
let emotes = require('../jsons/emotes.json');

var cce = require('./functions/createEmbedError.js');

module.exports = {
    name: 'zablokuj',
    description: 'Wyrzuca oraz blokuje gracza z serwera',
    aliases: ['ban'],
    field: 'mod',
    execute(message, args) {
        let reason = args.slice(1).join(" ");
        let mentionedMember = message.mentions.members.first();

        if(!message.member.hasPermission("BAN_MEMBERS")) {
            cce.start(message, "Nie posiadasz odpowiednich uprawnień do tego");
            message.react(emotes.bad_react);
            return;
        }

        if(!args[0]) {
            cce.start(message, "Jakiego gracza chcesz zablokować?");
            message.react(emotes.bad_react);
            return;
        }

        if(!args[1]) {
            cce.start(message, "Powód, dla którego chcesz zablokować tego gracza?");
            message.react(emotes.bad_react);
            return;
        }

        if(!mentionedMember) {
            cce.start(message, "Nie znalazłem takiego gracza na tym serwerze");
            message.react(emotes.bad_react);
            return;
        }

        if(mentionedMember.roles.highest.position > message.member.roles.highest.position) {
            cce.start(message, "Nie możesz zablokować kogoś, kto jest wyżej od ciebie");
            message.react(emotes.bad_react);
            return;
        }

        if(mentionedMember.id === message.author.id) {
            cce.start(message, "Chyba oszalałeś, że zablokujesz samego siebie");
            message.react(emotes.bad_react);
            return;
        }

        if(mentionedMember.id === message.guild.owner.id) {
            cce.start(message, "Jego to na pewno nie zablokujesz");
            message.react(emotes.bad_react);
            return;
        }

        if(!mentionedMember.bannable) {
            cce.start(message, "Tego gracza nie da się zablokować");
            message.react(emotes.bad_react);
            return;
        }

        let embed = new discord.MessageEmbed()
            .setTitle("Zablokowanie")
            .setColor(config.Colors["fajna zielen"])
            .setDescription(`Zablokowano gracza \`${mentionedMember.user.username}\` za **${reason}**`)
            .setTimestamp(Date.now())
            .setFooter(`Aktywowano przez: ${message.author.username}`, message.author.avatarURL({dynamic: true}));
        message.channel.send(embed);
        message.react(emotes.good);
        mentionedMember.user.send(`Zostałeś zablokowany na serwerze **${message.guild.name}** przez **${message.author.username}** za **${reason}**`).catch(console.log);
        mentionedMember.ban({reason: `${reason}`});
    }
}