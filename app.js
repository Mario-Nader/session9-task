const cookieParser = require('cookie-parser');
const express = require('express');
const bycrypt = require('bcrypt');
const app = express();
const port = 3000;
const {connectDB} = require('./DB.js');
const todo_controller = require('./controllers/to-do_controller.js')
const auth = require('./controllers/auth_controllers');
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
app.use(cookieParser());
app.use(express.json());

app.post('/signup',auth.signup);
app.post('/signin',auth.login);
app.post('/signout',auth.logout);
app.post('/add-todo',auth.authenMid,auth.verifyUser,todo_controller.add)
