const cookieParser = require('cookie-parser');
const express = require('express');
const bycrypt = require('bcrypt');
const app = express();
const port = 3000;
const {connectDB} = require('./DB.js');
const auth = require('./controllers/auth_controllers');
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
app.use(cookieParser());
app.use(express.json());

app.post('/signup',auth.signup);
app.post('/signin',auth.login);
app.post('/add-todo',auth.authMid,(req,res)=>{console.log("welcome to the to-do page");res.send("done")})
