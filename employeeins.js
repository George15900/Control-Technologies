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
  let name = req.body.name;
  let gmail = req.body.gmail;
  let contact = req.body.contact;
  let per_address = req.body.per_address;
  let pincode = req.body.pincode;
  let district_id = req.body.district_id;
  let photo = req.body.photo;
  let current_address = req.body.current_address;
  let crr_pincode = req.body.crr_pincode;
  let gender = req.body.gender;
  let exprenes = req.body.exprenes;
  let designation_id = req.body.designation_id;
  let id_card = req.body.id_card;
  let username = req.body.username;
 let dob = req.body.dob;
  let Password = req.body.password;
  let total_leave=req.body.total_leave;
  let role = "employee";
  let status = "Active";
  let i = 1000;
  let J = new Date().toISOString().slice(0, 10);
  let sql2 = `insert into tbl_login (Username,password,role,status) values(?,?,?,?);`;
  con.query(sql2, [username, Password, role, status], (err, result) => {
    if (err) throw err
    let logid = result.insertId;
    console.log('login id',logid);
    // empcode = "123";
    let sql4 = `SELECT MAX(employee_id_num) as employee_id_num FROM tbl_employee`;
    con.query(sql4, function (err, result2) {
      if (err) { (console.log(err)); }
      let em_id = result2[0].employee_id_num;
      console.log('employee',em_id);

      if (em_id == null) {
        em_id = 1000;
        let sql = `insert into tbl_employee (employee_id_num,employee_name,emp_mail,emp_contact,house_name,pincode,district_id,
place,emp_po,gender,exprenes,designation_id,photo,id_card,login_id,DOB,JDOB,total_leave) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;
        con.query(sql, [em_id, name, gmail, contact, per_address, pincode, district_id, current_address, crr_pincode, gender, exprenes, designation_id,
          photo, id_card, logid,dob,J,total_leave]);
        console.log(sql);
        res.send({ message: 'Success' });
      }

   if (em_id >= i) {

  let id = em_id + 1;

  let sql = `
    INSERT INTO tbl_employee 
    (employee_id_num, employee_name, emp_mail, emp_contact, house_name, pincode, district_id,
     place, emp_po, gender, exprenes, designation_id, photo, id_card, login_id, DOB, JDOB,total_leave)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `;

  con.query(
    sql,
    [
      id, name, gmail, contact, per_address, pincode, district_id,
      current_address, crr_pincode, gender, exprenes, designation_id,
      photo, id_card, logid, dob, J,total_leave
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

      con.query(sql7, [employee_id, J, year, total_leave], (err2) => {
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
    }
  );
}

    });
  });
});
module.exports = router 