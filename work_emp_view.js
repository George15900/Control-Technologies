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



let id = req.body.id;
let date = new Date().toISOString().slice(0, 10);
let sql=`select * from tbl_workassign a inner join tbl_employee b on a.employee_id=b.employee_id 
          inner join tbl_workdivide w on a.work_id=w.work_id inner join tbl_project p on w.project_id=p.project_id
          inner join tbl_login l on b.login_id =l.login_id where b.login_id='${id}' and a.endassign_date >= '${date}'`;
console.log(id);
con.query(sql, function(err, result){ 
    if(err)
        {(console.log(err));}
res.send(result);
});

});

module.exports = router;