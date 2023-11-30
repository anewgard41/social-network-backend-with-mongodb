const { connect, connection } = require('mongoose');

// Wrapping mongoose around local connection to the local db. Naming db socialNetworkDB
connect("mongodb://127.0.0.1:27017/socialNetworkDB");

module.exports = connection;