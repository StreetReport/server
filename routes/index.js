var express = require('express');
var router = express.Router();
var pool = require('../config/db')();
/* GET home page. */
// router.get('/', function (req, res, next) {
//     res.render('index', {title: 'Express'});
// });

router.get('/:type', function (req, res, next) {
    var type = req.params.type;
    var arr = type.split('&');
    for(var i=0; i<arr.length; i++){
        arr[i] = arr[i].split('=')[1];
    }

    type = parseInt(arr[0]);
    var nickname = arr[1];
    var content = arr[2];
    var latitude = parseFloat(arr[3]);
    var longitude = parseFloat(arr[4]);
    var image = arr[5];


    pool.getConnection(function (err, conn) {
        var sqlForCreateReport = 'INSERT INTO report(type, nickname, content, latitude, longitude, image, reg_date) VALUES (?, ?, ?, ?, ?, ?, NOW())';
        conn.query(sqlForCreateReport, [type, nickname, content, latitude, longitude, image], function (err, row) {
            if (err) {
                console.log(err);
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
