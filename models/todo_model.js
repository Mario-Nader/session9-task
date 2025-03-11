const mongoose = require('mongoose');
const { describe } = require('node:test');
const { boolean } = require('webidl-conversions');
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
    },
})