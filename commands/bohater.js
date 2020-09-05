const champs = require('lol-champions');
const emotes = require("../jsons/emotes.json");
const colors = require("../jsons/colors.json");
const discord = require("discord.js");

module.exports = {
    name: 'bohater',
    description: 'bohater',
    aliases: ['champ'],
    execute(message, args) {
        var randomNumber = Math.floor(Math.random()*champs.length);
        let randomChamp = champs[randomNumber]["name"];
        let backgroundChamp = randomChamp;
        let champEmote = emotes[`${randomChamp}`];

        if(backgroundChamp === "Kai'Sa")    backgroundChamp = "Kaisa";
        if(backgroundChamp === "Jarvan IV")    backgroundChamp = "JarvanIV";
        if(backgroundChamp === "Kha'Zix")    backgroundChamp = "Khazix";
        if(backgroundChamp === "Kog'Maw")    backgroundChamp = "KogMaw";
        if(backgroundChamp === "LeBlanc")    backgroundChamp = "Leblanc";
        if(backgroundChamp === "Kha'Zix")    backgroundChamp = "Khazix";
        if(backgroundChamp === "Miss Fortune")    backgroundChamp = "MissFortune";
        if(backgroundChamp === "Master Yi")    backgroundChamp = "MasterYi";
        if(backgroundChamp === "Wukong")    backgroundChamp = "MonkeyKing";
        if(backgroundChamp === "Nunu & Willump") backgroundChamp = "Nunu";
        if(backgroundChamp === "Rek'Sai") backgroundChamp = "RekSai";
        if(backgroundChamp === "Tahm Kench") backgroundChamp = "TahmKench";
        if(backgroundChamp === "Twisted Fate") backgroundChamp = "TwistedFate";
        if(backgroundChamp === "Vel'Koz") backgroundChamp = "Velkoz";
        if(backgroundChamp === "Xin Zhao") backgroundChamp = "XinZhao";
        if(backgroundChamp === "Aurelion Sol") backgroundChamp = "AurelionSol";
        if(backgroundChamp === "Dr. Mundo") backgroundChamp = "DrMundo";

        let embed = new discord.MessageEmbed()
            .setTitle("Losowy Bohater")
            .addField("Mój żabi umysł wybrał ci tego bohatera:", `${champEmote} ${randomChamp}`)
            .setImage(`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${backgroundChamp}_0.jpg`)
            .setColor(colors["fajna zielen"])
            .setTimestamp(Date.now())
            .setFooter(`Aktywowano przez: ${message.author.username}`, message.author.avatarURL({dynamic: true}));
        message.channel.send(embed);
        //message.reply(`losowy bohater dla ciebie to: ${champEmote} ${randomChamp}`);65402
    }
}