/* eslint-disable prettier/prettier */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    date: { type: Date, default: Date.now },
    username: { type: String, required: true },
    categoryID: { type: String, required: true },
    title: { type: String, required: true },
    body: String
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
