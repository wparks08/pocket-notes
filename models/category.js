const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    date: { type: Date, default: Date.now },
    username: { type: String, required: true },
    category: { type: String, required: true },
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Note"
        }
    ]
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
