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
let state = req.body.state;
let dis = req.body.district;
let sql=`insert into tbl_district (state_id,District_name ) values(?,?);`;
con.query(sql,[state,dis]);
res.send({message:'Success'});
});

module.exports = router;