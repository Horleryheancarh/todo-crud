const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema ({
    id : {
        type: String
    },
    username : {
        type: String,
        required: true
    },
    name : {
        type: String
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
})

const User = new mongoose.model('User', userSchema)

module.exports = User