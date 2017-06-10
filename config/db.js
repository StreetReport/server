module.exports = function () {
    var mysql = require('mysql');

    var pool = mysql.createPool({
        host: '52.78.1.190',
        port : 3306,
        user : 'root',
        password : '1111',
        database:'streetDB',
        connectionLimit:10,
        waitForConnections:false,
        multipleStatements : true
    });

    return pool;
};