const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      fName: { type: String, required: true },
      lName: { type: String, required: true },
    },
    phone: Number,
    role: { type: Number, default: 0 },
    age: Number,
    email: { type: String, unique: true, required: true },
    password: String,
  },
  { timestamps: true }
);

//create model on mongo db
const User = mongoose.model("users", userSchema);
//export model
module.exports = User;
