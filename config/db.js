module.exports = function () {
    var mysql = require('mysql');

    var pool = mysql.createPool({
        host: '52.78.1.190',
        port : 3306,
        user : 'test',
        password : '1111',
        database:'streetDB',
        connectionLimit:20,
        waitForConnections:false
    });

    return pool;
};