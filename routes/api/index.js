const router = require("express").Router();
const categoryRoutes = require("./categories");
const noteRoutes = require("./notes");

// Post routes
router.use("/categories", categoryRoutes);
router.use("/notes", noteRoutes);

module.exports = router;
