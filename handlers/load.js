const fs = require('fs');
const ascii = require("ascii-table");

let table = new ascii("Grzegorz");
table.setHeading("Komenda", "Status", "Alias", "Opis");

module.exports = (client) => {
    let dir = __dirname.replace("handlers", "commands");
    const commands = fs.readdirSync(dir).filter(file => file.endsWith(".js"));
    
    for (let file of commands) {
        let pull = require(`../commands/${file}`);

        if (pull.name) {
            client.commands.set(pull.name, pull);
            table.addRow(file, '✅', pull.aliases, pull.description);
        } else {
            table.addRow(file, `❌`);
            continue;
        }

        if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
    }

    console.log(table.toString());
}