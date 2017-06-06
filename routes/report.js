var express = require('express');
var router = express.Router();
var pool = require('../config/db')();

//모든 report
router.get('/:image/:type/:nickname/:content/:latitude/:longitude', function (req, res, next) {
    var type = parseInt(req.params.type);
    var content = req.params.content;
    var nickname = req.params.nickname;
    var image = req.params.image;
    var longitude = parseFloat(req.params.longitude);
    var latitude = parseFloat(req.params.latitude);

    pool.getConnection(function (err, conn) {
        var sqlForCreateReport = 'INSERT INTO report(type, nickname, content, latitude, longitude, image, reg_date) VALUES (?,?,?,?,?,?,?,now())';
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
