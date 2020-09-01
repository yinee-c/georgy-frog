const LeagueAPI = require('leagueapiwrapper');

module.exports = {
    name: 'rotacja',
    description: 'rotacja',
    execute(message, args) {
        message.channel.send(LeagueAPI.getFreeChampionRotation());
    }
}