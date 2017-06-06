/**
 * Created by 차은별 on 2017-06-06.
 */
var express = require('express');
var router = express.Router();
var pool = require('../config/db')();

//모든 report
router.get('/create/:image/:type/:nickname/:content/:latitude/:longitude', function (req, res, next) {
    var type = parseInt(req.param.type);
    var content = req.param.content;
    var nickname = req.param.nickname;
    var image = req.param.image;
    var longitude = parseFloat(req.param.longitude);
    var latitude = parseFloat(req.param.latitude);

    console.log(type, content, image, longitude, latitude, nickname);

    pool.getConnection(function (err, conn) {
        var sqlForCreateReport = 'INSERT INTO report(type, content, nickname, image, longitude, latitude) VALUES (?,?,?,?,?,?)';
        conn.query(sqlForCreateReport, [type, content, nickname, image, longitude, latitude], function (err, row) {
            if (err) {
                conn.release();
                throw err;
            } else {
                res.json({"response": "ok"});
                conn.release();
            }
        });
    });
});


module.exports = router;
