const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const { use } = require('../routers/task')
const jwt = require('jsonwebtoken')
const { GridFSBucketReadStream } = require('mongodb')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }, 
    age: {
        type: Number,
        validate(value){
            if(value < 0){
                return false
            }
        },
        default: 18
    },
    email: {
        type: String,
        unique: true,
        require: true,
        validate(value){
            if(!validator.isEmail(value)){
                return false
            }
        },
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                return false
            }
        } 
    }
    // tokens: [{
    //     token: {
    //         type: String,
    //         required: true
    //     }
    // }]
})

userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({email: email})
    if(user === null){
        throw `No user found with email: ${email}`
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw 'Password is wrong'
    }
    return user
}


// userSchema.methods.generateAuthToken = async function(){
//     const user = this
//     const token = jwt.sign({_id: user._id.toString()}, 'cicada3301')
//     user.tokens = user.tokens.concat({token})
//     user.save()
//     return token
// }

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('user', userSchema)

module.exports = User