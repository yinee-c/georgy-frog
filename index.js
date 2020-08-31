const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
const champs = require('lol-champions');

const prefix = "g!";

const config = require('./config.json');

const fs = require('fs');
const { count } = require('console');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Katarina jest dostępna do twojej dyspozycji!');

    let champs_in_game = 'Dostępni bohaterowie: ';
    var count_champs = 0;
    for(var i = 0; i < champs.length; i++)
    {
        if(i != champs.length)
            champs_in_game += `${champs[i]["name"]}, `;
        else
            champs_in_game += `${champs[i]["name"]}.`;
        count_champs++;
    }
    console.log(champs_in_game);

    let stat = Math.floor(Math.random() * 3) + 1
    switch(stat)
    {
        case 1:
            {
                console.log("sets neeko status.");
                client.user.setActivity("Neeko", {type:'LISTENING'});
                break;
            }
        case 2:
            {
                console.log("sets patch status.");
                let url = "https://ddragon.leagueoflegends.com/api/versions.json";
                let settings = {method: "Get"};
        
                fetch(url, settings)
                    .then(res => res.json())
                    .then((json) => {
                        client.user.setActivity(`Patch: ${json[0]}`, {type:'PLAYING'}).catch(err => {console.log(err);});
                    });
                break;
            }
        case 3:
            {
                console.log("sets champion status");
                client.user.setActivity(`${count_champs} bohaterów`, {type:'PLAYING'});
            }
    }
});

client.on('message', message => {
    if(message.author.bot) return;

    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'kum') {
        client.commands.get('kum').execute(message, args);
    }
    if(command === 'bohater') {
        client.commands.get('bohater').execute(message, args);
    }

    //debug command.
    if(command === 'test') {
        client.commands.get('bohater').execute(messsage, args);
    }
});

client.login(process.env.token);