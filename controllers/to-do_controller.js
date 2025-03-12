const todo = require('../modules/todo_module');



function add(req,res){
    const {title, description, status} = req.body;
    console.log(title, description, status)
}



module.exports = {add}