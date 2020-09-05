const discord = require("discord.js");
const colors = require("../jsons/colors.json");
const emotes = require("../jsons/emotes.json");
const config = require("../jsons/config.json");
const region = require("../jsons/regions.json");
const funcs = require("../jsons/functions.json");
const types = require("../jsons/league-types.json");

const teemojs = require("teemojs");
let LeagueAPI = teemojs(config.riotGamesApiKey_abcdefgh);

function createEmbedError(message, why) {
    let embed = new discord.MessageEmbed()
        .setDescription(`${emotes.bad} ${why}`)
        .setColor(colors["blad embed"])
        .setTimestamp(Date.now())
        .setFooter(`Aktywowano przez: ${message.author.username}`, message.author.avatarURL({dynamic: true}));

    message.channel.send(embed);
}

function createEmbedProfile_NoRanked(message, summoner, ranked) {
    let embed = new discord.MessageEmbed()
        .setTitle(`Przywoływacz ${summoner.name}`)
        .setColor(colors["fajna zielen"])
        .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/10.16.1/img/profileicon/${summoner.profileIconId}.png`)
        .addField("Level", `${summoner.summonerLevel}`)
        .setTimestamp(Date.now())
        .setFooter(`Aktywowano przez: ${message.author.username}`, message.author.avatarURL({dynamic: true}));

    message.channel.send(embed);
}

function createEmbedProfile_OneOnly(message, summoner, ranked) {
    let embed = new discord.MessageEmbed()
        .setTitle(`Przywoływacz ${summoner.name}`)
        .setColor(colors["fajna zielen"])
        .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/10.16.1/img/profileicon/${summoner.profileIconId}.png`)
        .addField("Level", `${summoner.summonerLevel}`)
        .addField(`${types[`${ranked[0].queueType}`]}`, `${ranked[0].tier} ${ranked[0].rank}`)
        .setTimestamp(Date.now())
        .setFooter(`Aktywowano przez: ${message.author.username}`, message.author.avatarURL({dynamic: true}));

    message.channel.send(embed);
}

function createEmbedProfile(message, summoner, ranked) {
    let embed = new discord.MessageEmbed()
        .setTitle(`Przywoływacz ${summoner.name}`)
        .setColor(colors["fajna zielen"])
        .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/10.16.1/img/profileicon/${summoner.profileIconId}.png`)
        .addField("Level", `${summoner.summonerLevel}`)
        .addField(`${types[`${ranked[0].queueType}`]}`, `${ranked[0].tier} ${ranked[0].rank}`, true)
        .addField(`${types[`${ranked[1].queueType}`]}`, `${ranked[1].tier} ${ranked[1].rank}`, true)
        .setTimestamp(Date.now())
        .setFooter(`Aktywowano przez: ${message.author.username}`, message.author.avatarURL({dynamic: true}));
ranked
    message.channel.send(embed);
}

module.exports = {
    name: 'przywolywacz',
    description: 'informacje na temat przywolywacza',
    aliases: ['nick'],
    execute(message, args) {
        //console.log(args[0]);
        if(!args[0]) {
            //console.log("argument is missing");
            createEmbedError(message, "A może tak nazwa przywoływacza?");
            message.react(emotes.bad_react);
            return;
        }

        if(!args[1]) {
            createEmbedError(message, "Zapomniałeś o podaniu mi regionu.");
            message.react(emotes.bad_react);
            return;
        }

        var s = 0;

        let realRegion = region[`${args[1]}`];
        if(realRegion == undefined) {
            createEmbedError(message, "Nie ma takiego regionu!");
            //console.log("region undefined");
            message.react(emotes.bad_react);
            return;
        }
        else
        {
            console.log("found right region");
            s = 1;
        }

        /*for (var i = 0; i < Object.keys(region).length; i++) {
            console.log(`checking ${realRegion} with ${region[`${i}`]}`);
            if(realRegion == region[i]) {
                s = 1;
                console.log("found right region");
            }
        }*/

        if(s != 1) {
            message.react(emotes.bad_react);
            return;
        }

        LeagueAPI.get(`${region[`${args[1]}`]}`, `${funcs.przywolywacz}`, `${args[0]}`).then(summoner =>  {

            if(summoner == null) {
                message.react(emotes.bad_react);
                createEmbedError(message, "Cóż, nie znalazłem takiego przywoływacza.");
                return;
            }

            message.react(emotes.good);
            //console.log(summoner);
            LeagueAPI.get(`${region[`${args[1]}`]}`, `${funcs.rankingPrzywolywacza}`, `${summoner["id"]}`).then(summonerRanked => {
                //console.log(summonerRanked);
                if(!Object.keys(summonerRanked).length || summonerRanked[0].queueType == undefined) {
                    createEmbedProfile_NoRanked(message, summoner, summonerRanked);
                    return;
                }

                if(Object.keys(summonerRanked).length > 1) createEmbedProfile(message, summoner, summonerRanked);
                else createEmbedProfile_OneOnly(message, summoner, summonerRanked);
            }).catch(console.log);
        }).catch(console.log);
    }
}