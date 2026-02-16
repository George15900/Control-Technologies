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
let loginid = req.body.loginid;
let cv = req.body.cv;
let id = req.body.job_Id;
let experience = req.body.experience;
console.log(loginid,id);
 let i = "request";
 let k="No";
  let J = new Date().toISOString().slice(0, 10);
  let sql2=`select * from  tbl_jobapplication where jobseeker_id='${loginid}' and job_id='${id}'`;
con.query(sql2, function(err, result){ 
    if(sql2 != " ") {
res.send({message:'applyed already'});
}
else{
let sql=`insert into tbl_jobapplication (jobseeker_id,job_id,Resume,apply_date,apply_status,applycation_experience,offer_letter) 
values(?,?,?,?,?,?,?);`;
con.query(sql,[loginid,id,cv,J,i,experience,k]);
res.send({message:'Success'});

   let sql7 = `select * from tbl_jobseeker j inner join tbl_login l on j.login_id=l.login_id where j.login_id=${loginid}`;
    con.query(sql7, function (err, result2) {
      if (err) { (console.log(err)); }
      let name = result2[0].jobseeker_name;
      let gmail = result2[0].login_email;
   const mailOptions = {
              from: `"Control Technologies", "gvproject25.26@gmail.com"`,
              to: `${ gmail }`,
              subject: "Control Technologies",
              html: ` ${ name } ,Welcome to Control Technologies.Your application is Submitted.
              We will contact you soon your are short listed. Thank you.`
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
