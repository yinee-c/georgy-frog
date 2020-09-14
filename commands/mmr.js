const discord = require("discord.js");
const emotes = require("../jsons/emotes.json");
const request = require('request');
const config = require('../jsons/config.json');;

var cee = require('./functions/createEmbedError.js');

module.exports = {
    name: 'mmr',
    description: 'Informacje MMR danego przywoływacza',
    field: 'lol',
    execute(message, args) {
        if(!args[0]) {
            cee.start(message, "A może tak nazwa przywoływacza?");
            message.react(emotes.bad_react);
            return;
        }

        if(args[0] == "info") {
            message.react(emotes.good);
            let embed = new discord.MessageEmbed()
            .setTitle(`Informacje na temat MMR`)
            .setColor(config.Colors["fajna zielen"])
            .setDescription(`MMR lub MatchMaking Rating to liczba używana przez League of Legends do reprezentowania poziomu umiejętności gracza. Twoje MMR określa przeciwników, z którymi grasz i jest unikalne dla każdego trybu gry. WhatIsMyMMR konkretnie śledzi solowe, nieprecyzyjne mecze rozgrywane w kolejkach rankingowych, normalnych i ARAMowych. Dowiedz się więcej o MMR na [stronie Riot](https://support-leagueoflegends.riotgames.com/hc/en-us/articles/201752954-Matchmaking-Guide).`)
            .addField("Jak dokładne jest to MMR?", `Na przykład, szacowany MMR na poziomie 1200 ±100 oznacza, że rzeczywisty MMR jest prawdopodobny gdzieś pomiędzy 1100 a 1300.`)
            .setTimestamp(Date.now())
            .setFooter(`Aktywowano przez: ${message.author.username}`, message.author.avatarURL({dynamic: true}));
            message.channel.send(embed);

            return;
        }

        if(!args[1]) {
            cee.start(message, "Zapomniałeś o podaniu mi regionu!");
            message.react(emotes.bad_react);
            return;
        }

        let realRegion = config["League of Legends"].mmrSettings.availableRegions[`${args[1].toUpperCase()}`];
        if(realRegion == undefined) {
            cee.start(message, "Najwyrażniej nie obsługuje takiego regionu!");
            //console.log("region undefined");
            message.react(emotes.bad_react);
            return;
        }

        let finalSummoner = args[0].replace(/_/g, " ");
        let summoner = args[0].replace(/_/g, "+");

        request(`https://${realRegion}${config["League of Legends"].mmrSettings.mmrApi}${summoner}`, function(error,response,body) {
            console.error(`mmr.js -> ${error}`);

            let data = JSON.parse(body);

            if(data.error) {
                cee.start(message, "Brak MMR dla tego przywolywacza.");
                message.react(emotes.bad_react);
                return;
            }

            let summ = data.ranked["summary"].replace(/<b>/g, "`").replace(/<[/]b>/g, "`");
            let summ2 = summ.replace("<br><br>", "\n");
            let finalSumm = summ2.replace("<span class=\"symbol--micro\"></span>", "");

            let aram_avg = data.ARAM.avg;
            let normal_avg = data.normal.avg;
            let ranked_avg = data.ranked.avg;

            if(aram_avg == null)    aram_avg = "Brak";
            if(normal_avg == null)  normal_avg = "Brak";
            if(ranked_avg == null)  ranked_avg = "Brak";

            message.react(emotes.good);

            let embed = new discord.MessageEmbed()
                .setTitle(`MMR przywoływacza ${finalSummoner}`)
                .setColor(config.Colors["fajna zielen"])
                .setDescription(`Ranked Solo/Duo - ${ranked_avg} **[±${data.ranked.err}]**\n${finalSumm}`)
                .addField("Normale", `${normal_avg} **[±${data.normal.err}]**`, true)
                .addField("Aramy", `${aram_avg} **[±${data.ARAM.err}]**`, true)
                .setTimestamp(Date.now())
                .setFooter(`Aktywowano przez: ${message.author.username}`, message.author.avatarURL({dynamic: true}));
            message.channel.send(embed);
        });
    }
}