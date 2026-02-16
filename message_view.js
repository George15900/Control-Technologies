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

router.get('/',function( req, res, next) {
let sql=`select * from tbl_message m inner join tbl_employee e  on m.employee_id = e.employee_id `;
console.log(sql);
con.query(sql, function(err, result){ 
    if(err)
        {(console.log(err));}
res.send(result);
});

});
module.exports = router;