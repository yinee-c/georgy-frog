const champs = require('lol-champions');
const emotes = require("../jsons/emotes.json");
const config = require("../jsons/config.json");
const discord = require("discord.js");
const fetch = require('node-fetch');

var cee = require('./functions/createEmbedError.js');

module.exports = {
    name: 'bohater',
    description: 'Informacje danego/losowego bohatera',
    aliases: ['champ'],
    field: 'lol',
    execute(message, args) {
        let backgroundChamp, champEmote, randomChamp, all_info, settings;
        var randomNumber;

        if(!args[0]) {
            randomNumber = Math.floor(Math.random()*champs.length);
            randomChamp = champs[randomNumber]["name"];
        } else {
            randomChamp = args[0];
        }

        backgroundChamp = randomChamp;
        champEmote = emotes[`${randomChamp}`];
        
        all_info = `http://ddragon.leagueoflegends.com/cdn/${config["League of Legends"].Versions.version_lol}/data/pl_PL/champion.json`;
        settings = {method: "Get"};


        fetch(all_info, settings)
        .then(res => res.json())
        .then((json) => {
            if(!args[0]) {
                message.react(emotes.good);
                let embed = new discord.MessageEmbed()
                    .setTitle(`${randomChamp}`)
                    .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/${config["League of Legends"].Versions.version_lol}/img/champion/${json.data[`${randomChamp}`].image.full}`)
                    .setImage(`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${json.data[`${randomChamp}`].id}_0.jpg`)
                    .setDescription(`${json.data[`${randomChamp}`].title}`)
                    .addField("Historia bohatera", `${json.data[`${randomChamp}`].blurb}  [czytaj dalej](https://universe.leagueoflegends.com/pl_PL/champion/${json.data[`${randomChamp}`].id}/).`)
                    .setColor(config.Colors["fajna zielen"])
                    .setTimestamp(Date.now())
                    .setFooter(`Aktywowano przez: ${message.author.username}`, message.author.avatarURL({dynamic: true}));
                message.channel.send(embed);
            } else {
                let realChampion = json.data[`${randomChamp}`];
                if(realChampion == undefined) {
                    cee.start(message, "Nie ma takiego bohatera!");
                    message.react(emotes.bad_react);
                    return;
                }
                message.react(emotes.good);
                let embed = new discord.MessageEmbed()
                    .setTitle(`${randomChamp}`)
                    .setDescription(`${json.data[`${randomChamp}`].title}`)
                    .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/${config["League of Legends"].Versions.version_lol}/img/champion/${json.data[`${randomChamp}`].image.full}`)
                    .addField("Historia bohatera", `${json.data[`${randomChamp}`].blurb} [czytaj dalej](https://universe.leagueoflegends.com/pl_PL/champion/${json.data[`${randomChamp}`].id}/).`)
                    .setImage(`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${json.data[`${randomChamp}`].id}_0.jpg`)
                    .setColor(config.Colors["fajna zielen"])
                    .setTimestamp(Date.now())
                    .setFooter(`Aktywowano przez: ${message.author.username}`, message.author.avatarURL({dynamic: true}));
                message.channel.send(embed);
            }
    }).catch(console.log);
    }
}