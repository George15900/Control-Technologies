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
let id = req.body.leave_id;
let sql=`delete from tbl_leave where leave_id ='${id}'`;
con.query(sql, function(err, result){ 
    if(err)
        {(console.log(err));}
res.send({message:'Success'});
});

});

module.exports = router;