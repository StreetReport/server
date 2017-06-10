var express = require('express');
var router = express.Router();
var pool = require('../config/db')();

//신고리스트
router.get('/:nickname', function (req, res) {
    var nickname = req.params.nickname;
    pool.getConnection(function (err, conn) {
        var sqlForReportList = 'SELECT * FROM report WHERE nickname=? ORDER BY idx DESC';
        conn.query(sqlForReportList, nickname, function (err, rows) {
            if (err) {
                console.log(err);
                conn.release();
                throw err;
            } else {
                res.json({"result":rows});
                conn.release();
            }
        });
    });
});

router.get('/:type', function (req, res) {
    var type1 = req.params.type;
    var arr = type1.split('&');
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split('=')[1];
    }

    var type = parseInt(arr[0]);
    var nickname = arr[1];
    var content = arr[2];
    var latitude = parseFloat(arr[3]);
    var longitude = parseFloat(arr[4]);
    var image = arr[5];

    console.log(typeof type);
    console.log(typeof nickname);
    console.log(typeof content);
    console.log(typeof latitude);
    console.log(typeof longitude);
    console.log(typeof image);


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