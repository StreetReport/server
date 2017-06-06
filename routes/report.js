/**
 * Created by 차은별 on 2017-06-06.
 */
var express = require('express');
var router = express.Router();
var pool = require('../config/db')();

//모든 report
router.get('/:type/:userNickname/:content/:image/:longitude/:latitude', function (req, res, next) {
    var type = parseInt(req.param.type);
    var content = req.param.content;
    var image = req.param.image;
    var longitude = parseFloat(req.param.longitude);
    var latitude = parseFloat(req.param.latitude);

    pool.getConnection(function (err, conn) {
        var sqlForCreateReport = 'INSERT INTO report(type, content, image, longitude, latitude) VALUES (?,?,?,?,?)';
        conn.query(sqlForCreateReport, [type, content, image, longitude, latitude], function (err, row) {
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

//read
router.get('/report/:id', function (req, res, next) {
    var id = req.params.id;

    pool.getConnection(function (err, conn) {
        var sqlForReportDetail = 'SELECT * FROM report WHERE id=' + id;
        conn.query(sqlForReportDetail, function (err, row) {
            if (err) {
                conn.release();
                throw err;
            } else {
                res.json(row[0]);
                conn.release();
            }
        });
    });
});

module.exports = router;
