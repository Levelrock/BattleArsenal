const express = require('express');
const signIn = express.Router();
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel')
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config()

signIn.post('/signIn', async (req, res) => {
    const user = await userModel.findOne({ Email: req.body.Email })

    if (user) {
        return res.status(400).send({
            statusCode: 400,
            message: 'User already exist'
        })
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.Password, salt)

        const newUser = new UserModel({
            Avatar: req.body.Avatar,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Password: hashedPassword,
            Role: req.body.Role
        })
        const addUser = await newUser.save()

        res.status(200).send({
            statusCode:200,
            message: 'User saved successfully',
            addUser
        })
    } catch (error) {
        res.status(500).send({
            statuscode: 500,
            message: 'An error occurred',
            error: error.message
        })
    }

    /* const token = jwt.sign({
        Avatar: user.Avatar,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
        Role: user.Role
    }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    })

    res.header('Authorization', token).status(200).send({
        statusCode: 200,
        meggase: 'LogIn sucessfully',
        token
    }) */
})


module.exports = signIn