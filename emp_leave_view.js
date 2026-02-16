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
     let J = new Date().toISOString().slice(0, 10);
let sql=`select * from tbl_leave_request r inner join tbl_employee e on r.employee_id=e.employee_id
    where r.leave_end >='${J}'`;
console.log(sql);
con.query(sql, function(err, result){ 
    if(err)
        {(console.log(err));}
res.send(result);
});

});

module.exports = router;
