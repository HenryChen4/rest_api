require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5fe6d76d723f453333f54e8b', {age: 1}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age: 16})
// }).then((users)=>{
//     console.log(users)
// }).catch((error)=>{
//     console.log(error)
// })

const updateAgeAndCount = async (id, age)=>{
    const user = await User.findByIdAndUpdate(id, {age: age})
    const count = await User.countDocuments({age: age})
    return count
}

updateAgeAndCount('5fe6d76d723f453333f54e8b', 2).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})