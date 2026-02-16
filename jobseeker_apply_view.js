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

let loginid = req.body.id;
let id = req.body.jid;
console.log(loginid,id);
let sql2=`select * from  tbl_jobapplication where jobseeker_id='${loginid}' and job_id='${id}'`;
console.log(id);
con.query(sql2, function(err, result){ 
    if(err)
        {(console.log(err));}
res.send(result);
});

});

module.exports = router;