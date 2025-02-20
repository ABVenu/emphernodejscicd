const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    username: { type: String},
    password: { type: String },
  })


const UserModel = mongoose.model("User",UserSchema);

module.exports= UserModel;