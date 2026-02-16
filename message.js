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
let discription = req.body.Description;
 let date = new Date().toISOString().slice(0, 10);
let Status = 'Requested';
//  console.log(Starting,Ending,days,difference);

 let sql = `select * from tbl_employee where login_id=${id}`;
        con.query(sql, function (err, result2) {
      if (err) { (console.log(err)); }
      let emp_id = result2[0].employee_id;


let sql=`insert into tbl_message (Message,employee_id,message_Date,Status) 
values(?,?,?,?);`;
con.query(sql,[discription,emp_id,date,Status]);
res.send({message:'Success'});
});
});
module.exports = router;