const User = require("../modules/user_module")
const Todo = require("../modules/todo_module")
async function getTodos(req,res){
    const id = req.id
    let todos = await Todo.find({UserId : id}).exec()
    todos = todos.map(task => {return {
        "id": task._id.toString(),
        "title": task.title,
        "description": task.description,
        "status": task.status,
        "userId": task.UserId
      }})
    res.status(200).send({
        success:true,
        "todos":todos
    })
}

async function getIncompleteTodos(req,res){
    const id = req.id
    let todos = await Todo.find({UserId : id}).exec()
    todos = todos.filter(task => task.status == false).map(task => {{
        return {
            "id": task._id.toString(),
            "title": task.title,
            "description": task.description,
            "status": task.status,
            "userId": task.UserId
          }
    }})
    res.status(200).send({
        success:true,
        "remainingTodos":todos
    })
}

module.exports = {getTodos,getIncompleteTodos}