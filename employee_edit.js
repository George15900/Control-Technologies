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
    let id = req.body.emp_Id;
    let name = req.body.name;
    let gmail = req.body.gmail;
    let contact = req.body.contact;
    let per_address = req.body.per_address;
    let pincode = req.body.pincode;
    let photo = req.body.photo;
    let current_address = req.body.current_address;
    let crr_pincode = req.body.crr_pincode;
    let exprenes = req.body.exprenes;
    let id_card = req.body.id_card;


    let sql = `update tbl_employee set employee_name='${name}', emp_mail='${gmail}', emp_contact='${contact}', house_name='${per_address}', pincode='${pincode}', photo='${photo}', place='${current_address}', emp_po='${crr_pincode}', exprenes='${exprenes}',id_card='${id_card}' where employee_id = '${id}' `;
    con.query(sql, function (err, result) {
        if (err) { (console.log(err)); }
        res.send({ message: 'Success' });
    });

});

module.exports = router;