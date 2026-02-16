var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* ✅ Use connection pool (recommended) */
var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_control",
    connectionLimit: 10
});

/* GET job vacancy list */
router.get('/', function (req, res) {

    /* ✅ Disable cache to avoid 304 */
    res.set({
        'Cache-Control': 'no-store',
        'Pragma': 'no-cache',
        'Expires': '0'
    });

    const sql = "SELECT * FROM tbl_project";
    console.log(sql);

    pool.query(sql, function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(result); // ✅ Always return 200
    });
});

module.exports = router;