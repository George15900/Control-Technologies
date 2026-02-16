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
let id = req.body.leave_request_id;
let s = req.body.status;
if('Approved' == s){
let sql = `update tbl_leave_request set leave_statues='${s}' where leave_request_id ='${id}'`;
console.log(sql);
con.query(sql, function(err, result){ 
    if(err)
        {(console.log(err));}

let sql = `select * from tbl_leave_request where leave_request_id=${id}`;
        con.query(sql, function (err, result2) {
      if (err) { (console.log(err)); }
      let emp_id = result2[0].employee_id;
      let leave = result2[0].leave_no_date;

let sql = `select * from tbl_employee where employee_id=${emp_id}`;
        con.query(sql, function (err, result2) {
      if (err) { (console.log(err)); }
      let leave2 = result2[0].total_leave;
        leave = leave2 - leave;
      let sql = `update tbl_employee set total_leave='${leave}' where employee_id ='${emp_id}'`;
console.log(sql);
con.query(sql, function(err, result){ 
    if(err)
        {(console.log(err));}
res.send({message:'Success'});
});
});
});
});
}
else{
    let sql1 = `update tbl_leave_request set leave_statues='${s}' where leave_request_id  ='${id}'`;
    console.log(sql1);
con.query(sql1, function(err, result){ 
    if(err)
        {(console.log(err));}
res.send({message:'Success'});
});
}
});

module.exports = router;