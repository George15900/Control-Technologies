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
    let J=req.body.id;
    console.log(J);
let sql=`select * from tbl_leave_request r inner join tbl_employee e on r.employee_id=e.employee_id 
          inner join tbl_leave l on l.employee_id=e.employee_id where e.login_id='${J}'`;

console.log(sql);
con.query(sql, function(err, result){ 
    if(err)
        {(console.log(err));}
res.send(result);
});

});

module.exports = router;