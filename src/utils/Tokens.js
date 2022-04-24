const SessionToken = {
    tokens: [],
    add: function(token) {
        this.tokens.push(token);
    },
    find: function(token) {
        return this.tokens.find(t => t === token);
    }
}

module.exports = SessionToken;
