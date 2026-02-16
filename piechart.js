var express = require('express'); 
var router = express.Router(); 
var mysql = require('mysql'); 
var con = mysql.createConnection({ 
   host: "localhost", 
   user: "root", 
   password: "", 
   database: "db_control" 
}); 
router.get('/', (req, res, next) => { 
     let J = new Date().toISOString().slice(0, 10);
    let query = `SELECT * FROM tbl_project WHERE project_endingdate >= '${J}'` ; 
 
    con.query(query, (err, rows) => { 
        if (err) throw err; 
        res.send(rows); 
        console.log(rows); 
    }); 
}); 
module.exports = router; 