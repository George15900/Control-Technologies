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

    let n = Number(req.body.noofleave || 0);
    let date = new Date().toISOString().slice(0, 10);
    let y = new Date().getFullYear();

    let sq2 = `
        SELECT e.total_leave,e.employee_id 
        FROM tbl_employee e
        INNER JOIN tbl_login z ON e.login_id = z.login_id
        WHERE z.status = 'Active'`;
    con.query(sq2, (err, result) => {  //Execute
        if (err)
            throw err;
        // console.log(result)
        for (let i = 0; i < result.length; i++) {
            let empid = result[i].employee_id;
            let leave = result[i].total_leave;
            let totalleave = n + leave;
            let completed = 0;
            console.log(empid)
            let sql = `insert into tbl_leave(employee_id,post_date,Year,noofleave) values(?,?,?,?)`;
            con.query(sql, [empid, date, y, totalleave], (err, result1) => {
                console.log(sql, [empid, date, y, totalleave]);
                if (err)
                    throw err;

                let sql1 = `update tbl_employee set total_leave='${totalleave}' where employee_id ='${empid}'`;
                con.query(sql1, (err, result2) => {
                    if (err)
                        throw err;
                    completed++;
                    if (completed === result.length) {
                    }
                });
            });
        }
        res.send({ message: 'Success' });
    });
});

module.exports = router;
