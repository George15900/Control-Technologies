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

router.get('/',function( req, res, next) {
 let y = new Date().getFullYear();
let sql=`select * from tbl_leave l inner join tbl_employee e  on l.employee_id = e.employee_id 
       inner join tbl_login z on e.login_id =z.login_id where z.status="Active" and Year='${y}'`;
console.log(sql);
con.query(sql, function(err, result){ 
    if(err)
        {(console.log(err));}
res.send(result);
});

});
module.exports = router;