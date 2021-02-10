const express = require('express')
const router = express.Router()
const Task = require('../models/task')

router.post('/tasks', async (req, res)=>{
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send('Saved task to database')
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res)=>{
    try {
        const foundTasks = await Task.find({})
        res.send(foundTasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', async (req, res)=>{
    const _id = req.params.id
    try {
        const foundTask = await Task.findById(_id)
        if(!foundTask){
            return res.status(404).send('Task not found with id '+_id)
        }
        res.send(foundTask)
    } catch (error) {
        res.send(error)
    }
})

router.patch('/tasks/:id', async (req, res)=>{
    const availableUpdates = ['completed', 'desc']
    const requestedUpdates = Object.keys(req.body)
    if(!requestedUpdates.every((update)=>availableUpdates.includes(update))){
        return res.status(400).send('Invalid updates')
    }

    try {
        const task = await Task.findById(req.params.id)
        requestedUpdates.forEach((update)=>task[update] = req.body[update])
        await task.save()
        res.send(task)
        if(!task){
            return res.status(500).send('No task found to update')
        }
    } catch(error){
        res.status(500).send(error)
    }
})

router.delete('/tasks/:id', async (req, res)=>{
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id)
        if(!deletedTask){
            return res.status(500).send('No task found')
        }
        res.send(deletedTask)
    }catch(error){
        res.send(error)
    }
})

module.exports = router 