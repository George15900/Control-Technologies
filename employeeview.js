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

let sql=`SELECT *
FROM tbl_employee e
INNER JOIN tbl_district d ON e.district_id = d.district_id
INNER JOIN tbl_state s ON d.state_id = s.state_id
INNER JOIN tbl_designation m ON e.designation_id = m.designation_id
INNER JOIN tbl_login login_id ON e.login_id = login_id.login_id
WHERE login_id.status = 'Active'
ORDER BY e.employee_id_num ASC;`;
console.log(sql);
con.query(sql, function(err, result){ 
    if(err)
        {(console.log(err));}
res.send(result);
});

});
module.exports = router;