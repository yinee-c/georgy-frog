let emotes = require('../jsons/emotes.json');
let discord = require('discord.js');
let config = require('../jsons/config.json');
const fetch = require('node-fetch');

var cee = require('./functions/createEmbedError.js');

module.exports = {
    name: 'przedmiot',
    description: 'Informacje danego przedmiotu',
    aliases: ['item'],
    field: 'lol',
    execute(message, args) {

        fetch(`http://ddragon.leagueoflegends.com/cdn/${config["League of Legends"].Versions.version_lol}/data/pl_PL/item.json`, {method: "Get"})
            .then(res => res.json())
            .then((json) => {
                var exists = 0;
                var zaklecieOnce = 0;
                var foreachIndex = 1;
                let realItemName = args[0].replace(/_/g, " ");

                Object.keys(json["data"]).forEach(function(key) {
                    let ids = json["data"];
                    let itemName = ids[`${key}`]["name"];
                    let itemThumbnail = ids[`${key}`]["image"]["full"];
                    let itemDescripion = ids[`${key}`]["description"]
                        .replace(/<br>/g, "\n").replace(/<u>/g, "").replace(/<[/]u>/g, "")
                        .replace(/<stats>/g, "").replace(/<[/]stats>/g, "")
                        .replace(/<mana>/, "").replace(/<[/]mana>/, "")
                        .replace(/<unique>/g, "**").replace(/<[/]unique>/g, "**").replace(/<active>/g, "**").replace(/<[/]active>/g, "**").replace(/<passive>/g, "**").replace(/<[/]passive>/g, "**")
                        .replace(/<rules>/g, "__").replace(/<[/]rules>/g, "__")
                        .replace(/<specialRules>/g, "`").replace(/<[/]specialRules>/g, "`")
                        .replace(/<a href='SpecialJungleExperience'>/g, "").replace(/<[/]a>/g, "")
                        .replace(/<font color='#99BBBB'>/g, "`").replace(/<font color='#FF8811'>/g, "`").replace(/<[/]font>/g, "`")
                        .replace(/<groupLimit>/g, "__").replace(/<[/]groupLimit>/g, "__")
                        .replace(/<scaleLevel>/g, "**").replace(/<[/]scaleLevel>/g, "**")
                        .replace(/<scaleHealth>/g, "**").replace(/<[/]scaleHealth>/g, "**");
                    let itemCost = ids[`${key}`]["gold"]["total"];
                    let itemSell = ids[`${key}`]["gold"]["sell"];
        
                    if(realItemName === itemName) {
                        if(itemName == "Zaklęcie: Żar" || itemName == "Zaklęcie: Krwawe Szpony" || itemName == "Zaklęcie: Runiczne Echa" || itemName == "Zaklęcie: Wojownik") {
                            exists = 1;
                            if(zaklecieOnce == 1)   return;
                            if(!args[1]) {
                                zaklecieOnce = 1;
                                message.react(emotes.bad_react);
                                cee.start(message, "Jaki typ zaklęcia? `niebieski/czerwony`");
                                return;
                            }
                            let zzz = args[1];
                            var zaklecie = config["League of Legends"].przedmiotCommand[`${zzz.toLowerCase()}`];

                            if(zaklecie === null) {
                                zaklecieOnce = 1;
                                message.react(emotes.bad_react);
                                cee.start(message, "Zły typ zaklęcia! `niebieski/czerwony`");
                                return;
                            }

                            if(foreachIndex == zaklecie) {
                                let embed = new discord.MessageEmbed()
                                .setTitle(`${itemName}`)
                                .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/${config["League of Legends"].Versions.version_lol}/img/item/${itemThumbnail}`)
                                .setDescription(`\`Koszt: ${itemCost} | Sprzedaż: ${itemSell}\` \n${itemDescripion}`)
                                .setColor(config.Colors["fajna zielen"])
                                .setTimestamp(Date.now())
                                .setFooter(`Aktywowano przez: ${message.author.username}`, message.author.avatarURL({dynamic: true}));
                
                                message.channel.send(embed);
                                message.react(emotes.good);
                                zaklecieOnce = 1;
                            }
                            foreachIndex++;
                            return;
                        }
                        if(exists == 1) return;
                        exists++;
                        let embed = new discord.MessageEmbed()
                            .setTitle(`${itemName}`)
                            .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/${config["League of Legends"].Versions.version_lol}/img/item/${itemThumbnail}`)
                            .setDescription(`\`Koszt: ${itemCost} | Sprzedaż: ${itemSell}\` \n${itemDescripion}`)
                            .setColor(config.Colors["fajna zielen"])
                            .setTimestamp(Date.now())
                            .setFooter(`Aktywowano przez: ${message.author.username}`, message.author.avatarURL({dynamic: true}));
            
                        message.channel.send(embed);
                        message.react(emotes.good);
                    }
                });
        
                if(exists === 0) {
                    cee.start(message, "Przedmiot nie istnieje!");
                    message.react(emotes.bad_react);
                    return;
                }
            });
    }
}