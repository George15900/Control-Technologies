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
 
router.post('/',function( req, res, next) {
let id = req.body.loginid;
let discription = req.body.description;
let Starting = req.body.start;
let Ending = req.body.end;
let difference = Math.abs(new Date(Ending) - new Date(Starting));
let days = Math.ceil(difference / (1000 * 60 * 60 * 24)) + 1;
let l='Requested';
//  console.log(Starting,Ending,days,difference);

 let sql = `select * from tbl_employee where login_id=${id}`;
        con.query(sql, function (err, result2) {
      if (err) { (console.log(err)); }
      let emp_id = result2[0].employee_id;


let sql=`insert into tbl_leave_request (reason,employee_id,leave_start,leave_end,leave_statues,leave_no_date) 
values(?,?,?,?,?,?);`;
con.query(sql,[discription,emp_id,Starting,Ending,l,days]);
res.send({message:'Success'});
});
});
module.exports = router;