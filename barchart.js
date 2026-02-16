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
    let query = `SELECT p.project_name,count(a.workassign_id) as count FROM tbl_workassign a inner join tbl_workdivide e on a.work_id = e.work_id 
    inner join tbl_project p on e.project_id = p.project_id group by p.project_id` ; 
 
    con.query(query, (err, rows) => { 
        if (err) throw err; 
        res.send(rows); 
        console.log(rows); 
    }); 
}); 
module.exports = router; 