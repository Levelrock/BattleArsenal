const express = require('express');
const Users= express.Router()
const userModel= require('../models/userModel')
const bcrypt = require('bcrypt');

Users.post('/users/create', async (req, res) => {

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.Password, salt)


    const newUser = new userModel({
        Avatar: req.body.Avatar,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Password: hashedPassword,
        Role:req.body.Role
    })

    try {
        const user = await newUser.save()

        res.status(201).send({
            statuscode: 201,
            message: 'User saved successfully',
            payload: user
        })
    } catch (error) {
        res.status(500).send({
            statuscode: 500,
            message: 'An error occurred',
            error: error.message
        })
    }
})

Users.get('/users', async (req, res) => {
    try {
        const users = await userModel.find();

        res.status(200).send({
            statuscode:200,
            users
        })
    } catch (error) {
        res.status(500).send({
            statuscode: 500,
            message: 'An error occurred',
            error: error.message
        })
    }
})

Users.delete('/users/delete/:userId', async (req, res) => {
    const {userId} = req.params;

    try {
        const userToDelete = await userModel.findByIdAndDelete(userId)

        if(!userToDelete){
            return res.status(404).send({
                statuscode:404,
                message: 'user not found'
            })
        }

        res.status(200).send({
            statuscode:200,
            message: 'user deleted succesfully'
        })
    } catch (error) {
        res.status(500).send({
            statuscode: 500,
            message: 'An error occurred',
            error: error.message
        })
    }
})

Users.patch('/users/edit/:userId', async (req, res) => {
    const {userId} = req.params;
    try {
        const userExist = await userModel.findById(userId)

        if (!userExist) {
            return res.status(404).send({
                statuscode:404,
                message: 'user not found'
            })
        }

        const userToEdit = req.body;
        const options = {new:true};
        const result = await userModel.findByIdAndUpdate(
            userId, userToEdit, options)
            res.status(200).send({
                statuscode:200,
                message: 'user edited succesfully',
                result
            })

    } catch (error) {
        res.status(500).send({
            statuscode: 500,
            message: 'An error occurred',
            error: error.message
        })
    }
})

Users.get('/users/byId/:userId', async (req, res) => {
    const {userId} = req.params;

    try {
        const userExist = await userModel.findById(userId)
        if (!userExist) {
            return res.status(404).send({
                statuscode:404,
                message: 'user not found'
            })
        }

        res.status(200).send({
            statuscode:200,
            user: userExist
        })
    } catch (error) {
        res.status(500).send({
            statuscode: 500,
            message: 'An error occurred',
            error: error.message
        })
    }
})

module.exports = Users