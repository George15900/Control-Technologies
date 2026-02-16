var express = require('express');
var router = express.Router();
var mysql=require('mysql');
var nodemailer = require('nodemailer');
/* GET users listing. */

var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"db_control"
});
 
router.post('/',function( req, res, next) {
let id = req.body.id;
let s = req.body.status;
 sql7 = `select * from tbl_jobapplication j inner join tbl_jobseeker l on j.jobseeker_id=l.login_id where j.jobapplication_id=${id}`;
    con.query(sql7, function (err, result2) {
      if (err) { (console.log(err)); }
        let name = result2[0].jobseeker_name;
        let gmail = result2[0].jobseeker_email;
if('approved' == s){
let sql = `update tbl_jobapplication set apply_status='${s}' where jobapplication_id   ='${id}'`;
console.log(sql);
con.query(sql, function(err, result){ 
    if(err)
        {(console.log(err));}
res.send({message:'Success'});
const mailOptions = {
              from: `"Control Technologies", "gvproject25.26@gmail.com"`,
              to: `${ gmail }`,
              subject: "Control Technologies",
              html: ` ${ name } ,Welcome to Control Technologies.Your application is Approved.
              Interview will be on 7 of next at 10 AM.
              Location: Control Technologies, Info Park ,Kochi, Ernakulam.
              Please be on time. Thank you.`
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
}
else{
    let sql1 = `update tbl_jobapplication set apply_status='${s}' where jobapplication_id ='${id}'`;
    console.log(sql1);
con.query(sql1, function(err, result){ 
    if(err)
        {(console.log(err));}
res.send({message:'Success'});

   const mailOptions = {
              from: `"Control Technologies", "gvproject25.26@gmail.com"`,
              to: `${ gmail }`,
              subject: "Control Technologies",
              html: ` ${ name } ,Welcome to Control Technologies.Your application is Rejected.
              try again next time.Thank you.`
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
}
});
});
module.exports = router;