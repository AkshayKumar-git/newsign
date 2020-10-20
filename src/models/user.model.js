'use strict';
const dbConn = require('./../../config/db.config');
//student object create
const user = function (user) {
    this.user_fullname = user.user_fullname;
    this.user_name = user.user_name;
    this.user_password = user.user_password;
  //  this.conformpassword = user.conformpassword;
};
user.create = function (newUser, result) {
    dbConn.query("INSERT INTO user set ?", newUser, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
user.findById = function (id, result) {
    dbConn.query("Select * from user where user_id = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
user.findAll = function (result) {
    dbConn.query("Select * from user", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err);
        }
        else{
            console.log('user : ', res);
            result(null, res);
        }
    });
 };
user.finduser = function (user, result){
    dbConn.query(' select count(*) as emailCount from user where user_name = ? AND user_password = ?',[user.user_name, user.user_password],function (err, res) {
        // var emailCount = res[0].emailCount;
        if (err) {
            result(err)
        } else {
            result(null, res[0].emailCount )
        }
    })
}
user.newname = function (user, result){
    dbConn.query(' select user_id from user where user_name = ? AND user_password = ?',[user.user_name, user.user_password],function (err, res) {
        // var emailCount = res[0].emailCount;
        if (err) {
            result(err)
        } else {
            result(null, res)
        }
    })
}
user.update = function(id, student, result){
    dbConn.query("UPDATE user SET user_fullname = ? , user_name=? WHERE user_id = ?", [student.user_fullname,student.user_name, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null);
        }else{
            result(null, res);
        }
    });
};
user.delete = function(id, result){
    dbConn.query("DELETE FROM user WHERE user_id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err);
        }
        else{
            result(null, res);
        }
    });
};

user.findByEmail =function (user,result) {
    dbConn.query("select count(*) as emailCount from user where user_name = ?",user.user_name, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err);
        }
        else{
            console.log('user : ', res);
            result((res[0].emailCount > 0));
        }
    });
};
module.exports= user;