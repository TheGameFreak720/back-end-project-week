const db = require('../dbConfig');

module.exports = {
    add: function(user) {
        return db('users').insert(user);
    },

    get: function(user) {
        return db('users').where('username', user.username)
    },
}