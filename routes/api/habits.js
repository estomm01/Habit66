const router = require("express").Router();
const habitsController = require("../../controllers/habitsController");

// Matches with "/api/books"
router.route("/")
  .get(habitsController.findAll)
  .post(habitsController.create);

// Matches with "/api/books/:id"
router.route("/:id")
  .get(habitsController.findById)
  .put(habitsController.update)
  .delete(habitsController.remove);

router.route("/oktaId/:oktaId")
  .get(habitsController.findByOktaId);

router.route("/update/:id")
  .put(habitsController.newDate);

module.exports = router;
