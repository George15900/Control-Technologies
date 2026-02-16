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

let sql=`select * from tbl_workdivide w inner join tbl_project p on w.project_id = p.project_id where w.project_id ='${id}' `;
console.log(id);
con.query(sql, function(err, result){ 
    if(err)
        {(console.log(err));}
res.send(result);
});

});

module.exports = router;