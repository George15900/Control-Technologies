var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_control"
});

router.post('/', function (req, res) {

    let id = req.body.jobseeker_id;
    let name = req.body.jobseeker_name;
    let gmail = req.body.jobseeker_email;
    let contact = req.body.jobseeker_contact;
    let qalif = req.body.jobseeker_qualific;
    let dob = req.body.jobseeker_dob;
    let photo = req.body.jobseeker_photo;

    let sql = `update tbl_jobseeker set 
        jobseeker_name='${name}',
        jobseeker_email='${gmail}',
        jobseeker_contact='${contact}',
        jobseeker_qualific='${qalif}',
        jobseeker_dob='${dob}',
        jobseeker_photo='${photo}'
        where jobseeker_id='${id}'`;

    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.send({ message: 'Failed' });
        } else {
            res.send({ message: 'Success' });
        }
    });
});

module.exports = router;
