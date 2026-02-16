var express = require('express');
var router = express.Router();
var mysql=require('mysql');
/* GET users listing. */

var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"db_control"
}); 

router.post('/', function (req, res) {

    let search = req.body.search;

    let sql = `
        SELECT *
        FROM tbl_employee e
        INNER JOIN tbl_district d ON e.district_id = d.district_id
        INNER JOIN tbl_state s ON d.state_id = s.state_id
        INNER JOIN tbl_designation m ON e.designation_id = m.designation_id
        INNER JOIN tbl_leave l ON l.employee_id = e.employee_id
        INNER JOIN tbl_login z ON e.login_id = z.login_id
        WHERE (
            e.employee_id_num LIKE '%${search}%'
            OR e.employee_name LIKE '%${search}%'
            OR d.District_name LIKE '%${search}%'
            OR m.designation LIKE '%${search}%'
            OR s.state LIKE '%${search}%'
        )
        AND z.status = 'Active'
    `;
console.log(sql);
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        // ✅ send only once
        res.send(result);
    });
});


module.exports = router;