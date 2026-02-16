var express = require('express');
var router = express.Router();
var mysql=require('mysql');
const nodemailer = require("nodemailer");
/* GET users listing. */

var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"db_control"
});
 
router.post('/',function( req, res, next) {
let id = req.body.emp_id;
let work_id = req.body.work_id;
let date = req.body.date;
let endassign_date = req.body.date2;
let sql=`insert into tbl_workassign (employee_id,work_id,assign_date,endassign_date) values(?,?,?,?);`;
con.query(sql,[id,work_id,date,endassign_date]);
res.send({message:'Success'});
let sql2=`select * from tbl_employee where employee_id='${id}'`;
con.query(sql2, function (err, result2) {
      if (err) { (console.log(err)); }
      let name = result2[0].employee_name;
      let gmail = result2[0].emp_mail;

      
  const mailOptions = {
      from: `"Control Technologies", "gvproject25.26@gmail.com"`,
      to: `${ gmail }`,
      subject: "Control Technologies",
      html: ` ${ name } ,you have been assigned new work. Please check your dashboard for more details.`
    };

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "gvproject25.26@gmail.com",
        pass: "jwgy grsm vxue gzge"
      }
    });

    transporter.sendMail(mailOptions, (err, info) => {
      if (err)
        console.log(err);

      console.log(info);
    })
    console.log(123)
});


});


module.exports = router;




