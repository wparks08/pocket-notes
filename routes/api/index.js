const router = require("express").Router();
const noteRoutes = require("./notes");

// Post routes
router.use("/notes", noteRoutes);

module.exports = router;
