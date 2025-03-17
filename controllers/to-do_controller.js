const Todo = require('../modules/todo_module');

async function add(req,res){
    try{
        const {title, description, status} = req.body;
        const task = new Todo({
            title,
            description,
            status,
            "UserId": req.id
        })
        await task.save();
        res.status(201).send({
            "success": true,
            "message": "Todo added successfully",
            "todo":{"id": task._id,
                    "title":task.title,
                    "description": task.description,
                    "status": task.status,
                    "userId": task.UserId
                }
        })
}catch(err){
    console.log(err);
    res.status(500).send({
        message:"could not add the task",
    })
}
}

async function UpdateTodo(req,res){
    const id = req.params.id
    const task = await Todo.findById(id)
    if(task){
        if(task.UserId == req.id){
            task.status = ! task.status;
            await task.save();
            res.status(200).send({
                "success": true,
                "message": "Todo status updated successfully"
              })
        }else{
            res.status(401).send({
                message:"unauthorized access"
            })
        }
    }else{
        res.status(404).send({
            message:"task not found",
        })
    }
}

module.exports = {add,UpdateTodo}