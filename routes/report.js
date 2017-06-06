var express = require('express');
var router = express.Router();
var pool = require('../config/db')();

//모든 report
router.get('/:type', function (req, res, next) {
    var type = req.params.type;
    var arr = type.split('&');
    for(var i=0; i<arr.length; i++){
        arr[i] = arr[i].split('=')[1];
    }

    var type = parseInt(arr[0]);
    var nickname = arr[1];
    var content = arr[2];
    var latitude = parseFloat(arr[3]);
    var longitude = parseFloat(arr[4]);
    var image = arr[5];
    var reg_date = Date.now();

    console.log(type, content, nickname, image, longitude, latitude);

    pool.getConnection(function (err, conn) {
        var sqlForCreateReport = 'INSERT INTO report(type, nickname, content, latitude, longitude, image, reg_date) VALUES (?,?,?,?,?,?,?,?)';
        conn.query(sqlForCreateReport, [type, nickname, content, latitude, longitude, image, reg_date], function (err, row) {
            if (err) {
                conn.release();
                throw err;
            } else {
                res.json(row);
                conn.release();
            }
        });
    });
});


module.exports = router;
