module.exports = function () {
    var mysql = require('mysql');

    var pool = mysql.createPool({
        host: 'localhost',
        port : 3306,
        user : 'test',
        password : '1111',
        database:'streetreportDB',
        connectionLimit:20,
        waitForConnections:false
    });

    return pool;
};