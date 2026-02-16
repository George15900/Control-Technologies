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
let Name = req.body.Name;
let discription = req.body.discription;
let Starting = req.body.Starting;
let Ending = req.body.Ending;
 let postdate = new Date().toISOString().slice(0, 10);
let sql=`insert into tbl_project (project_name,project_describtion,project_startdate,project_endingdate,project_postdate) 
values(?,?,?,?,?);`;
con.query(sql,[Name,discription,Starting,Ending,postdate]);
res.send({message:'Success'});
});

module.exports = router;