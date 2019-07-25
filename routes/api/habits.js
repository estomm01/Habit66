const db = require("../../models");
const router = require("express").Router();
const Habit = require('../../models/Habit')

router.post('/:id', (req, res) => {
  console.log(`Incoming request - POST new habit:`);
  console.log(`ID: ${req.params.id}`)
  console.log(`Habit: ${JSON.stringify(req.body, null, 4)}`)
  const newHabit = new Habit({
    userId: req.params.id,
    name: req.body.name,
    description: req.body.description,
    duration: req.body.duration
  })

  newHabit.save()
  console.log(`Habit ${JSON.stringify(newHabit, null, 2)} saved!`)

});

router.get('/:id', (req, res) => {

  console.log(req.params.id)
  const allHabits = Habit.find({
    userId: req.params.id
  })
    // .then((allHabits) => console.log(allHabits))
    .then((allHabits) => res.json(allHabits))
})

router.delete('/:id', (req, res) => {
  console.log(req.params.id)
    db.Habit
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));


  console.log(res);
  Habit.find({ userId: req.params.id })
    .then((res) => console.log(`All habits for ${req.params.id}:  ${res}`))
    return(res)


  const allHabits = Habit.find({ userId: req.params.id })
    .then((allHabits) => {
      console.log(`All habits for ${req.params.id}:  ${allHabits}`)
      res.json(allHabits)
    })

})

module.exports = router;
