const fetch = require('node-fetch');
const fs = require('fs');

const dir = __dirname;
const configFile = `${__dirname.replace('handlers', 'jsons')}/config.json`;
console.log(configFile);
const File = require(configFile);

module.exports = (client) => {

    fetch(`https://ddragon.leagueoflegends.com/api/versions.json`, {method: "Get"})
    .then(res => res.json())
    .then((json) => {
        console.log("Retrieving LEAGUE OF LEGENDS version...")
        let realVersion = json[0];
        File["League of Legends"]["Versions"].version_lol = realVersion;

        fs.writeFile(configFile, JSON.stringify(File, null, 2), function writeJson(err) {
            if(err) return console.log(err);
            console.log(`Retrieved ${realVersion} and saved to ${configFile}`);
        });
    });
    
}