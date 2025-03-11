const mongoose = require('mongoose');
const connectDB = async () =>{
    try{
        const conn = await mongoose.connect("mongodb://0.0.0.0:27017/todo",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected succesfully");
    }catch(err){
        console.log("could not connect to the database");
        console.log(err);
    }
}
module.exports = {connectDB};