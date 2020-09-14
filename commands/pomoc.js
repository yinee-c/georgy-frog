let discord = require('discord.js');
let config = require('../jsons/config.json');
let emotes = require('../jsons/emotes.json');
const fs = require('fs');

module.exports = {
    name: 'pomoc',
    description: 'Ta komenda.',
    aliases: ['help'],
    field: 'normal',
    execute(message, args) {
        let dir = __dirname.replace("handlers", "commands");
        const commands = fs.readdirSync(dir).filter(file => file.endsWith(".js"));
        let normal = "Brak";
        let lol = 'Brak';
        let mod = 'Brak';
        for(let file of commands) {
            let pull = require(`../commands/${file}`);

            if(pull.field === 'lol') {
                if(lol === 'Brak')   lol = '';
                lol += `\`${pull.name}\` - ${pull.description}\n`;
            }
            if(pull.field === 'normal') {
                if(normal === 'Brak')   normal = '';
                normal += `\`${pull.name}\` - ${pull.description}\n`;
            }
            if(pull.field === 'mod') {
                if(mod === 'Brak')   mod = '';
                mod += `\`${pull.name}\` - ${pull.description}\n`;
            }
        }
        
        message.react(emotes.good);
        let embed = new discord.MessageEmbed()
            .setTitle("Kum kum, pomocy!")
            .addFields(
                {name: "Zwykłe", value: `${normal}`},
                {name: "League of Legends", value: `${lol}`},
                {name: "Moderacyjne", value: `${mod}`},
                {name: "Informacja", value: "Grzegorz nie jest wspierany przez Riot Games i nie odzwierciedla poglądów i opinii Riot Games lub osób oficjalnie zaangażowanych w tworzenie lub zarządzanie League of Legends. League of Legends i Riot Games są znakami towarowymi lub zastrzeżonymi znakami towarowymi firmy Riot Games, Inc. League of Legends © Riot Games, Inc."},
            )
            .setColor(config.Colors["fajna zielen"])
            .setThumbnail("https://cdn.discordapp.com/app-icons/749383114694066346/3967dab4d6b72ae5ee87e2939cc9c6c6.png")
            .setTimestamp(Date.now())
            .setFooter(`Aktywowano przez: ${message.author.username}`, message.author.avatarURL({dynamic: true}));
        message.channel.send(embed);
    }
}