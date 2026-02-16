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
let id = req.body.district_id;
let sql=`delete from tbl_district where district_id ='${id}'`;
con.query(sql, function(err, result){ 
    if(err)
        {(console.log(err));}
res.send({message:'Success'});
});

});

module.exports = router;