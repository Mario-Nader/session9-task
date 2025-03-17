const express = require("express")
const router = express.Router();
const auth = require('../controllers/auth_controllers')
const todo_controller = require('../controllers/to-do_controller')

router.post('/add-todo',auth.authenMid,auth.verifyUser,todo_controller.add)
router.put('/change-status/:id',auth.authenMid,auth.verifyUser,todo_controller.UpdateTodo)
router.delete('/delete-todo/:id',auth.authenMid,auth.verifyUser,todo_controller.deleteTodo)
router.get('/getById/:id',auth.authenMid,auth.verifyUser,todo_controller.retrieveTodo)


module.exports = router