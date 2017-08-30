const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    body: {type: String, required: true},
    notes: {type: String},
    language: {type: String},
    tags: {type: String}
})

const snippets = mongoose.model('snippet', snippetSchema);

module.exports = snippets;
