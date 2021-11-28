const mongoose = require('mongoose')
const { Schema } = mongoose

const itemSchema = new Schema ({
    id : {
        type: String,
    },
    username : {
        type: String,
    },
    details: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item