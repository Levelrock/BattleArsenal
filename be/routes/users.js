const express = require('express');
const Users= express.Router()
const userModel= require('../models/userModel')
const bcrypt = require('bcrypt');
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'UsersImg',
        format: async (req, file) => 'png',
        public_id: (req, file) => file.name
    }
})

const cloudUpload = multer({storage: cloudStorage})

Users.post('/users/cloudUpload', cloudUpload.single('Avatar'), async (req, res) => {
    try {
        res.status(201).json({Avatar: req.file.path})
    } catch (error) {
        res.status(500).send({
            statuscode: 500,
            message: 'An error occurred',
            error: error.message
        })
    }
})



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