const dbConn = require('./../../config/db.config');
//const user = require('../models/user.model');
//const moment = require('moment');
var validator = require('validator');
const usermodel = require('../models/user.model');
//
// const email = dbConn.query("Select email from student_form");


exports.validateUser = function (user, callback) {
  /*  var dpname = [ "EC","CS", "IS", "ME" ,"CV","EE"];
    const phLength = student.conatct.toString().length;
    const departmentCategory =student.department;
    const a = dpname.indexOf(departmentCategory);
    const stdate = student.data;
    const resd= moment(stdate, "YYYY-MM-DD").isValid();
    const em = validator.isEmail(user.user_name);
    if(!(em)){
        callback(true, "Email invalid!!");
       // end();
    } */
   // if(user.user_password!=cp){
      //  callback(true, "password don't match!!");
       // end();
 //   }
    usermodel.findByEmail(user, function (err, res){
        if(err) {
            callback(true, "Email id already exists!");
        } /*else if(phLength !== 10) {
            callback(true, "Not a Valid Contact Number!!   " + phLength);
        } else if(a==-1){
            callback(true, "Not a Valid Department!!  ");
        }  else if(resd!=true){
            callback(true, "Not a Valid Date!!  ");
        }*/else {
            callback(null, true);
        }
    })
}