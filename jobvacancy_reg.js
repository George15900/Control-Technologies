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
let role = req.body.designation_id;
let dis = req.body.discription;
let qua = req.body.qualification;
let epx = req.body.experience;
let num = req.body.numberofvacancy;
let enddate = req.body.enddate;
 let startdate = new Date().toISOString().slice(0, 10);
let sql=`insert into tbl_job_vacancy (designation_id,job_discription,job_qualification,job_experience,
numberofvacancy,job_startingdate,job_enddate) values(?,?,?,?,?,?,?);`;
con.query(sql,[role,dis,qua,epx,num,startdate,enddate]);
res.send({message:'Success'});
});
module.exports = router;