var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var nodemailer = require('nodemailer');
/* GET users listing. */

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_control"
});

router.post('/', function (req, res, next) {
  let jobseeker_id = req.body.jobseeker_id ;
  let per_address = req.body.per_address;
  let pincode = req.body.pincode;
  let district_id = req.body.district_id;
  let current_address = req.body.current_address;
  let crr_pincode = req.body.crr_pincode;
  let gender = req.body.gender;
  let designation_id = req.body.designation_id;
  let username = req.body.Username;
  let j = req.body.dob;
  let Password = req.body.Password;
  let total_leave=req.body.total_leave;
console.log('jobseeker_id',jobseeker_id);
        let sql = `select * from tbl_jobseeker j inner join tbl_login l on j.login_id=l.login_id
        inner join tbl_jobapplication a on j.login_id=a.jobseeker_id  where j.jobseeker_id=${jobseeker_id}`;
        con.query(sql, function (err, result2) {
      if (err) { (console.log(err)); }
      let name = result2[0].jobseeker_name;
      let gmail = result2[0].jobseeker_email;
      let contact = result2[0].jobseeker_contact;
       let id_card = result2[0].jobseeker_idcard;
      let photo = result2[0].jobseeker_photo;
      let dob = result2[0].jobseeker_dob;
       let exp = result2[0].applycation_experience;
      let lid = result2[0].login_id;

       let sql8 = `update tbl_jobapplication set apply_status='employee' where jobseeker_id ='${lid}'`;
      con.query(sql8, function (err, result3) {
        if (err) { (console.log(err)); }
        });

      let sql1 = `update tbl_login set Username='${username}', password='${Password}', role='employee', status='Active' where 
      login_id ='${lid}'`;
      con.query(sql1, function (err, result3) {
        if (err) { (console.log(err)); }
        });

           let sql4 = `SELECT MAX(employee_id_num) as employee_id_num FROM tbl_employee`;
    con.query(sql4, function (err, result2) {
      if (err) { (console.log(err)); }
      let em_id = result2[0].employee_id_num;
      console.log('employee',em_id);

  let id = em_id + 1;
  let sql2 = `
    INSERT INTO tbl_employee 
    (employee_id_num, employee_name, emp_mail, emp_contact, house_name, pincode, district_id,
     place, emp_po, gender, exprenes, designation_id, photo, id_card, login_id, DOB, JDOB,total_leave)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `;
con.query(
    sql2,
    [
      id, name, gmail, contact, per_address, pincode, district_id,
      current_address, crr_pincode, gender, exp, designation_id,
      photo, id_card, lid, dob, j,total_leave
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ message: 'Employee insert failed' });
      }

      // ✅ Get inserted employee ID correctly
      let employee_id = result.insertId;
      console.log('employee_id:', employee_id);

    
      const year = new Date().getFullYear(); // ✅ year only

      let sql7 = `
        INSERT INTO tbl_leave 
        (employee_id, post_date, \`Year\`, noofleave)
        VALUES (?,?,?,?)
      `;

      con.query(sql7, [employee_id, j, year, total_leave], (err2) => {
        if (err2) {
          console.error(err2);
          return res.status(500).send({ message: 'Leave insert failed' });
        }

        res.send({ message: 'Success' });

           
          const mailOptions = {
              from: `"Control Technologies", "gvproject25.26@gmail.com"`,
              to: `${ gmail }`,
              subject: "Control Technologies",
              html: ` ${ name } ,Welcome to Control Technologies. 
              your employee id is ${id}. 
              Username:-${username} 
              Password:-${Password}
              Please login to your dashboard.`
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
    });
  });
   });

    
  
module.exports = router 