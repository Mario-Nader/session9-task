const mongoose = require('mongoose');

todoSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        required:true,
    },UserId:{
        type:mongoose.Types.ObjectId,
        ref : "User"
    }
});

module.exports = mongoose.model('Todo',todoSchema);