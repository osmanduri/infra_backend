const mongoose = require("mongoose");


let postsChantier = mongoose.Schema({

    id: {
        type: String
    },
    title: {
        type: String
    },
    image: {
        type: [String]
    },
    format: {
        type: String
    },
    h2: {
        type: String
    },
    p: {
        type: String
    },
    vue: {
        type: Number
    },
    single_commentaire: {
        type: String
    },
    commentaire: {
        type: [String]
    },
    like: {
        type: Number
    },
    date: {
        type: String,
        default: Date
    },


})


module.exports = mongoose.model('posts', postsChantier);