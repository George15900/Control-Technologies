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
let id = req.body.emp_Id;

let sql=`select * from tbl_employee e inner join tbl_district d  on e.district_id = d.district_id 
         inner join tbl_state s on d.state_id =s.state_id inner join tbl_designation m on
         e.designation_id = m.designation_id inner join tbl_leave l on l.employee_id=e.employee_id
         inner join tbl_login z on e.login_id = z.login_id where e.employee_id ='${id}' or e.login_id='${id}'
         and z.status='Active'`;
console.log(id);
con.query(sql, function(err, result){ 
    if(err)
        {(console.log(err));}
res.send(result);
});

});

module.exports = router;