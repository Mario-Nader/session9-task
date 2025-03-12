const mongoose = require('mongoose');

todoSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    describtion:{
        type:String,
        required:true,
    },
    status:{
        type:boolean,
        required:true,
    }
});

module.expots = mongoose.model('Todo',todoSchema);