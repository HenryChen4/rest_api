const { request } = require('express')
const express = require('express')
const User = require('./models/user')
require('./db/mongoose')
const Task = require('./models/task')
const { Mongoose } = require('mongoose')
const mongoose = require('mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const jwt = require('jsonwebtoken')

const app = express()
const port = process.env.port || 3000

// app.use((req, res, next)=>{
//     res.status(503).send('The site is under maintenance, please visit in another 5 hours')
// })
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, ()=>{
    console.log('server is up and running')
})