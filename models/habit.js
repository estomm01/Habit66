const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const habitSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true }
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
