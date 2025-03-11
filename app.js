const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const port = 3000;
const {connectDB} = require('./DB.js');
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
app.use(cookieParser());
app.use(express.json());
