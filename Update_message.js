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
let id = req.body.Message_id;
let s = req.body.status;
if('Approved' == s){
let sql = `update tbl_message set Status='${s}' where Message_id='${id}'`;
console.log(sql);
con.query(sql, function(err, result){ 
    if(err)
        {(console.log(err));}

    if(err)
        {(console.log(err));}
res.send({message:'Success'});
});
}
else{
    let sql1 = `update tbl_message set Status='${s}' where Message_id='${id}'`;
    console.log(sql1);
con.query(sql1, function(err, result){ 
    if(err)
        {(console.log(err));}
res.send({message:'Success'});
});
}

});

module.exports = router;