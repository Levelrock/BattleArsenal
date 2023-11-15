const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    
    
    Avatar:{
        type: String,
        required: true,
    },
    FirstName:{
        type: String,
        required: true,
    },
    LastName:{
        type: String,
        required: true,
    },
    Email:{
        type: String,
        required: true,
    },
    Password:{
        type: String,
        required: true,
    },
    Role:{
        type: String,
        required: true,
        default: 'user'
    }


},{timestamps:true, strict:true});

module.exports = mongoose.model('UserModel', UserSchema, 'Users')