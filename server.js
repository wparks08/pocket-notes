require("dotenv").config();
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");

require(".config/passport");
// App & variables
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
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

// Route all other requests to React frontend
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`API Server running on port ${PORT}`);
});
