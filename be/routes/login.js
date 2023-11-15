const express = require('express');
const login  = express.Router();
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel')
const jwt = require ('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config()

login.post('/login', async (req, res) => {
    const user = await userModel.findOne({Email: req.body.Email})

    if (!user){
        return res.status(404).send({
            statusCode: 404,
            message: 'User not found'
        })
    }

    const validPassword = await bcrypt.compare(req.body.Password, user.Password)

    if (!validPassword){
        return res.status(404).send({
            statusCode: 400,
            message: 'Failed to validate'
        })
    }
    
    const token = jwt.sign({
        Id: user._id,
        Avatar: user.Avatar,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
        Role: user.Role
    },process.env.JWT_SECRET,{
        expiresIn: '24h'
    })

    res.header('Authorization', token).status(200).send({
        statusCode: 200,
        meggase: 'LogIn sucessfully',
        token
    })
})


module.exports = login