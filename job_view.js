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



let sql=`select * from tbl_jobapplication a inner join tbl_login l on a.jobseeker_id=l.login_id inner join tbl_job_vacancy v
          on a.job_id =v.job_id inner join tbl_jobseeker j on l.login_id=j.login_id inner join tbl_designation d on v.designation_id =d.designation_id`;

con.query(sql, function(err, result){ 
    if(err)
        {(console.log(err));}
res.send(result);
});

});

module.exports = router;