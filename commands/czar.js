const fetch = require('node-fetch');
let emotes = require('../jsons/emotes.json');
let discord = require('discord.js');
let config = require("../jsons/config.json");

var cee = require('./functions/createEmbedError.js');

module.exports = {
    name: 'czar',
    description: 'Informacja danego czaru',
    aliases: ['summoner'],
    field: 'norlolmal',
    execute(message, args) {
        if(!args[0]) {
            message.react(emotes.bad_react);
            cee.start(message, "Podaj czar przywoływacza!");
            return;
        }

        let argument = args[0].replace(/_/g, " ");

        let all_info = `http://ddragon.leagueoflegends.com/cdn/${config["League of Legends"].Versions.version_lol}/data/pl_PL/summoner.json`;
        let settings = {method: "Get"};
        fetch(all_info, settings)
            .then(res => res.json())
            .then((json) => {
                let czar = json.data[`${config["League of Legends"].czarCommand[`${argument.toLowerCase()}`]}`];
                if(czar == undefined) {
                    message.react(emotes.bad_react);
                    cee.start(message, "Nie ma takiego czaru przywoływacza!");
                    return;
                }

                message.react(emotes.good);

                let embed = new discord.MessageEmbed()
                    .setColor(config.Colors["fajna zielen"])
                    .setTitle(`${czar.name}`)
                    .setDescription(`${czar.description}`)
                    .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/${config["League of Legends"].Versions.version_lol}/img/spell/${czar.id}.png`)
                    .setTimestamp(Date.now())
                    .setFooter(`Aktywowano przez: ${message.author.username}`, message.author.avatarURL({dynamic: true}));
                message.channel.send(embed);
        }).catch(console.log);
    }
}