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
let id = req.body.project_id;
let Name = req.body.Name;
let des = req.body.discription;
let sql=`insert into tbl_workdivide (project_id,work_name,work_describtion) values(?,?,?);`;
con.query(sql,[id,Name,des]);
res.send({message:'Success'});

});


module.exports = router;

