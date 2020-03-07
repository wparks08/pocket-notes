const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Notes collection and inserts the notes below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactcms");

const noteSeed = [
    {
        date: new Date(Date.now()),
        username: "admin",
        category: "Hello World",
        body: "Welcome to your first Pocket Note! To create notes create a category and body. Don't forget to sign in!"
    },
    {
        date: new Date(Date.now()),
        username: "admin",
        category: "Second Note",
        body:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        date: new Date(Date.now()),
        username: "admin",
        category: "Another One",
        body:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
];

db.Note.remove({})
    .then(() => db.Note.collection.insertMany(noteSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
