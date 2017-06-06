/**
 * Created by 차은별 on 2017-06-06.
 */
var express = require('express');
var router = express.Router();
var pool = require('../config/db')();

//모든 report
router.route('/')
    .get(function (req, res, next) {
        pool.getConnection(function (err, conn) {
            var sqlForReportList = 'SELECT * FROM report ORDER BY id DESC';
            conn.query(sqlForReportList, function (err, reports) {
                if (err) {
                    conn.release();
                    throw err;
                } else {
                    res.json(reports);
                    conn.release();
                }
            });
        });
    })
    .post(function (req, res) {
        var type = req.body.type;
        var content = req.body.content;
        var image = req.body.image;
        var longitude = req.body.longitude;
        var latitude = req.body.latitude;

        pool.getConnection(function (err, conn) {
            var sqlForPostReportCreate = 'INSERT INTO report(type, content, image, longitude, latitude) VALUES (?,?,?,?,?)';
            conn.query(sqlForPostReportCreate, [type, content, image, longitude, latitude], function (err, row) {
                if (err) {
                    conn.release();
                    throw err;
                } else {
                    res.json({"response": "ok"});
                    conn.release();
                }
            });
        })
    })

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
