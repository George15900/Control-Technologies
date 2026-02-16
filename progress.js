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
let pro = req.body.progress;
let id = req.body.emp_id;
let J = new Date().toISOString().slice(0, 10);
let sql=`insert into tbl_Progress (progress,workassign_id,progress_date) values(?,?,?);`;
con.query(sql,[pro,id,J],function(err,result){
    if(err) throw err;
}   );  
res.send({message:'Success'});
});


module.exports = router;