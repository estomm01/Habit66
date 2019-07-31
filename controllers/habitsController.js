const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Habit
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Habit
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByOktaId:function(req, res) {
    // ;
    db.Habit
      .find({'oktaId' : req.params.oktaId})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

  },
  create: function(req, res) {
    db.Habit
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log("put", req, res)
    db.Habit
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Habit
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  newDate: function(req, res) {
    console.log("test", req, res)
    db.Habit
      .findByIdAndUpdate(req.params.id, { $set: { lastCompletedDay: req.body.selectedDay }, $push: { dayStreak: req.body.dayStreak}}, {returnNewDocument: true})
      .then((result) => {
        console.log(`newDate findByIdAndUpdate`);
        console.log(newDate);
        console.log(`${req.params.id}'s lastCompletedDay updated to ${Date.now}`);
      });
  }
};
