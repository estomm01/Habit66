const router = require("express").Router();
const bookRoutes = require("./books");
const habitRoutes = require("./habits");



// Book routes
router.use("/books", bookRoutes);
router.use("/habits", habitRoutes);


module.exports = router;
