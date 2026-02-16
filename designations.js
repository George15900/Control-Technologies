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
let des = req.body.designation;
let sql=`insert into tbl_designation (designation) values(?);`;
con.query(sql,[des]);
res.send({message:'Success'});
});


module.exports = router;