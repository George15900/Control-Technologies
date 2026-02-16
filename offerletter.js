var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var nodemailer = require('nodemailer');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_control"
});

router.post('/', function (req, res) {
let id = req.body.id; 
let name = req.body.name; 
let gmail = req.body.gmail; 
let letter = req.body.offerlett; 
let role = req.body.role;
console.log("print",id)

  //✅ Prevent empty email error
  if (!gmail) {
    return res.status(400).send({ message: "Email not received from frontend" });
  }

  //✅ SQL (safe placeholder)
  let sql = `UPDATE tbl_jobapplication SET offer_letter='Yes' WHERE jobseeker_id='${id}'`;
  con.query(sql, function (err) {

    if (err) {
      console.log("DB Error:", err);
      return res.status(500).send({ message: "Database Error" });
    }

    // ✅ Gmail transporter (simpler & reliable)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "gvproject25.26@gmail.com",
        pass: "jwgy grsm vxue gzge"
      }
    });

    const mailOptions = {
      from: `"Control Technologies", "gvproject25.26@gmail.com"`,
      to: `${ gmail }`,
      subject: "Offer Letter - Control Technology",
       html: `Dear ${name},

Congratulations! You are selected as our employee.

We are pleased to offer you the position of ${role} at Control Technology.

Offer Letter Status: Approved

Salary Package: 2.40 LPA per year

this your offer letter ${letter} 

We look forward to working with you.

Regards,
HR Team
Control Technology`
    };

    transporter.sendMail(mailOptions, (err, info) => {

      if (err) {
        console.log("Mail error:", err);
        return res.status(500).send({ message: "Email sending failed" });
      }

      console.log("Mail sent:", info.response);

       res.send({ message: 'Success' });
    });

  });
});

module.exports = router;
