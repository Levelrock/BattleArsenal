const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    

    Img:{
        type: String,
        required: true,
    },
    Title:{
        type: String,
        required: true,
    },
    Price:{
        type: Number,
        required: true,
    },
    Brand:{
        type: String,
        required: true,
    },
    Description:{
        type: String,
        required: true,
    },
    Author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    

},{timestamps:true, strict:true});

module.exports = mongoose.model('ArticleModel', ArticleSchema, 'Article')