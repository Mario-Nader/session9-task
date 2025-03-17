const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth_controllers')
const userController = require('../controllers/Users_controllers')

router.get('/get-todos',auth.authenMid,auth.verifyUser,userController.getTodos)
router.get('/get-remain-todo',auth.authenMid,auth.verifyUser,userController.getIncompleteTodos)


module.exports = router

