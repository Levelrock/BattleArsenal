const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//const path = require('path')
require ('dotenv').config()

const PORT =7077

//routes const
const userRoutes= require('./routes/users')
const articleRoute= require('./routes/article')


const app = express()

app.use(cors())
app.use(express.json())

//routes

app.use('/', userRoutes)
app.use('/',articleRoute)


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection to db error'))
db.once('open', ()=>{
    console.log('Database succesfully connected');
})



app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`))