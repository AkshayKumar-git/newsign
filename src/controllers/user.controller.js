'use strict';
const user = require('../models/user.model');
const validations = require('../validations/user.validations');
exports.findAll = function (req, res) {
    user.findAll(function (err, user) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', user);
        res.send(user);
    });
};
exports.create = function (req, res) {
  //  const cp = req.body.user_conformpassword;
    const new_user = new user(req.body);
//handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({error: true, message: 'Please provide all required field'});
    } else {
        validations.validateUser(new_user, function (err, msg) {
            if(err) {
                res.status(400).send({error: true, message: msg});
            } else {
                user.create(new_user, function (err, user) {
                    if (err)
                        res.send(err);
                    res.json({status: 'success', message: "user added successfully!", data: user});
                });
            }
        })


        /*validation.createval(new_student =>{
            if (onerror) {
                res.json('message:Student successfully updated');
            } else {
                Student.create(new_student, function (err, student) {
                    if (err)
                        res.send(err);
                    res.json({status: 'success', message: "Student added successfully!", data: student});
                });
            }

        });*/

    }
};
exports.findById = function (req, res) {
    user.findById(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};
exports.check = function (req, res){
  var neusern = req.body;
    user.finduser(neusern,function (err, result1) {
        if (err) {
            res.status(400).send({message:"some error!"});
        } else {
            if(result1===0){
                res.status(400).send({message:"user dont exsist.."});
                console.log(result1);
            }else {
                res.json({status: 'success', message: "user exists!", data: result1});
                console.log(result1);
            }
        }
    })
}
exports.name = function (req, res){
    var usern = req.body;
    user.newname(usern,function (err, result1) {
        if (err) {
            res.status(400).send({message:"some error!"});
        } else {
                res.send(result1);
                console.log(result1);
            }

    })
}
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({error: true, message: 'Please provide all required field'});
    } else {
        user.update(req.params.id, new user(req.body), function (err, user) {
            if (err){res.send(err);}
            else {res.send(user);}

        });
    }
};
exports.delete = function (req, res) {
    user.delete(req.params.id, function (err, user) {
        if (err){res.send(err);}
        else {  res.send({status: 'success', message: 'user successfully deleted'});}

    });
};