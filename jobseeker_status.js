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

let sql=`select * from tbl_jobapplication a  inner join tbl_job_vacancy v on
         a.job_id = v.job_id inner join tbl_designation d on
         v.designation_id = d.designation_id 
          where a.jobseeker_id ='${id}' and a.apply_status='approved'`;
console.log(id);
con.query(sql, function(err, result){ 
    if(err)
        {(console.log(err));}
res.send(result);
});

});

module.exports = router;