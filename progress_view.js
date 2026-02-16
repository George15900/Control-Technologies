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
let sql=`select * from tbl_progress pr inner join tbl_workassign a on pr.workassign_id=a.workassign_id inner join tbl_employee b on a.employee_id=b.employee_id 
          inner join tbl_workdivide w on a.work_id=w.work_id inner join tbl_project p on w.project_id=p.project_id
          order by pr.progress_date DESC;`;
con.query(sql, function(err, result){ 
    if(err)
        {(console.log(err));}
res.send(result);
});

});

module.exports = router;