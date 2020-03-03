const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
// const path = require("path");
const routes = require("./routes");

// App & variables
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware added here
// - Web form and JSON handling
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// - Logging
app.use(morgan("dev"));

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
