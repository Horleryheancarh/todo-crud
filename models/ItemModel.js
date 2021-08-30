const mongoose = require('mongoose')
const { Schema } = mongoose

const itemSchema = new Schema ({
    id : {
        type: String,
    },
    title : {
        type: String,
    },
    email: {
        type: String,
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
    }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item