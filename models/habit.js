const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const habitSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  lastCompletedDay: { type: Date, required: true, default: Date.now },
  progress: { type: Number, required: true, default: 0 }
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
