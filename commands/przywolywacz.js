const discord = require("discord.js");
const emotes = require("../jsons/emotes.json");
const config = require("../jsons/config.json");

const teemojs = require("teemojs");
let LeagueAPI = teemojs(config["League of Legends"].ApiKeys.riotGamesApiKey);

var cee = require('./functions/createEmbedError.js');

function createEmbedProfile_NoRanked(message, summoner, ranked) {
    let embed = new discord.MessageEmbed()
        .setTitle(`Przywoływacz ${summoner.name}`)
        .setColor(config.Colors["fajna zielen"])
        .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/${config["League of Legends"].Versions.version_lol}/img/profileicon/${summoner.profileIconId}.png`)
        .addField("Level", `${summoner.summonerLevel}`)
        .setTimestamp(Date.now())
        .setFooter(`Aktywowano przez: ${message.author.username}`, message.author.avatarURL({dynamic: true}));

    message.channel.send(embed);
}

function createEmbedProfile_OneOnly(message, summoner, ranked) {
    let embed = new discord.MessageEmbed()
        .setTitle(`Przywoływacz ${summoner.name}`)
        .setColor(config.Colors["fajna zielen"])
        .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/${config["League of Legends"].Versions.version_lol}/img/profileicon/${summoner.profileIconId}.png`)
        .addField("Level", `${summoner.summonerLevel}`)
        .addField(`${config["League of Legends"].przywolywaczCommand[`${ranked[0].queueType}`]} - ${ranked[0].leaguePoints} LP`, `${ranked[0].tier} ${ranked[0].rank} \`(W: ${ranked[0].wins}|P: ${ranked[0].losses})\``)
        .setTimestamp(Date.now())
        .setFooter(`Aktywowano przez: ${message.author.username}`, message.author.avatarURL({dynamic: true}));

    message.channel.send(embed);
}

function createEmbedProfile(message, summoner, ranked) {
    let embed = new discord.MessageEmbed()
        .setTitle(`Przywoływacz ${summoner.name}`)
        .setColor(config.Colors["fajna zielen"])
        .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/${config["League of Legends"].Versions.version_lol}/img/profileicon/${summoner.profileIconId}.png`)
        .addField("Level", `${summoner.summonerLevel}`)
        .addField(`${config["League of Legends"].przywolywaczCommand[`${ranked[0].queueType}`]} - ${ranked[0].leaguePoints} LP`, `${ranked[0].tier} ${ranked[0].rank} \`(W: ${ranked[0].wins}|P: ${ranked[0].losses})\``, true)
        .addField(`${config["League of Legends"].przywolywaczCommand[`${ranked[1].queueType}`]} - ${ranked[1].leaguePoints} LP`, `${ranked[1].tier} ${ranked[1].rank} \`(W: ${ranked[1].wins}|P: ${ranked[1].losses})\``, true)
        .setTimestamp(Date.now())
        .setFooter(`Aktywowano przez: ${message.author.username}`, message.author.avatarURL({dynamic: true}));
ranked
    message.channel.send(embed);
}

module.exports = {
    name: 'przywolywacz',
    description: 'Informacje danego bohatera',
    aliases: ['nick'],
    field: 'lol',
    execute(message, args) {
        if(!args[0]) {
            cee.start(message, "A może tak nazwa przywoływacza?");
            message.react(emotes.bad_react);
            return;
        }

        if(!args[1]) {
            cee.start(message, "Zapomniałeś o podaniu mi regionu.");
            message.react(emotes.bad_react);
            return;
        }

        let realRegion = config["League of Legends"].regions[`${args[1].toUpperCase()}`];
        if(realRegion == undefined) {
            cee.start(message, "Nie ma takiego regionu!");
            message.react(emotes.bad_react);
            return;
        }

        LeagueAPI.get(`${realRegion}`, `${config["League of Legends"].ApiFuncs.przywolywacz}`, `${args[0]}`).then(summoner =>  {

            if(summoner == null) {
                message.react(emotes.bad_react);
                cee.start(message, "Cóż, nie znalazłem takiego przywoływacza.");
                return;
            }

            message.react(emotes.good);
            LeagueAPI.get(`${realRegion}`, `${config["League of Legends"].ApiFuncs.rankingPrzywolywacza}`, `${summoner["id"]}`).then(summonerRanked => {
                LeagueAPI.get(`${realRegion}`, `${config["League of Legends"].ApiFuncs.masteriaBohaterow}`, `${summoner["id"]}`).then(summonerMasteries => {
                    if(!Object.keys(summonerRanked).length || summonerRanked[0].queueType == undefined) {
                        createEmbedProfile_NoRanked(message, summoner, summonerRanked);
                        return;
                    }
    
                    if(Object.keys(summonerRanked).length > 1) createEmbedProfile(message, summoner, summonerRanked);
                    else createEmbedProfile_OneOnly(message, summoner, summonerRanked);
                }).catch(console.log);
            }).catch(console.log);
        }).catch(console.log);
    }
}