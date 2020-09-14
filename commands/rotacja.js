const emotes = require("../jsons/emotes.json");
const champ_ids = require("../jsons/champion-ids.json");
const discord = require("discord.js");
const config = require("../jsons/config.json");

let LeagueAPI = require("leagueapiwrapper");
const { Region } = require('leagueapiwrapper/LeagueAPI/classes');
LeagueAPI = new LeagueAPI(`${config["League of Legends"].ApiKeys.riotGamesApiKey}`, Region.NA);

module.exports = {
    name: 'rotacja',
    description: 'Rotacja bohaterów',
    aliases: ["free"],
    field: 'lol',
    execute(message, args) {
        LeagueAPI.getFreeChampionRotation().then(champsRotation => {
            message.react(emotes.good);
            let msg = ``;
            for (let index = 0; index < champsRotation.freeChampionIds.length; index++) {
                const element = champsRotation.freeChampionIds[index];
                let champName = champ_ids[`${element}`];
                let champEmote = emotes[`${champName}`];
                msg += `${champEmote} \`${champName}\`\n`;
            }
    
            let embed = new discord.MessageEmbed()
            .setTitle("Tygodniowa rotacja bohaterów")
            .setDescription(msg)
            .setColor(config.Colors["fajna zielen"])
            .setTimestamp(Date.now())
            .setFooter(`Aktywowano przez: ${message.author.username}`, message.author.avatarURL({dynamic: true}));
            message.channel.send(embed);
        });
    }
}