const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/authentication')
const router = express.Router()

router.get('/users', auth, async (req, res)=>{
    try {
        const foundUsers = await User.find({})
        res.send(foundUsers)
    } catch(error) {
        res.send('asd')
    }
})

router.get('/users/:id', async (req, res)=>{
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send('User not found')
        }
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})

router.post('/users', async (req, res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    }catch(error){
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = user.generateAuthToken()
        res.send({user, token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.patch('/users/:id', async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidUpdate){
        return res.status(400).send({
            error: 'Invalid updates'
        })
    }

    try {
        const user = await User.findById(req.params.id)
        updates.forEach((update)=>user[update] = req.body[update])
        await user.save()
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/users/:id', async (req, res)=>{
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        if(!deletedUser){
            return res.status(500).send('No user found')
        }
        res.send(deletedUser)
    }catch(error){
        res.send(error)
    }
})

module.exports = router