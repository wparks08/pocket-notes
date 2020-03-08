require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
// const path = require("path");
const routes = require("./routes");

require(".config/passport");
// App & variables
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

// Middleware added here
// - Web form and JSON handling
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// - Logging
app.use(morgan("dev"));
app.use(passport.initialize());

// Static assets for Heroku deploy
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// API Routes here
app.use(routes);

// Route all other requests to React frontend
// Transfer to routes/index.js
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// Connect to Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactcms");

// Start API server
app.listen(PORT, () => {
    console.log(`API Server running on port ${PORT}`);
});
