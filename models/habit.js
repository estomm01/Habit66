const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const habitSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: String,
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;