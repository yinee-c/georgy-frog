module.exports = {
    emoji: function(id) {
        return client.emojis.get(id).toString();
    }
};