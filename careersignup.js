var express = require('express');
var router = express.Router();
var mysql = require('mysql');
/* GET users listing. */

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_control"
});

router.post('/', function (req, res, next) {
  let name = req.body.name;
  let email = req.body.gmail;
  let contact = req.body.contact;
  let qualification = req.body.qualification;
  let username = req.body.username;
  let Password = req.body.password;
  let photo = req.body.photo;
  let id = req.body.id_card;
  let dob = req.body.date;
  let role = "jobseeker";
  let status = "Active";
  let J = new Date().toISOString().slice(0, 10);
  let sql2 = `insert into tbl_login (Username,password,role,status) values(?,?,?,?);`;
  con.query(sql2, [username, Password, role, status], (err, result) => {
    if (err) throw err
    let logid = result.insertId;
    console.log('login id',logid);

    let sql = `insert into tbl_jobseeker (jobseeker_name,jobseeker_email,jobseeker_contact,
    jobseeker_qualific,jobseeker_reg_date,login_id,jobseeker_idcard,jobseeker_photo,jobseeker_dob) values(?,?,?,?,?,?,?,?,?);`;
    con.query(sql, [name, email, contact, qualification, J, logid,id,photo,dob]);
    res.send({message:'Success'});
  });   
  });
module.exports = router 