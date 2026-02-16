var express = require('express');
var router = express.Router();
var mysql = require('mysql');
/* GET users listing. */

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_control"
});

router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var sql = `select * from tbl_login where Username='${username}' and 
        password='${password}'`;
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) { (console.log(err)); }
        res.send(result);
    });

});

module.exports = router;