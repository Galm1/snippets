const mongoose = require('mongoose');

const snippetModel = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    notes: {type: String},
    language: {type: String},
    tags: {type: String}
})


module.exports = {
  snippets: snippetModel
}

// const snippet = mongoose.model('snippets', snippetSchema);
//
// module.exports = snippet;
