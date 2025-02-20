const express = require("express");
const UserRoute = require("./routes/user.routes");
const connecToDb = require("./config/mongo.config");
const TodoRoute = require("./routes/todo.routes");

if (process.env.NODE_ENV === "test") {
    require("dotenv").config({ path: ".env.testing" });
  } else {
    require("dotenv").config();
  }
  
const app = express();
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use("/users", UserRoute)
app.use("/todos", TodoRoute)

connecToDb()
// app.listen(PORT, ()=>{
//     console.log("Server Started")
// })

// testing purpose
module.exports = app;

/// this file is just to start the server 
// /// and this alteration is because we have writing test cases
// // where app.listen should be commented while testing, which impossible each and every time
// const app = require("./config")
// require("dotenv").config()

// const PORT = process.env.PORT || 3000
