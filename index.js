const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./jsons/config.json');
const fs = require('fs');

const db = require('quick.db');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const handlerFiles = fs.readdirSync('./handlers/').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);

    if(command.aliases && Array.isArray(command.aliases)) command.aliases.forEach(alias => client.aliases.set(alias, command.name));
}

for(const file of handlerFiles) {
    require(`./handlers/${file}`)(client);
}

client.once('ready', () => {
    client.user.setActivity(`Z ${client.users.cache.size} użytkownikami, na ${client.guilds.cache.size} serwerach`);
    console.log('Grzegorz - KumKum');
});

client.on('message', message => {
    if(message.author.bot) return;
    if(message.channel.id !== '754450647083909160') return;
    //bot channel - 754450647083909160
    
    if(!message.content.startsWith(config.Bot.Prefix)) return;

    const args = message.content.slice(config.Bot.Prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    let cmd = client.commands.get(command);
    if(!cmd) cmd = client.commands.get(client.aliases.get(command));
    if(cmd)
        cmd.execute(message, args);

});

client.login(config.Bot.Token);