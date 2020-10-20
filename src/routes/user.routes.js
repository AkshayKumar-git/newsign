const express = require('express')
const router = express.Router()
const userController =   require('../controllers/user.controller');
// Retrieve all employees
router.get('/user', userController.findAll);
// Create a new employee
router.post('/userAdd', userController.create);
// Retrieve a single employee with id
router.get('/user/:id', userController.findById);
//check for user
router.post('/username', userController.name);
//check for user
router.post('/userCheck', userController.check);
// Update a employee with id
router.put('/user/:id', userController.update);
// Delete a employee with id
router.delete('/user/:id', userController.delete);
module.exports = router

