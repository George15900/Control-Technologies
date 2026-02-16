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
let id = req.body.employee_id;
let sq2 = `
        SELECT e.login_id  
        FROM tbl_employee e
        INNER JOIN tbl_login z ON e.login_id = z.login_id
        WHERE z.status = 'Active' and e.employee_id ='${id}'`;
    con.query(sq2, (err, result) => {  //Execute
        if (err)
            throw err;
        // console.log(result)
            let logid = result[0].login_id;

let sql=`update tbl_login set status="Inactive" where login_id='${logid}' `;
console.log(logid);
con.query(sql, function(err, result){ 
    if(err)
        {(console.log(err));}
res.send({message:'Success'});
});

});
});
module.exports = router;