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

let id = req.body.state_id;

let sql=`select * from tbl_district d inner join tbl_state s on d.state_id =s.state_id where d.state_id='${id}' `;
console.log(id);
con.query(sql, function(err, result){ 
    if(err)
        {(console.log(err));}
res.send(result);
});

});

module.exports = router;