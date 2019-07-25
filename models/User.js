const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true },
  password: String,
  habits: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'habit'
 }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
