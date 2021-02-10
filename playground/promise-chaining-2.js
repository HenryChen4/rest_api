const { response } = require('express')
const Task = require('../src/models/task')
require('../src/db/mongoose')

// Task.findByIdAndDelete('5fe6ecd2d452f833ccc57c20').then((response)=>{
//     console.log(response)
//     return Task.countDocuments({completed: false})
// }).then((response)=>{
//     console.log(response)
// }).catch((error)=>{
//     console.log(error)
// })

const deleteTaskAndCount = async (id, completed)=>{
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: completed})
    return `Deleted task: ${task} \nNumber of incomplete tasks: ${count}`
}

deleteTaskAndCount('5fe69b8410e61131cce1ef36', false).then((count)=>{
    console.log(count)
}).catch((error)=>{
    console.log(error)
})