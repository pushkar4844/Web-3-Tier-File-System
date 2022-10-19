// connect to the mysql database
const mysql = require('mysql2');

let config = require('./config/dev').config;

// TODO - Set process env variables for production
if(process.env.NODE_ENV === 'production') {
    console.log('Using production config');
    config = require('./config/prod').config;
    console.log({config});
}


const connection = mysql.createConnection(config);

// connect to the database
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

// export the connection
module.exports = connection;

